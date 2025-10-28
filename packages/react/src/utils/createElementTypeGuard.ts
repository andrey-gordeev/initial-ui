import { ReactElement, ReactNode, isValidElement, ComponentType } from 'react';

/**
 * Creates a type guard function to check component displayName
 *
 * @param expectedDisplayName - expected displayName value of the component
 * @returns a check function that returns true if the element has the expected displayName
 *
 * @example
 * const isValidOption = createElementTypeGuard<OptionProps>('Option');
 * if (isValidOption(child)) {
 *     // child is now automatically typed as ReactElement<OptionProps>
 *     console.log(child.props.label);
 * }
 */
export function createElementTypeGuard<P = unknown>(
    expectedDisplayName: string,
) {
    return (node: ReactNode): node is ReactElement<P> => {
        return (
            isValidElement(node) &&
            (node.type as ComponentType<P>)?.displayName === expectedDisplayName
        );
    };
}
