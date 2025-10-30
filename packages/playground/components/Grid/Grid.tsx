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
    return <div>{label}</div>;
};

const Cell = ({ children }: CellProps) => {
    return <div>{children}</div>;
};

Grid.Header = Header;
Grid.Cell = Cell;
