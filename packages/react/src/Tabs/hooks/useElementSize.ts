import { type RefObject, useEffect, useState } from 'react';

type Size = {
    top: number;
    left: number;
    width: number;
    height: number;
};

export const useElementSize = (
    refs: RefObject<(HTMLElement | null)[]>,
    index: number,
) => {
    const [size, setSize] = useState<Size>({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const element = refs.current?.[index];

        if (!element) return;

        const newSize = {
            top: element.offsetTop,
            left: element.offsetLeft,
            width: element.offsetWidth,
            height: element.offsetHeight,
        };

        setSize(newSize);
    }, [refs, index]);

    return size;
};
