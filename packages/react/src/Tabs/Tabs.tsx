import React, {
    useState,
    useRef,
    createContext,
    useContext,
    useCallback,
    useMemo,
    KeyboardEvent,
    FocusEvent,
    useLayoutEffect,
    useEffect,
    CSSProperties,
} from 'react';
import clsx from 'clsx';
import { PanelProps, TabListProps, TabProps, TabsProps } from './types';
import './styles.css';
import { Action } from '../Typography';
import { validateTabsProps } from './utils';

interface TabsContextType {
    activeId: string;
    focusedId: string;
    setActiveId: (id: string) => void;
    setFocusedId: (id: string) => void;
    orientation: 'horizontal' | 'vertical';
}

const TabsContext = createContext<TabsContextType | null>(null);
const useTabs = () => {
    const context = useContext(TabsContext);
    if (!context)
        throw new Error('Tabs compound components must be used inside <Tabs>');
    return context;
};

// -------------------
// Tab
// -------------------
export const Tab = ({ id, label, isDisabled, ref }: TabProps) => {
    const { activeId, focusedId, setActiveId } = useTabs();
    const isFocusTarget = (focusedId || activeId) === id;

    return (
        <button
            ref={ref}
            role="tab"
            aria-selected={activeId === id}
            aria-controls={`panel-${id}`}
            id={`tab-${id}`}
            data-tab-id={id}
            tabIndex={isFocusTarget ? 0 : -1}
            disabled={isDisabled}
            onClick={() => setActiveId(id)}
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
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
}: TabListProps) => {
    const { activeId, setActiveId, setFocusedId, orientation } = useTabs();
    const listRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    });
    const [isAnimated, setIsAnimated] = useState(false);

    // Initialize activeId with the first enabled tab (before paint)
    useLayoutEffect(() => {
        if (activeId) return;
        const firstTab = listRef.current?.querySelector<HTMLElement>(
            '[role="tab"]:not([disabled])',
        );
        const id = firstTab?.getAttribute('data-tab-id');
        if (id) setActiveId(id);
    }, [activeId, setActiveId]);

    // Update indicator position
    const updateIndicator = useCallback(() => {
        const activeTab = listRef.current?.querySelector<HTMLElement>(
            '[aria-selected="true"]',
        );
        if (!activeTab) return;
        setIndicatorStyle({
            top: activeTab.offsetTop,
            left: activeTab.offsetLeft,
            width: activeTab.offsetWidth,
            height: activeTab.offsetHeight,
        });
    }, []);

    useLayoutEffect(() => {
        updateIndicator();
    }, [activeId, updateIndicator]);

    // Enable indicator animation after browser paints initial position
    useEffect(() => {
        const id = requestAnimationFrame(() => setIsAnimated(true));
        return () => cancelAnimationFrame(id);
    }, []);

    // Re-measure on resize (window resize, zoom, font change)
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;
        const observer = new ResizeObserver(updateIndicator);
        observer.observe(list);
        return () => observer.disconnect();
    }, [updateIndicator]);

    // Keyboard navigation (manual activation, W3C APG)
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const list = listRef.current;
        if (!list) return;

        const tabs = Array.from(
            list.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])'),
        );
        const currentIndex = tabs.indexOf(e.target as HTMLElement);
        if (currentIndex === -1) return;

        const isHorizontal = orientation === 'horizontal';
        const isRtl = list.closest('[dir]')?.getAttribute('dir') === 'rtl';
        let nextIndex: number | null = null;

        const nextKey = isHorizontal
            ? isRtl
                ? 'ArrowLeft'
                : 'ArrowRight'
            : 'ArrowDown';
        const prevKey = isHorizontal
            ? isRtl
                ? 'ArrowRight'
                : 'ArrowLeft'
            : 'ArrowUp';

        switch (e.key) {
            case nextKey:
                nextIndex = (currentIndex + 1) % tabs.length;
                break;
            case prevKey:
                nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                break;
            case 'Home':
                nextIndex = 0;
                break;
            case 'End':
                nextIndex = tabs.length - 1;
                break;
        }

        if (nextIndex !== null) {
            e.preventDefault();
            e.stopPropagation();
            const nextId = tabs[nextIndex].getAttribute('data-tab-id');
            if (nextId) setFocusedId(nextId);
            tabs[nextIndex].focus();
        }
    };

    const inlineStyles = {
        '--tab-item-active-top': `${indicatorStyle.top}px`,
        '--tab-item-active-left': `${indicatorStyle.left}px`,
        '--tab-item-active-width': `${indicatorStyle.width}px`,
        '--tab-item-active-height': `${indicatorStyle.height}px`,
    } as CSSProperties;

    return (
        <div
            ref={listRef}
            role="tablist"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-orientation={orientation}
            className={clsx('tab-list', `tab-list--${orientation}`, {
                'tab-list--animated': isAnimated,
            })}
            style={inlineStyles}
            onKeyDown={handleKeyDown}
            onBlur={(e: FocusEvent<HTMLDivElement>) => {
                if (!listRef.current?.contains(e.relatedTarget as Node)) {
                    setFocusedId('');
                }
            }}
        >
            {children}
        </div>
    );
};

TabList.displayName = 'TabList';

// -------------------
// Panel
// -------------------
export const Panel = ({ children, id, tabIndex = 0 }: PanelProps) => {
    const { activeId } = useTabs();

    return (
        <div
            role="tabpanel"
            id={`panel-${id}`}
            hidden={id !== activeId}
            aria-labelledby={`tab-${id}`}
            tabIndex={tabIndex}
        >
            {children}
        </div>
    );
};

Panel.displayName = 'Panel';

// -------------------
// Tabs
// -------------------
type TabsComponent = {
    (props: TabsProps): React.JSX.Element;
    displayName?: string;
    TabList: typeof TabList;
    Tab: typeof Tab;
    Panel: typeof Panel;
};

export const Tabs: TabsComponent = ({
    children,
    orientation = 'horizontal',
    defaultActiveId,
    activeId: controlledActiveId,
    onActiveIdChange,
}) => {
    if (process.env.NODE_ENV !== 'production') {
        validateTabsProps(
            controlledActiveId,
            onActiveIdChange,
            defaultActiveId,
        );
    }

    const [uncontrolledId, setUncontrolledId] = useState(defaultActiveId ?? '');
    const activeId = controlledActiveId ?? uncontrolledId;

    const controlledRef = useRef(controlledActiveId);
    controlledRef.current = controlledActiveId;

    const onChangeRef = useRef(onActiveIdChange);
    onChangeRef.current = onActiveIdChange;

    const [focusedId, setFocusedIdState] = useState('');

    const setActiveId = useCallback((id: string) => {
        if (controlledRef.current === undefined) setUncontrolledId(id);
        onChangeRef.current?.(id);
        setFocusedIdState('');
    }, []);

    const setFocusedId = useCallback((id: string) => {
        setFocusedIdState(id);
    }, []);

    const contextValue = useMemo<TabsContextType>(
        () => ({ activeId, focusedId, setActiveId, setFocusedId, orientation }),
        [activeId, focusedId, setActiveId, setFocusedId, orientation],
    );

    return (
        <TabsContext.Provider value={contextValue}>
            {children}
        </TabsContext.Provider>
    );
};

Tabs.displayName = 'Tabs';

Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.Panel = Panel;
