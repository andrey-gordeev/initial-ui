import type { AriaAttributes, ReactNode } from 'react';

type RadioGroupAriaAttributes = Pick<
    AriaAttributes,
    | 'aria-label'
    | 'aria-labelledby'
    | 'aria-describedby'
    | 'aria-description'
    | 'aria-errormessage'
>;

export type ItemRenderProps = {
    isSelected: boolean;
    isDisabled: boolean;
};

export type ItemProps = {
    value: string;
    label: string;
    isDisabled?: boolean;
    render?: (props: ItemRenderProps) => ReactNode;
};

export type RadioGroupControlledProps = {
    /** Selected value. Set this to use RadioGroup as a controlled component. */
    value: string;
    /** Called when the selected value changes. Required in controlled mode. */
    onValueChange: (value: string) => void;
    defaultValue?: never;
};

/**
 * Typing props this way prevents setting `value` without `onValueChange`,
 * or mixing `value` with `defaultValue`.
 * Both controlled props must be set together, or neither must be set.
 */
export type RadioGroupValueProps =
    | RadioGroupControlledProps
    | {
          value?: never;
          onValueChange?: (value: string) => void;
          defaultValue?: string;
      };

export type RadioGroupProps = RadioGroupAriaAttributes &
    RadioGroupValueProps & {
        children: ReactNode;
        name?: string;
        isDisabled?: boolean;
        isRequired?: boolean;
        isInvalid?: boolean;
        orientation?: 'vertical' | 'horizontal';
    };
