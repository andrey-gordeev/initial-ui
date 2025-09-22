import { Children, ReactNode } from 'react';

import Divider from '../Divider/Divider';

import './styles.css';

type ShowcaseProps = {
    children?: ReactNode;
};

const Showcase = ({ children }: ShowcaseProps) => {
    return <div className="showcase">{children}</div>;
};

type ShowcaseItemProps = {
    children?: ReactNode;
    label?: string;
};

const ShowcaseItem = ({ children, label }: ShowcaseItemProps) => {
    const count = Children.count(children);

    return (
        <div className="showcase-item">
            <div className="showcase-item__label">{label}</div>
            <Divider />
            <div
                className="showcase-item__content"
                style={
                    count > 1
                        ? { display: 'flex', flexWrap: 'wrap', gap: 16 }
                        : {}
                }
            >
                {children}
            </div>
        </div>
    );
};

type ShowcaseVariantProps = {
    children?: ReactNode;
    label?: string;
};

const ShowcaseVariant = ({ children, label }: ShowcaseVariantProps) => {
    return (
        <div className="showcase-variant">
            {Children.map(children, (item) => (
                <>
                    <div className="showcase-variant__label">{label}</div>
                    <div className="showcase-variant__content">{item}</div>
                </>
            ))}
        </div>
    );
};

export { Showcase, ShowcaseItem, ShowcaseVariant };
