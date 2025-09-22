import { IconProps } from './types';
import { getIcon } from './IconRegistry';
import './styles.scss';

/**
 * Icon Component
 *
 * Использование:
 * <Icon name="add" size="md" color="blue" />
 * <Icon name="home" size="lg" color="red" />
 * <Icon name="arrow" size="stretch" color="white" />
 */
const Icon = ({ name, size = 'md', color, className, style }: IconProps) => {
    const IconComponent = getIcon(name);

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in IconRegistry`);
        return null;
    }

    return (
        <IconComponent
            size={size}
            color={color}
            className={className}
            style={style}
        />
    );
};

export default Icon;
