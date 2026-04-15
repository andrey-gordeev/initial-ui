import React, {
    CSSProperties,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { clsx } from 'clsx';
import type { SegmentedControlProps, ItemProps } from './types';
import { validateSegmentedControlProps } from './utils';
import './styles.css';

interface SegmentedControlContextType {
    activeValue: string;
    setActiveValue: (value: string) => void;
    name: string;
}

const SegmentedControlContext =
    createContext<SegmentedControlContextType | null>(null);

const useSegmentedControlContext = () => {
    const context = useContext(SegmentedControlContext);
    if (!context)
        throw new Error(
            'SegmentedControl compound components must be used inside <SegmentedControl>',
        );
    return context;
};

// -------------------
// Item
// -------------------
export const Item = ({ value, label, description, isDisabled }: ItemProps) => {
    const { activeValue, setActiveValue, name } = useSegmentedControlContext();
    const isSelected = activeValue === value;

    return (
        <label
            className={clsx('segment', {
                'segment--selected': isSelected,
                'segment--disabled': isDisabled,
            })}
        >
            <input
                type="radio"
                name={name}
                value={value}
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => setActiveValue(value)}
            />
            {label ? <span className="segment__label">{label}</span> : null}
            {description ? (
                <span className="segment__description">{description}</span>
            ) : null}
        </label>
    );
};

Item.displayName = 'Item';

// -------------------
// SegmentedControl
// -------------------
type SegmentedControlComponent = {
    (props: SegmentedControlProps): React.JSX.Element;
    displayName?: string;
    Item: typeof Item;
};

export const SegmentedControl: SegmentedControlComponent = ({
    children,
    name,
    defaultValue,
    value: controlledValue,
    onChange,
}) => {
    if (process.env.NODE_ENV !== 'production') {
        validateSegmentedControlProps(controlledValue, onChange, defaultValue);
    }

    const generatedName = useId();
    const groupName = name ?? generatedName;
    const containerRef = useRef<HTMLDivElement>(null);

    const [uncontrolledValue, setUncontrolledValue] = useState(
        defaultValue ?? '',
    );
    const activeValue = controlledValue ?? uncontrolledValue;

    const controlledRef = useRef(controlledValue);
    controlledRef.current = controlledValue;

    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    const setActiveValue = useCallback((value: string) => {
        if (controlledRef.current === undefined) setUncontrolledValue(value);
        onChangeRef.current?.(value);
    }, []);

    const [indicatorStyle, setIndicatorStyle] = useState({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    });
    const [isAnimated, setIsAnimated] = useState(false);

    const updateIndicator = useCallback(() => {
        const selected =
            containerRef.current?.querySelector<HTMLElement>(
                '.segment--selected',
            );
        if (!selected) return;
        setIndicatorStyle({
            top: selected.offsetTop,
            left: selected.offsetLeft,
            width: selected.offsetWidth,
            height: selected.offsetHeight,
        });
    }, []);

    useLayoutEffect(() => {
        updateIndicator();
    }, [activeValue, updateIndicator]);

    useEffect(() => {
        const id = requestAnimationFrame(() => setIsAnimated(true));
        return () => cancelAnimationFrame(id);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const observer = new ResizeObserver(updateIndicator);
        observer.observe(container);
        return () => observer.disconnect();
    }, [updateIndicator]);

    const contextValue = useMemo<SegmentedControlContextType>(
        () => ({ activeValue, setActiveValue, name: groupName }),
        [activeValue, setActiveValue, groupName],
    );

    const inlineStyles = {
        '--tab-item-active-indicator-top': `${indicatorStyle.top}px`,
        '--tab-item-active-indicator-left': `${indicatorStyle.left}px`,
        '--tab-item-active-indicator-width': `${indicatorStyle.width}px`,
        '--tab-item-active-indicator-height': `${indicatorStyle.height}px`,
    } as CSSProperties;

    return (
        <SegmentedControlContext.Provider value={contextValue}>
            <div
                ref={containerRef}
                className={clsx('segmented-control', {
                    'segmented-control--animated': isAnimated,
                })}
                style={inlineStyles}
                role="radiogroup"
            >
                {children}
            </div>
        </SegmentedControlContext.Provider>
    );
};

SegmentedControl.displayName = 'SegmentedControl';

SegmentedControl.Item = Item;
