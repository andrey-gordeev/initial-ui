import { type MutableRefObject, useEffect, useState } from 'react';

type Size = {
    top: number;
    left: number;
    width: number;
    height: number;
};

export const useElementSize = (
    refs: MutableRefObject<(HTMLLabelElement | null)[]>,
    index: number,
) => {
    const [size, setSize] = useState<Size>({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const element = refs.current[index];

        if (!element) return;

        const rect = element.getBoundingClientRect();
        const parentRect = element.offsetParent?.getBoundingClientRect() ?? {
            left: 0,
            top: 0,
        };

        setSize({
            left: rect.left - parentRect.left,
            top: rect.top - parentRect.top,
            width: rect.width,
            height: rect.height,
        });
    }, [refs, index]);

    return size;
};
