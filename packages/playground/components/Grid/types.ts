import { FC, ReactNode } from 'react';

type GridProps = {
    children?: ReactNode;
    columns?: number;
};

export type HeaderProps = {
    label: string;
};

export type CellProps = {
    children: ReactNode;
};

export type GridComponent = FC<GridProps> & {
    Header: FC<HeaderProps>;
    Cell: FC<CellProps>;
};
