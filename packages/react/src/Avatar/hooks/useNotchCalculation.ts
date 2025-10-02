import { useMemo, RefObject } from 'react';
import { BadgeDimensions, BadgeProps } from '../types';

type NotchData = {
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;
};

export const useNotchCalculation = (
    badgeDimensions: BadgeDimensions[],
    badges: BadgeProps[],
    avatarRef: RefObject<HTMLDivElement>,
) => {
    return useMemo(() => {
        if (!avatarRef.current || badgeDimensions.length === 0) return [];

        const avatarRect = avatarRef.current.getBoundingClientRect();

        return badgeDimensions.reduce<NotchData[]>((acc, dimensions, index) => {
            const badge = badges[index];
            const gap = badge.gap || 0;

            if (gap > 0) {
                const { width, height, left, top } = dimensions;

                const relativeLeft = left - avatarRect.left;
                const relativeTop = top - avatarRect.top;

                const notchWidth = width + gap * 2;
                const notchHeight = height + gap * 2;
                const notchRadius = Math.min(notchWidth, notchHeight) / 2;

                acc.push({
                    x: relativeLeft - gap,
                    y: relativeTop - gap,
                    width: notchWidth,
                    height: notchHeight,
                    radius: notchRadius,
                });
            }

            return acc;
        }, []);
    }, [badgeDimensions, badges, avatarRef]);
};
