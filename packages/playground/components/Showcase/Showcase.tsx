import Divider from '../Divider';
import { ShowcaseComponent, ItemProps, VariantProps } from './types';
import './styles.css';

export const Showcase: ShowcaseComponent = ({ children, label }) => {
    return (
        <div className="showcase">
            {label ? <h1 className="showcase__label">{label}</h1> : null}
            <div className="showcase__content">{children}</div>
        </div>
    );
};

const Item = ({ children, label }: ItemProps) => {
    return (
        <div className="showcase-item">
            {label ? <h2 className="showcase-item__label">{label}</h2> : null}
            <Divider />
            <div className="showcase-item__content">{children}</div>
        </div>
    );
};

const Variant = ({ children, label }: VariantProps) => {
    return (
        <div className="showcase-variant">
            {label ? (
                <div className="showcase-variant__label">{label}</div>
            ) : null}
            <div className="showcase-variant__content">{children}</div>
        </div>
    );
};

Showcase.Item = Item;
Showcase.Variant = Variant;
