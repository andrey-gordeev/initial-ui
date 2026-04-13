import React, {
    ChangeEvent,
    Children,
    cloneElement,
    CSSProperties,
    isValidElement,
    ReactElement,
    ReactNode,
    useId,
    useRef,
    useState,
} from 'react';
import { clsx } from 'clsx';
import { useElementSize } from './hooks/useElementSize';
import { SegmentedControlProps, SegmentProps } from './types';
import './styles.css';

export const SegmentedControl = ({
    children,
    segments,
    name,
    value,
    onChange,
}: SegmentedControlProps) => {
    const segmentRefs = useRef<(HTMLLabelElement | null)[]>([]);
    const defaultName = useId();
    const isControlled = value !== undefined;

    const [internalValue, setInternalValue] = useState<
        SegmentedControlProps['value']
    >(() => {
        if (children) {
            const childrenArray = Children.toArray(children);
            for (const child of childrenArray) {
                if (isValidElement(child) && child.props.isSelected) {
                    return (
                        child.props.value ??
                        String(childrenArray.indexOf(child))
                    );
                }
            }
        }
        if (segments) {
            for (let i = 0; i < segments.length; i++) {
                if (segments[i].isSelected) {
                    return segments[i].value ?? String(i);
                }
            }
        }
        return undefined;
    });

    const activeValue = isControlled ? value! : internalValue;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (!isControlled) setInternalValue(newValue);
        onChange?.(newValue);
    };

    const allSegments = [...(segments ?? []), ...Children.toArray(children)];
    const renderedSegments = allSegments.reduce<ReactElement[]>(
        (accumulator, item, index) => {
            const isReactElement =
                isValidElement(item) &&
                (item.type as any).displayName === 'Segment';

            const propsFromItem = isReactElement
                ? (item.props as SegmentProps)
                : (item as SegmentProps);

            const commonProps = {
                ref: (element: HTMLLabelElement | null) => {
                    segmentRefs.current[index] = element;
                },
                name: name || defaultName,
                value: propsFromItem.value ?? String(index),
                isSelected:
                    activeValue === (propsFromItem.value ?? String(index)),
                isDisabled: propsFromItem.isDisabled,
                onChange: (event: ChangeEvent<HTMLInputElement>) =>
                    handleChange(event),
            };

            if (isReactElement) {
                accumulator.push(cloneElement(item, commonProps));
            } else if (typeof item === 'object') {
                accumulator.push(
                    <Segment key={index} {...propsFromItem} {...commonProps} />,
                );
            }

            return accumulator;
        },
        [],
    );

    const activeIndex = allSegments.findIndex((item, index) => {
        const isReactElement = isValidElement(item);
        const itemValue = isReactElement
            ? ((item.props as SegmentProps).value ?? String(index))
            : ((item as SegmentProps).value ?? String(index));
        return itemValue === activeValue;
    });

    const { ...indicatorStyle } = useElementSize(segmentRefs, activeIndex);
    const inlineStyles = {
        '--tab-item-active-indicator-top': `${indicatorStyle.top}px`,
        '--tab-item-active-indicator-left': `${indicatorStyle.left}px`,
        '--tab-item-active-indicator-width': `${indicatorStyle.width}px`,
        '--tab-item-active-indicator-height': `${indicatorStyle.height}px`,
    } as CSSProperties;

    return (
        <div
            className="segmented-control"
            style={inlineStyles}
            role="radiogroup"
        >
            {renderedSegments}
        </div>
    );
};

export const Segment = ({
    ref,
    name,
    value,
    label,
    description,
    isSelected,
    isDisabled,
    onChange,
}: SegmentProps) => {
    const className = clsx('segment', {
        'segment--selected': isSelected,
        'segment--disabled': isDisabled,
    });

    return (
        <label ref={ref} className={className}>
            <input
                type="radio"
                name={name}
                value={value}
                checked={isSelected}
                disabled={isDisabled}
                onChange={onChange}
            />
            {label ? <span className="segment__label">{label}</span> : null}
            {description ? (
                <span className="segment__description">{description}</span>
            ) : null}
        </label>
    );
};

Segment.displayName = 'Segment';
