import { ReactNode } from 'react';

type AllowedTags =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'div'
    | 'span';

export type TextProps = {
    children: ReactNode;
    className: string;
    as?: AllowedTags;
    align?: 'start' | 'end' | 'center';
};

export type DisplayProps = Pick<TextProps, 'children'>;

export type HeadlineProps = Pick<TextProps, 'children'>;

export type TitleProps = Pick<TextProps, 'children'>;

export type BodyProps = Pick<TextProps, 'children'>;

export type LabelProps = Pick<TextProps, 'children'>;

export type ActionProps = Pick<TextProps, 'children'>;

export type OverlineProps = Pick<TextProps, 'children'>;

export type MetaProps = Pick<TextProps, 'children'>;

export type CaptionProps = Pick<TextProps, 'children'>;
