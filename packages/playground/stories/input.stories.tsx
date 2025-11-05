import Showcase from '../components/Showcase';
import Grid from '../components/Grid';
import Input, { InputProps } from '../../react/src/Input';

type GroupProps = {
    label: string;
    props?: InputProps;
};

const interactionStates: GroupProps[] = [
    { label: 'default' },
    { label: 'hover', props: { pseudoStates: ['hover'] } },
    { label: 'focus', props: { pseudoStates: ['focus'] } },
    { label: 'disabled', props: { isDisabled: true } },
    { label: 'readonly', props: { isReadonly: true } },
];

const contentStates: GroupProps[] = [
    { label: 'empty' },
    { label: 'filled', props: { value: 'value' } },
    { label: 'placeholder', props: { placeholder: 'placeholder' } },
];

const validationStates: GroupProps[] = [
    { label: 'required', props: { isRequired: true } },
    { label: 'error', props: { isError: true } },
    { label: 'success', props: { isSuccess: true } },
];

const combinedStates: GroupProps[] = [
    {
        label: 'empty + required',
        props: { isRequired: true },
    },
    {
        label: 'filled + error',
        props: { value: 'value', isError: true },
    },
    {
        label: 'placeholder + error',
        props: { placeholder: 'placeholder', isError: true },
    },
    {
        label: 'filled + success',
        props: { value: 'value', isSuccess: true },
    },
];

export const Overview = () => {
    return (
        <Showcase label="Input">
            <Showcase.Item label="Content states">
                {renderGroup(contentStates)}
            </Showcase.Item>

            <Showcase.Item label="Validation states">
                {renderGroup(validationStates)}
            </Showcase.Item>

            <Showcase.Item label="Combined states">
                {renderGroup(combinedStates)}
            </Showcase.Item>
        </Showcase>
    );
};

/**
 * Универсальная функция рендера группы Grid.
 * @param group массив объектов с label и props для Input
 * @param columns число колонок, по умолчанию равно длине interactionStates
 */
function renderGroup(group: GroupProps[], columns?: number) {
    const colCount = columns ?? interactionStates.length;

    return group.map(({ label, props }, i) => (
        <Grid columns={colCount} key={i}>
            <Grid.Header label={label} />
            {interactionStates.map(
                ({ label: stateLabel, props: interactionProps }, j) => (
                    <Grid.Cell key={j}>
                        <Showcase.Variant label={stateLabel}>
                            <Input {...props} {...interactionProps} />
                        </Showcase.Variant>
                    </Grid.Cell>
                ),
            )}
        </Grid>
    ));
}
