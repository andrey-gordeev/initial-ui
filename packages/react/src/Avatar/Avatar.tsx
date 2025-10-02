import React, { useId, useRef, CSSProperties } from 'react';
import { clsx } from 'clsx';
import { useBadgeMeasurements, useNotchCalculation } from './hooks';
import { calculateBadgeRadius, getAvatarSize } from './utils';
import { AvatarProps } from './types';
import {
    AVATAR_BADGE_PLACEMENT_TO_CLASS_NAME_MAP,
    AVATAR_SIZES_TO_CLASS_NAME_MAP,
} from './constants';
import './styles.css';

export const Avatar = ({
    children,
    content,
    type,
    size = 'md',
    badges,
    halo,
    inset,
    label,
    description,
}: AvatarProps) => {
    const maskId = useId();

    const { avatarSize, avatarRadius } = getAvatarSize(size);

    const normalizedBadges = Array.isArray(badges)
        ? badges
        : badges
          ? [badges]
          : [];

    const avatarRef = useRef<HTMLDivElement>(null);
    const {
        dimensions: badgeDimensions,
        isMeasuring,
        badgeRefs,
    } = useBadgeMeasurements(normalizedBadges);
    const badgeRadii = calculateBadgeRadius(badgeDimensions, normalizedBadges);
    const notchData = useNotchCalculation(
        badgeDimensions,
        normalizedBadges,
        avatarRef,
    );

    return (
        <div
            ref={avatarRef}
            className={clsx('avatar', AVATAR_SIZES_TO_CLASS_NAME_MAP[size])}
            style={
                {
                    '--avatar-size': `${avatarSize}px`,
                    '--avatar-radius': `${avatarRadius}px`,
                } as CSSProperties
            }
        >
            <svg
                width={avatarSize}
                height={avatarSize}
                viewBox={`0 0 ${avatarSize} ${avatarSize}`}
            >
                <defs>
                    <mask id={maskId}>
                        <circle
                            cx={avatarRadius}
                            cy={avatarRadius}
                            r={avatarRadius}
                            fill="white"
                        />

                        {!isMeasuring &&
                            notchData.map((item, index) => (
                                <rect
                                    key={index}
                                    x={item.x}
                                    y={item.y}
                                    width={item.width}
                                    height={item.height}
                                    rx={item.radius}
                                    ry={item.radius}
                                    fill="black"
                                />
                            ))}
                    </mask>
                </defs>

                <foreignObject
                    width={avatarSize}
                    height={avatarSize}
                    mask={`url(#${maskId})`}
                >
                    <div className="avatar__content">{children || content}</div>
                </foreignObject>
            </svg>

            {halo ? <div className="avatar__halo" /> : null}

            {inset ? <div className="avatar__inset" /> : null}

            {type === 'add-button'
                ? (() => {
                      const strokeWidth = 4;
                      const r = avatarSize / 2 - strokeWidth / 2;
                      return (
                          <div className="avatar__add-button">
                              <svg
                                  width={avatarSize}
                                  height={avatarSize}
                                  viewBox={`0 0 ${avatarSize} ${avatarSize}`}
                              >
                                  <circle
                                      cx={avatarSize / 2}
                                      cy={avatarSize / 2}
                                      r={r}
                                      fill="none"
                                      stroke="orange"
                                      strokeWidth={strokeWidth}
                                      strokeDasharray="6 12"
                                      strokeLinecap="round"
                                  />
                              </svg>
                          </div>
                      );
                  })()
                : null}

            {label ? <div className="avatar__label">{label}</div> : null}

            <div className="avatar__badges">
                {normalizedBadges.map((item, index) => (
                    <div
                        key={index}
                        ref={(el) => (badgeRefs.current[index] = el)}
                        className={clsx(
                            'avatar-badge',
                            AVATAR_BADGE_PLACEMENT_TO_CLASS_NAME_MAP[
                                item.placement
                            ],
                        )}
                        style={{
                            borderRadius: `${badgeRadii[index]}px`,
                            visibility: isMeasuring ? 'hidden' : 'visible',
                        }}
                    >
                        {item.content}
                    </div>
                ))}
            </div>
        </div>
    );
};
