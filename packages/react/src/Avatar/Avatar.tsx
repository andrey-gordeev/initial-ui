import { useId, useRef, useState, useEffect } from 'react';
import { AvatarProps, BadgeDimensions } from './types';
import './styles.css';
import { clsx } from 'clsx';

export const Avatar = ({ avatarContent, badges, size = 80 }: AvatarProps) => {
    const maskId = useId();
    const avatarRadius = size / 2;
    const normalizedBadges = Array.isArray(badges)
        ? badges
        : badges
          ? [badges]
          : [];

    // Состояние для измеренных размеров бейджей
    const [badgeDimensions, setBadgeDimensions] = useState<BadgeDimensions[]>(
        [],
    );
    const [isMeasuring, setIsMeasuring] = useState(true);

    // Рефы для измерения бейджей
    const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Измеряем размеры и позиции бейджей после первого рендера
    useEffect(() => {
        if (normalizedBadges.length === 0) {
            setIsMeasuring(false);
            return;
        }

        const dimensions = badgeRefs.current.map((ref) => {
            if (ref) {
                const rect = ref.getBoundingClientRect();
                return {
                    width: rect.width,
                    height: rect.height,
                    left: rect.left,
                    top: rect.top,
                };
            }
            return { width: 20, height: 20, left: 0, top: 0 }; // fallback
        });

        setBadgeDimensions(dimensions);
        setIsMeasuring(false);
    }, [normalizedBadges.length]);

    return (
        <div className="avatar" style={{ width: size, height: size }}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                style={{ display: 'block' }}
            >
                <defs>
                    <mask id={maskId}>
                        {/* Основной круг аватара */}
                        <circle
                            cx={avatarRadius}
                            cy={avatarRadius}
                            r={avatarRadius}
                            fill="white"
                        />

                        {/* Вырезы под бейджи */}
                        {!isMeasuring &&
                            badgeDimensions.map((dimensions, index) => {
                                const badge = normalizedBadges[index];
                                const gap = badge.gap || 0;
                                const { width, height, left, top } = dimensions;

                                // Получаем координаты аватара
                                const avatarElement = document.querySelector('.avatar') as HTMLElement;
                                if (!avatarElement) return null;
                                
                                const avatarRect = avatarElement.getBoundingClientRect();
                                
                                // Координаты бейджа относительно аватара
                                const relativeLeft = left - avatarRect.left;
                                const relativeTop = top - avatarRect.top;

                                // Вырез (родитель) с учетом gap
                                const cutoutWidth = width + gap * 2;
                                const cutoutHeight = height + gap * 2;
                                const cutoutRadius = Math.min(cutoutWidth, cutoutHeight) / 2;

                                // Координаты выреза (центрируем относительно бейджа)
                                const cutoutX = relativeLeft - gap;
                                const cutoutY = relativeTop - gap;

                                return (
                                    <rect
                                        key={index}
                                        x={cutoutX}
                                        y={cutoutY}
                                        width={cutoutWidth}
                                        height={cutoutHeight}
                                        rx={cutoutRadius}
                                        ry={cutoutRadius}
                                        fill="black"
                                    />
                                );
                            })}
                    </mask>
                </defs>

                {/* Аватар с вырезами под бейджи */}
                <foreignObject
                    width={size}
                    height={size}
                    mask={`url(#${maskId})`}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            backgroundColor: '#6366f1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '16px',
                        }}
                    >
                        {avatarContent}
                    </div>
                </foreignObject>
            </svg>

            {/* Слой 2: Бейджи (абсолютное позиционирование) */}
            <div className="avatar__badges">
                {normalizedBadges.map((badge, index) => {
                    const className = clsx(
                        'avatar__badge',
                        `avatar__badge--${badge.placement}`,
                    );

                    const dimensions = badgeDimensions[index] || {
                        width: 20,
                        height: 20,
                    };

                    const { width, height } = dimensions;
                    const gap = badge.gap || 0;

                    // Material Design: child_radius = parent_radius - gap
                    const cutoutRadius =
                        Math.min(width + gap * 2, height + gap * 2) / 2;
                    const badgeRadius = Math.max(0, cutoutRadius - gap);

                    return (
                        <div
                            key={index}
                            ref={(el) => (badgeRefs.current[index] = el)}
                            className={className}
                            data-border-radius={badgeRadius}
                            style={{
                                borderRadius: `${badgeRadius}px`,
                                visibility: isMeasuring ? 'hidden' : 'visible',
                            }}
                        >
                            {badge.content}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

