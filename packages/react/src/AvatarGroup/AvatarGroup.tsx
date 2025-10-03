import React, { type CSSProperties, useId } from 'react';
import { clsx } from 'clsx';
import { Avatar } from '../Avatar/Avatar';
import { useAvatarGroupLayout } from './hooks';
import { AvatarGroupProps } from './types';
import './styles.css';

export const AvatarGroup = ({
    avatars = [],
    maxVisible = 5,
    overlap = 8,
    gap = 0,
    size = 'md',
    showOverflow = true,
    className,
    debug = false, // Добавляем режим отладки
}: AvatarGroupProps & { debug?: boolean }) => {
    const groupId = useId();
    const { visibleAvatars, overflowCount, groupDimensions, avatarSize } =
        useAvatarGroupLayout({
            avatars,
            maxVisible,
            overlap,
            size,
        });

    return (
        <div
            className={clsx('avatar-group', className)}
            style={
                {
                    '--avatar-group-overlap': `${overlap}px`,
                    '--avatar-group-size': groupDimensions.size,
                    '--avatar-size': `${avatarSize}px`,
                } as CSSProperties
            }
        >
            {/* SVG маски нужны только если gap > 0 */}
            {gap > 0 && (
                <svg
                    width={debug ? avatarSize * visibleAvatars.length : 0}
                    height={debug ? avatarSize : 0}
                    style={{
                        position: debug ? 'relative' : 'absolute',
                        border: debug ? '1px solid red' : 'none',
                        background: debug ? '#f0f0f0' : 'transparent',
                    }}
                >
                    <defs>
                        {visibleAvatars.map((_, index) => {
                            const maskId = `${groupId}-mask-${index}`;
                            const nextIndex = index + 1;

                            // Создаем маску только если есть следующий аватар
                            if (nextIndex >= visibleAvatars.length) return null;

                            const avatarRadius = avatarSize / 2;
                            const nextAvatarX = avatarSize + avatarRadius - overlap;
                            const nextAvatarY = avatarRadius;

                            return (
                                <mask key={maskId} id={maskId}>
                                    <circle
                                        cx={avatarRadius}
                                        cy={avatarRadius}
                                        r={avatarRadius}
                                        fill="white"
                                    />
                                    <circle
                                        cx={nextAvatarX}
                                        cy={nextAvatarY}
                                        r={avatarRadius + gap}
                                        fill="black"
                                    />
                                </mask>
                            );
                        })}
                    </defs>

                    {/* Визуализация масок в режиме отладки */}
                    {debug &&
                        visibleAvatars.map((_, index) => {
                            const maskId = `${groupId}-mask-${index}`;
                            const nextIndex = index + 1;

                            if (nextIndex >= visibleAvatars.length) return null;

                            const avatarRadius = avatarSize / 2;
                            const nextAvatarX = avatarSize + avatarRadius - overlap;
                            const nextAvatarY = avatarRadius;

                            return (
                                <g
                                    key={`debug-${index}`}
                                    transform={`translate(${index * avatarSize}, 0)`}
                                >
                                    <circle
                                        cx={avatarRadius}
                                        cy={avatarRadius}
                                        r={avatarRadius}
                                        fill="lightblue"
                                    />
                                    <circle
                                        cx={nextAvatarX}
                                        cy={nextAvatarY}
                                        r={avatarRadius + gap}
                                        fill="red"
                                        opacity="0.5"
                                    />
                                    <text
                                        x={avatarRadius}
                                        y={avatarRadius}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fontSize="12"
                                        fill="black"
                                    >
                                        {index}
                                    </text>
                                </g>
                            );
                        })}
                </svg>
            )}

            {visibleAvatars.map((avatar, index) => {
                const maskId = `${groupId}-mask-${index}`;
                const hasNextAvatar = index < visibleAvatars.length - 1;

                const className = clsx('avatar-group__item', {
                    'avatar-group__item--overflow':
                        index === maxVisible - 1 && overflowCount > 0,
                });

                // Для gap=0 маски не нужны
                const inlineStyle = gap > 0 
                    ? {
                        '--avatar-index': index,
                        mask: hasNextAvatar ? `url(#${maskId})` : undefined,
                        WebkitMask: hasNextAvatar ? `url(#${maskId})` : undefined,
                    } as CSSProperties
                    : {
                        '--avatar-index': index,
                    } as CSSProperties;

                return (
                    <div
                        key={avatar.id || index}
                        className={className}
                        style={inlineStyle}
                    >
                        <Avatar {...avatar} size={size} />
                    </div>
                );
            })}

            {showOverflow && overflowCount > 0 && (
                <div className="avatar-group__overflow">+{overflowCount}</div>
            )}
        </div>
    );
};
