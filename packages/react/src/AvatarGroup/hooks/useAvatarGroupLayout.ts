import { useMemo } from 'react';
import { AvatarGroupItem } from '../types';
import { getAvatarSize } from '../../Avatar/utils';

interface UseAvatarGroupLayoutParams {
    avatars: AvatarGroupItem[];
    maxVisible: number;
    overlap: number;
    size: 'sm' | 'md' | 'lg' | 'jumbo';
}

export const useAvatarGroupLayout = ({
    avatars,
    maxVisible,
    overlap,
    size,
}: UseAvatarGroupLayoutParams) => {
    return useMemo(() => {
        const { avatarSize } = getAvatarSize(size);
        
        // Определяем видимые аватары
        const visibleAvatars = avatars.slice(0, maxVisible);
        const overflowCount = Math.max(0, avatars.length - maxVisible);
        
        // Вычисляем размеры группы (только горизонтальное направление)
        const groupDimensions = (() => {
            if (avatars.length === 0) {
                return { size: '0px', width: 0, height: 0 };
            }
            
            const visibleCount = Math.min(avatars.length, maxVisible);
            const width = visibleCount * avatarSize - (visibleCount - 1) * overlap;
            const height = avatarSize;
            
            return {
                size: `${width}px`,
                width,
                height,
            };
        })();
        
        return {
            visibleAvatars,
            overflowCount,
            groupDimensions,
            avatarSize,
        };
    }, [avatars, maxVisible, overlap, size]);
};
