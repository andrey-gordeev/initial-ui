import type { ComponentType } from 'react';
import type { InputProps } from '../../react/src/Input';
import type { InputTextProps } from '../../react/src/InputText';
import Showcase from '../components/Showcase';
import Grid from '../components/Grid';

export type InputGroupProps<T extends InputProps | InputTextProps> = {
    label: string;
    props?: T;
};

const INPUT_INTERACTION_STATES: InputGroupProps<InputProps>[] = [
    { label: 'default' },
    { label: 'hover', props: { pseudoStates: ['hover'] } },
    { label: 'focus', props: { pseudoStates: ['focus'] } },
    { label: 'readonly', props: { isReadonly: true } },
    { label: 'disabled', props: { isDisabled: true } },
];

export function renderInputGroup<T extends InputProps | InputTextProps>(
    group: InputGroupProps<T>[],
    Component: ComponentType<T>,
) {
    const interaction = INPUT_INTERACTION_STATES;

    return group.map(({ label, props }, i) => (
        <Grid columns={interaction.length} key={i}>
            <Grid.Header label={label} />
            {interaction.map(
                ({ label: interactionLabel, props: interactionProps }, j) => (
                    <Grid.Cell key={j}>
                        <Showcase.Variant label={interactionLabel}>
                            <Component
                                {...({ ...props, ...interactionProps } as T)}
                            />
                        </Showcase.Variant>
                    </Grid.Cell>
                ),
            )}
        </Grid>
    ));
}
