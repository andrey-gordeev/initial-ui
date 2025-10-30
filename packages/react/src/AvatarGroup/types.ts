import { AvatarProps } from '../Avatar';

export interface AvatarGroupItem extends Omit<AvatarProps, 'size'> {
    id?: string;
}

export interface AvatarGroupProps {
    /**
     * Массив аватаров для отображения в группе
     */
    avatars?: AvatarGroupItem[];

    /**
     * Максимальное количество видимых аватаров
     * @default 5
     */
    maxVisible?: number;

    /**
     * Размер перекрытия между аватарами в пикселях
     * @default 8
     */
    overlap?: number;

    /**
     * Размер зазора в вырезах в пикселях
     * @default 0
     */
    gap?: number;

    /**
     * Размер всех аватаров в группе
     * @default 'md'
     */
    size?: AvatarProps['size'];

    /**
     * Показывать ли бейдж с количеством скрытых аватаров
     * @default true
     */
    showOverflow?: boolean;
}
