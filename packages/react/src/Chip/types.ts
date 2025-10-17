import { IconName } from '../Icon';

export type ChipProps = {
    label: string;
    icon?: IconName;
    isSelectable?: boolean;
    isSelected?: boolean;
    onClick?: () => void;
};
