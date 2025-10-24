import { IconName } from '../Icon';
import { BADGE_COLORS, BADGE_SIZES } from './constants';

type BadgeColor = (typeof BADGE_COLORS)[keyof typeof BADGE_COLORS];

type BadgeSize = (typeof BADGE_SIZES)[keyof typeof BADGE_SIZES];

type BadgeBase = {
    color?: BadgeColor;
    size?: BadgeSize;
};

type BadgeWithText = {
    text: string;
    icon?: never;
} & BadgeBase;

type BadgeWithIcon = {
    text?: never;
    icon: IconName;
} & BadgeBase;

export type BadgeProps = BadgeWithText | BadgeWithIcon;
