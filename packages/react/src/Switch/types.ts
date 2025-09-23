type SwitchBase = {
    isChecked?: boolean;
    isDisabled?: boolean;
    onChange?: () => void;
};

type SwitchLabeled = {
    label?: never;
    hint?: never;
} & SwitchBase;

type SwitchUnlabeled = {
    label: string;
    hint?: string;
} & SwitchBase;

/**
 * Props for the `Switch` component.
 *
 * A `Switch` can exist in two mutually exclusive modes:
 * - **SwitchLabeled**: requires a `label` (and may optionally include a `hint`).
 * - **SwitchUnlabeled**: has no text at all (neither `label` nor `hint` are allowed).
 */
export type SwitchProps = SwitchLabeled | SwitchUnlabeled;
