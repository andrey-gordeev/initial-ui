import type { ComponentType, CSSProperties, ReactNode } from 'react';

export type StoryGridOwnProps<P extends object> = {
    args: (P | null)[];
    /** По умолчанию — почти квадратная сетка (как ceil(sqrt(n))). */
    columns?: number;
};

type StoryGridWithComponent<P extends object> = StoryGridOwnProps<P> & {
    component: ComponentType<P>;
    children?: undefined;
};

type StoryGridWithRender<P extends object> = StoryGridOwnProps<P> & {
    component?: undefined;
    children: (item: P | null, index: number) => ReactNode;
};

export type StoryGridProps<P extends object> =
    | StoryGridWithComponent<P>
    | StoryGridWithRender<P>;

export function StoryGrid<P extends object>(props: StoryGridProps<P>) {
    const { args, columns } = props;
    const n = args.length;
    const { cols, size } = computeGrid(n, columns);
    const normalized: (P | null)[] = [
        ...args,
        ...Array.from({ length: size - n }, () => null),
    ];

    const renderCell = (item: P | null, i: number) => {
        if ('children' in props && props.children) {
            return props.children(item, i);
        }

        const Component = props.component;
        return item ? <Component {...item} /> : null;
    };

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                border: '1px dotted #e5e5e5',
                borderRadius: 4,
                overflow: 'hidden',
            }}
        >
            {normalized.map((item, i) => (
                <div key={i} style={cellStyle(i, cols, size)}>
                    {renderCell(item, i)}
                </div>
            ))}
        </div>
    );
}

function computeGrid(itemCount: number, columns?: number) {
    if (columns !== undefined) {
        const cols = Math.max(1, columns);
        const rows = Math.ceil(itemCount / cols);
        const size = rows * cols;
        return { cols, size };
    }

    const n = itemCount;
    const rows = Math.max(1, Math.ceil(Math.sqrt(n)));
    const cols = Math.ceil(n / rows);
    const size = rows * cols;

    return { cols, size };
}

function cellStyle(index: number, cols: number, size: number) {
    const isLastColumn = (index + 1) % cols === 0;
    const isLastRow = index >= size - cols;

    return {
        padding: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: isLastColumn ? 'none' : '1px dotted #e5e5e5',
        borderBottom: isLastRow ? 'none' : '1px dotted #e5e5e5',
        background: 'transparent',
        minHeight: 64,
        aspectRatio: 1,
    } as CSSProperties;
}
