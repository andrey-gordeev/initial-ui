import React, {
    useState,
    useRef,
    createContext,
    useContext,
    KeyboardEvent,
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
} from './types';
import { useElementSize } from './hooks/useElementSize';
import './styles.css';
import { Action } from '../Typography';

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
    inlineStyles: CSSProperties;
}

const TabsContext = createContext<TabsContextType | null>(null);
const useTabs = () => {
    const context = useContext(TabsContext);
    if (!context) throw new Error('Tabs must be used inside TabsProvider');
    return context;
};

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
    } = useTabs();
    const internalRef = useRef<HTMLButtonElement>(null);
    const buttonRef = (ref || internalRef) as RefObject<HTMLButtonElement>;

    useEffect(() => {
        if (buttonRef.current) registerTab(id, buttonRef.current, isDisabled);
    }, [id, isDisabled, registerTab]);

    // Регистрируем элемент для маркера
    useEffect(() => {
        if (buttonRef.current && tabsRef.current) {
            const existing = tabsRef.current.findIndex(
                (el) => el?.getAttribute('data-tab-id') === id,
            );
            if (existing !== -1) {
                tabsRef.current[existing] = buttonRef.current;
            } else {
                tabsRef.current.push(buttonRef.current);
            }
        }
    }, [id, buttonRef, tabsRef]);

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (isDisabled) return;

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                setActiveId(id);
                break;
            case 'ArrowRight':
                e.preventDefault();
                focusNextTab(id);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                focusPrevTab(id);
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
            <Action>{label}</Action>
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

export const Tabs: TabsComponent = ({ children }) => {
    const [activeId, setActiveId] = useState('');

    // Контекст для навигации фокусом
    const tabsRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    const disabledTabs = useRef<Set<string>>(new Set());

    // Refs для маркера активного таба
    const tabsRef = useRef<(HTMLElement | null)[]>([]);

    // Инициализация activeId — первый не-disabled таб
    useEffect(() => {
        if (activeId) return;
        if (tabsRefs.current.size > 0) {
            const firstEnabledId = Array.from(tabsRefs.current.keys()).find(
                (id) => !disabledTabs.current.has(id),
            );
            if (firstEnabledId) {
                setActiveId(firstEnabledId);
            }
        }
    }, [activeId]);

    // Маркер активного таба
    const activeTabIndex = tabsRef.current.findIndex(
        (ref) => ref?.getAttribute('data-tab-id') === activeId,
    );

    const { ...indicatorStyle } = useElementSize(tabsRef, activeTabIndex);

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
        inlineStyles,
    };

    return (
        <TabsContext.Provider value={contextValue}>
            {children}
        </TabsContext.Provider>
    );
};

Tabs.displayName = 'Tabs';

Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.PanelList = PanelList;
Tabs.Panel = Panel;
