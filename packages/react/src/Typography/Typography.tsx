import clsx from 'clsx';
import {
    ActionProps,
    BodyProps,
    CaptionProps,
    DisplayProps,
    HeadlineProps,
    LabelProps,
    MetaProps,
    OverlineProps,
    TextProps,
    TitleProps,
} from './types';
import './styles.css';

export const Display = ({ children }: DisplayProps) => {
    return (
        <Text className="iui-display" as="h1">
            {children}
        </Text>
    );
};

export const Headline = ({ children }: HeadlineProps) => {
    return (
        <Text className="iui-headline" as="h2">
            {children}
        </Text>
    );
};

export const Title = ({ children }: TitleProps) => {
    return (
        <Text className="iui-title" as="h3">
            {children}
        </Text>
    );
};

export const Body = ({ children }: BodyProps) => {
    return (
        <Text className="iui-body" as="p">
            {children}
        </Text>
    );
};

export const Label = ({ children }: LabelProps) => {
    return (
        <Text className="iui-label" as="p">
            {children}
        </Text>
    );
};

export const Action = ({ children }: ActionProps) => {
    return (
        <Text className="iui-action" as="span">
            {children}
        </Text>
    );
};

export const Overline = ({ children }: OverlineProps) => {
    return (
        <Text className="iui-overline" as="p">
            {children}
        </Text>
    );
};

export const Meta = ({ children }: MetaProps) => {
    return (
        <Text className="iui-meta" as="p">
            {children}
        </Text>
    );
};

export const Caption = ({ children }: CaptionProps) => {
    return (
        <Text className="iui-caption" as="p">
            {children}
        </Text>
    );
};

const Text = ({ children, className, as, align }: TextProps) => {
    const Component = as || 'span';

    const cx = clsx('iui-text', className, {
        'iui-text-align-start': align === 'start',
        'iui-text-align-end': align === 'end',
        'iui-text-align-center': align === 'center',
    });

    return <Component className={cx}>{children}</Component>;
};
