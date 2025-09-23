import { StackProps } from './types';
import './styles.css';

export const Stack = ({ children }: StackProps) => {
    return <div className="stack">{children}</div>;
};
