import { GridComponent, HeaderProps, CellProps } from './types';
import './styles.css';

export const Grid: GridComponent = ({ children, columns }) => {
    return (
        <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
            {children}
        </div>
    );
};

const Header = ({ label }: HeaderProps) => {
    return <div className="grid-header">{label}</div>;
};

const Cell = ({ children }: CellProps) => {
    return <div className="grid-cell">{children}</div>;
};

Grid.Header = Header;
Grid.Cell = Cell;
