import { TextareaProps } from './types';
import './styles.css';

export const Textarea = ({ value }: TextareaProps) => {
    return <textarea className="iui-textarea">{value}</textarea>;
};
