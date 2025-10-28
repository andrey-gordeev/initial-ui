import React, {
    useState,
    useRef,
    createContext,
    useContext,
    ReactNode,
    KeyboardEvent,
    useMemo,
    useEffect,
    Children,
    CSSProperties,
    cloneElement,
    RefObject,
} from 'react';
import clsx from 'clsx';
import { createElementTypeGuard } from '../utils';
import {
    PanelListProps,
    PanelProps,
    TabListProps,
    TabProps,
    TabsProps,
    TabsPropsWithChildren,
} from './types';
import { useElementSize } from './hooks/useElementSize';
import './styles.css';

interface TabsContextType {
    activeId: string;
    setActiveId: (id: string) => void;
    registerTab: (
        id: string,
        ref: HTMLButtonElement,
        disabled?: boolean,
    ) => void;
    focusNextTab: (currentId: string) => void;
    focusPrevTab: (currentId: string) => void;
    tabsRef: RefObject<(HTMLElement | null)[]>;
    tabs: Array<{ id: string; label: ReactNode; disabled?: boolean }>;
    inlineStyles: CSSProperties;
}

const TabsContext = createContext<TabsContextType | null>(null);
const useTabs = () => {
    const context = useContext(TabsContext);
    if (!context) throw new Error('Tabs must be used inside TabsProvider');
    return context;
};

// -------------------
// Type guard
// -------------------
function hasChildren(props: TabsProps): props is TabsPropsWithChildren {
    return 'children' in props && props.children !== undefined;
}

// -------------------
// Tab
// -------------------
export const Tab = ({ id, label, isDisabled, ref }: TabProps) => {
    const {
        activeId,
        setActiveId,
        registerTab,
        focusNextTab,
        focusPrevTab,
        tabsRef,
        tabs,
    } = useTabs();
    const internalRef = useRef<HTMLButtonElement>(null);
    const buttonRef = (ref || internalRef) as RefObject<HTMLButtonElement>;

    useEffect(() => {
        if (buttonRef.current) registerTab(id, buttonRef.current, isDisabled);
    }, [id, isDisabled, registerTab]);

    // Регистрируем элемент для маркера
    useEffect(() => {
        const registerElement = () => {
            if (buttonRef.current && tabsRef.current) {
                // В children сценарии tabs может быть пустым, используем прямую регистрацию
                if (tabs.length === 0) {
                    // Находим свободный слот в массиве
                    const freeIndex = tabsRef.current.findIndex(
                        (ref) => ref === null,
                    );
                    if (freeIndex !== -1) {
                        tabsRef.current[freeIndex] = buttonRef.current;
                    } else {
                        // Добавляем в конец массива
                        tabsRef.current.push(buttonRef.current);
                    }
                } else {
                    // В props сценарии используем индекс из массива tabs
                    const tabIndex = tabs.findIndex((tab) => tab.id === id);
                    if (tabIndex !== -1) {
                        tabsRef.current[tabIndex] = buttonRef.current;
                    }
                }
            }
        };

        // Пробуем зарегистрировать сразу
        registerElement();

        // Если не получилось, пробуем через небольшую задержку
        if (!buttonRef.current || !tabsRef.current) {
            const timeoutId = setTimeout(registerElement, 0);
            return () => clearTimeout(timeoutId);
        }
    }, [id, buttonRef, tabsRef, tabs]);

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (isDisabled) return;

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                setActiveId(id); // только при Enter/Space
                break;
            case 'ArrowRight':
                e.preventDefault();
                focusNextTab(id); // только фокус
                break;
            case 'ArrowLeft':
                e.preventDefault();
                focusPrevTab(id); // только фокус
                break;
        }
    };

    return (
        <button
            ref={buttonRef}
            role="tab"
            aria-selected={activeId === id}
            aria-controls={`panel-${id}`}
            id={`tab-${id}`}
            data-tab-id={id}
            tabIndex={activeId === id ? 0 : -1}
            disabled={isDisabled}
            onClick={() => !isDisabled && setActiveId(id)}
            onKeyDown={handleKeyDown}
            className={clsx('tab-item', {
                'tab-item--active': activeId === id,
                'tab-item--disabled': isDisabled,
            })}
        >
            {label}
        </button>
    );
};

Tab.displayName = 'Tab';

// -------------------
// TabList
// -------------------
export const TabList = ({
    children,
    orientation = 'horizontal',
    styles,
}: TabListProps) => {
    const { inlineStyles } = useTabs();
    const combinedStyles = { ...inlineStyles, ...styles };

    return (
        <div
            role="tablist"
            className={clsx('tab-list', `tab-list--${orientation}`)}
            style={combinedStyles}
        >
            {children}
        </div>
    );
};

TabList.displayName = 'TabList';

// -------------------
// Panel
// -------------------
export const Panel = ({ children, id, hidden }: PanelProps) => {
    return (
        <div
            role="tabpanel"
            id={`panel-${id}`}
            hidden={hidden}
            aria-labelledby={`tab-${id}`}
        >
            {children}
        </div>
    );
};

Panel.displayName = 'Panel';

// -------------------
// PanelList
// -------------------
export const PanelList = ({ children }: PanelListProps) => {
    const { activeId } = useTabs();
    const isValidPanel = createElementTypeGuard<PanelProps>('Panel');

    return Children.map(children, (child) => {
        if (!isValidPanel(child)) return null;
        return cloneElement(child, {
            hidden: child.props.id !== activeId,
        });
    });
};

PanelList.displayName = 'PanelList';

// -------------------
// Tabs
// -------------------
type TabsComponent = React.FC<TabsProps> & {
    TabList: typeof TabList;
    Tab: typeof Tab;
    PanelList: typeof PanelList;
    Panel: typeof Panel;
};

export const Tabs: TabsComponent = (props) => {
    // ----------------------------
    // Дискриминаяция children / tabList
    // ----------------------------
    const { tabs, panels } = useMemo(() => {
        if ('tabList' in props) {
            return { tabs: props.tabList, panels: props.panelList || [] };
        } else {
            const childrenArr = Children.toArray(
                (props as TabsPropsWithChildren).children,
            );

            const isValidTab = createElementTypeGuard<TabProps>('Tab');
            const isValidPanel = createElementTypeGuard<PanelProps>('Panel');

            const tabs: TabProps[] = [];
            const panels: PanelProps[] = [];

            for (const child of childrenArr) {
                if (isValidTab(child)) {
                    tabs.push(child.props);
                } else if (isValidPanel(child)) {
                    panels.push(child.props);
                }
            }

            return { tabs, panels };
        }
    }, [props]);

    // ----------------------------
    // Инициализация activeId
    // ----------------------------
    const [activeId, setActiveId] = useState('');

    // Универсальная инициализация activeId для обоих сценариев
    useEffect(() => {
        if (activeId) return;

        if (hasChildren(props)) {
            // Children сценарий: ждем регистрации табов
            if (tabsRefs.current.size > 0) {
                const firstRegisteredId = Array.from(
                    tabsRefs.current.keys(),
                ).find((id) => !disabledTabs.current.has(id));
                if (firstRegisteredId) {
                    setActiveId(firstRegisteredId);
                }
            }
        } else {
            // Props сценарий: используем готовые данные
            const firstActiveId = tabs.find((tab) => !tab.isDisabled)?.id || '';
            if (firstActiveId) {
                setActiveId(firstActiveId);
            }
        }
    }, [props, activeId, tabs]);

    // ----------------------------
    // Контекст для навигации фокусом
    // ----------------------------
    const tabsRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    const disabledTabs = useRef<Set<string>>(new Set());

    // ----------------------------
    // Маркер активного таба
    // ----------------------------
    const tabsRef = useRef<(HTMLElement | null)[]>([]);

    // Инициализируем массив refs с правильным размером
    useEffect(() => {
        if (hasChildren(props)) {
            // В children сценарии инициализируем пустой массив
            if (tabsRef.current.length === 0) {
                tabsRef.current = [];
            }
        } else {
            // В props сценарии используем размер массива tabs
            if (tabsRef.current.length !== tabs.length) {
                tabsRef.current = new Array(tabs.length).fill(null);
            }
        }
    }, [props, tabs.length]);

    const activeTabIndex = tabs.findIndex((tab) => tab.id === activeId);

    // Для children сценария используем индекс из зарегистрированных элементов
    const actualActiveIndex = hasChildren(props)
        ? tabsRef.current.findIndex(
              (ref) => ref?.getAttribute('data-tab-id') === activeId,
          )
        : activeTabIndex;

    const { ...indicatorStyle } = useElementSize(tabsRef, actualActiveIndex);

    const inlineStyles = {
        '--tab-item-active-top': `${indicatorStyle.top}px`,
        '--tab-item-active-left': `${indicatorStyle.left}px`,
        '--tab-item-active-width': `${indicatorStyle.width}px`,
        '--tab-item-active-height': `${indicatorStyle.height}px`,
    } as CSSProperties;

    const registerTab = (
        id: string,
        ref: HTMLButtonElement,
        disabled?: boolean,
    ) => {
        tabsRefs.current.set(id, ref);
        if (disabled) disabledTabs.current.add(id);
    };

    const focusNextTab = (currentId: string) => {
        const ids = Array.from(tabsRefs.current.keys());
        let idx = ids.indexOf(currentId);
        do {
            idx = (idx + 1) % ids.length;
        } while (disabledTabs.current.has(ids[idx]));
        tabsRefs.current.get(ids[idx])?.focus();
    };

    const focusPrevTab = (currentId: string) => {
        const ids = Array.from(tabsRefs.current.keys());
        let idx = ids.indexOf(currentId);
        do {
            idx = (idx - 1 + ids.length) % ids.length;
        } while (disabledTabs.current.has(ids[idx]));
        tabsRefs.current.get(ids[idx])?.focus();
    };

    const contextValue: TabsContextType = {
        activeId,
        setActiveId,
        registerTab,
        focusNextTab,
        focusPrevTab,
        tabsRef,
        tabs,
        inlineStyles,
    };

    if (hasChildren(props)) {
        return (
            <TabsContext.Provider value={contextValue}>
                {props.children}
            </TabsContext.Provider>
        );
    }

    return (
        <TabsContext.Provider value={contextValue}>
            <TabList orientation={props.orientation}>
                {tabs.map((item) => (
                    <Tab key={item.id} {...item} />
                ))}
            </TabList>
            <PanelList>
                {panels.map((item) => (
                    <Panel key={item.id} {...item}>
                        {item.children}
                    </Panel>
                ))}
            </PanelList>
        </TabsContext.Provider>
    );
};

Tabs.displayName = 'Tabs';

Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.PanelList = PanelList;
Tabs.Panel = Panel;
