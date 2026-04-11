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
import './styles.scss';

export const Display1 = ({ children }: DisplayProps) => {
    return (
        <Text className="iui-display-1" as="h1">
            {children}
        </Text>
    );
};

export const Display2 = ({ children }: DisplayProps) => {
    return (
        <Text className="iui-display-2" as="h1">
            {children}
        </Text>
    );
};

export const Headline1 = ({ children }: HeadlineProps) => {
    return (
        <Text className="iui-headline-1" as="h2">
            {children}
        </Text>
    );
};

export const Headline2 = ({ children }: HeadlineProps) => {
    return (
        <Text className="iui-headline-2" as="h3">
            {children}
        </Text>
    );
};

export const Title1 = ({ children }: TitleProps) => {
    return (
        <Text className="iui-title-1" as="h4">
            {children}
        </Text>
    );
};

export const Title2 = ({ children }: TitleProps) => {
    return (
        <Text className="iui-title-2" as="h5">
            {children}
        </Text>
    );
};

export const Title3 = ({ children }: TitleProps) => {
    return (
        <Text className="iui-title-3" as="h6">
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

export const Label1 = ({ children, className, as }: LabelProps) => {
    return (
        <Text className={clsx('iui-label-1', className)} as={as}>
            {children}
        </Text>
    );
};

export const Label2 = ({ children, className, as }: LabelProps) => {
    return (
        <Text className={clsx('iui-label-2', className)} as={as}>
            {children}
        </Text>
    );
};

export const Label3 = ({ children, className, as }: LabelProps) => {
    return (
        <Text className={clsx('iui-label-3', className)} as={as}>
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
