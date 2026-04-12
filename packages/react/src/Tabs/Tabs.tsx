import React, {
    useState,
    useRef,
    createContext,
    useContext,
    KeyboardEvent,
    useEffect,
    CSSProperties,
} from 'react';
import clsx from 'clsx';
import { PanelProps, TabListProps, TabProps, TabsProps } from './types';
import './styles.css';
import { Action } from '../Typography';

interface TabsContextType {
    activeId: string;
    setActiveId: (id: string) => void;
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
    const { activeId, setActiveId } = useTabs();

    return (
        <button
            ref={ref}
            role="tab"
            aria-selected={activeId === id}
            aria-controls={`panel-${id}`}
            id={`tab-${id}`}
            data-tab-id={id}
            tabIndex={activeId === id ? 0 : -1}
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
export const TabList = ({ children, styles }: TabListProps) => {
    const { activeId, setActiveId, orientation } = useTabs();
    const listRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    });

    // Initialize activeId with the first enabled tab
    useEffect(() => {
        if (activeId) return;
        const firstTab = listRef.current?.querySelector<HTMLElement>(
            '[role="tab"]:not([disabled])',
        );
        const id = firstTab?.getAttribute('data-tab-id');
        if (id) setActiveId(id);
    }, [activeId, setActiveId]);

    // Update indicator position
    useEffect(() => {
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
    }, [activeId]);

    // Keyboard navigation (manual activation, W3C APG)
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const list = listRef.current;
        if (!list) return;

        const tabs = Array.from(
            list.querySelectorAll<HTMLElement>(
                '[role="tab"]:not([disabled])',
            ),
        );
        const currentIndex = tabs.indexOf(e.target as HTMLElement);
        if (currentIndex === -1) return;

        const isHorizontal = orientation === 'horizontal';
        let nextIndex: number | null = null;

        switch (e.key) {
            case isHorizontal ? 'ArrowRight' : 'ArrowDown':
                nextIndex = (currentIndex + 1) % tabs.length;
                break;
            case isHorizontal ? 'ArrowLeft' : 'ArrowUp':
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
            tabs[nextIndex].focus();
        }
    };

    const inlineStyles = {
        '--tab-item-active-top': `${indicatorStyle.top}px`,
        '--tab-item-active-left': `${indicatorStyle.left}px`,
        '--tab-item-active-width': `${indicatorStyle.width}px`,
        '--tab-item-active-height': `${indicatorStyle.height}px`,
        ...styles,
    } as CSSProperties;

    return (
        <div
            ref={listRef}
            role="tablist"
            aria-orientation={orientation}
            className={clsx('tab-list', `tab-list--${orientation}`)}
            style={inlineStyles}
            onKeyDown={handleKeyDown}
        >
            {children}
        </div>
    );
};

TabList.displayName = 'TabList';

// -------------------
// Panel
// -------------------
export const Panel = ({ children, id }: PanelProps) => {
    const { activeId } = useTabs();

    return (
        <div
            role="tabpanel"
            id={`panel-${id}`}
            hidden={id !== activeId}
            aria-labelledby={`tab-${id}`}
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
}) => {
    const [activeId, setActiveId] = useState('');

    const contextValue: TabsContextType = {
        activeId,
        setActiveId,
        orientation,
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
Tabs.Panel = Panel;
