import { useRef, useState, useEffect } from 'react';
import { BadgeDimensions, BadgeProps } from '../types';

export const useBadgeMeasurements = (badges: BadgeProps[]) => {
    const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [dimensions, setDimensions] = useState<BadgeDimensions[]>([]);
    const [isMeasuring, setIsMeasuring] = useState(true);

    useEffect(() => {
        if (badges.length === 0) {
            setIsMeasuring(false);
            return;
        }

        const measurements = badgeRefs.current.map((ref) => {
            if (ref) {
                const rect = ref.getBoundingClientRect();
                return {
                    width: rect.width,
                    height: rect.height,
                    left: rect.left,
                    top: rect.top,
                };
            }
            return { width: 20, height: 20, left: 0, top: 0 };
        });

        setDimensions(measurements);
        setIsMeasuring(false);
    }, [badges.length]);

    return { dimensions, isMeasuring, badgeRefs };
};
