import { useState, type CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { RadioGroup } from './RadioGroup';

type Story = StoryObj<typeof meta>;

const meta = {
    title: 'Components/RadioGroup',
    component: RadioGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: false,
            description: 'Composition API: `RadioGroup.Item`.',
            table: { type: { summary: 'ReactNode' } },
        },
        name: {
            description: 'Radio group name shared across inputs.',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
        defaultValue: {
            description: 'Initial selected value (uncontrolled).',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
        value: {
            description: 'Selected value (controlled).',
            control: 'text',
            table: { type: { summary: 'string' } },
        },
        onValueChange: {
            description: 'Callback when selection changes.',
            control: false,
            table: { type: { summary: '(value: string) => void' } },
        },
        orientation: {
            description: 'Layout direction.',
            control: 'select',
            options: ['vertical', 'horizontal'],
            table: {
                type: { summary: "'vertical' | 'horizontal'" },
                defaultValue: { summary: 'vertical' },
            },
        },
    },
} satisfies Meta<typeof RadioGroup>;

const itemsTemplate = [
    <RadioGroup.Item key="warrior" value="warrior" label="Warrior (STR)" />,
    <RadioGroup.Item key="mage" value="mage" label="Mage (INT)" />,
    <RadioGroup.Item key="rogue" value="rogue" label="Rogue (DEX)" />,
];

export const Default: Story = {
    args: {
        'aria-label': 'Character class',
        'children': itemsTemplate,
    },
};

export const DefaultValue: Story = {
    storyName: 'defaultValue',
    args: {
        'aria-label': 'Character class',
        'defaultValue': 'mage',
        'children': itemsTemplate,
    },
};

export const Controlled = {
    storyName: 'controlled',
    render: () => {
        const [value, setValue] = useState('mage');
        return (
            <>
                <div style={{ marginBlockEnd: 8 }}>
                    Selected: <strong>{value}</strong>
                    <button
                        style={{ marginInlineStart: 8 }}
                        onClick={() => setValue('rogue')}
                    >
                        Select Rogue
                    </button>
                </div>
                <RadioGroup
                    aria-label="Character class"
                    value={value}
                    onValueChange={setValue}
                >
                    <RadioGroup.Item value="warrior" label="Warrior (STR)" />
                    <RadioGroup.Item value="mage" label="Mage (INT)" />
                    <RadioGroup.Item value="rogue" label="Rogue (DEX)" />
                </RadioGroup>
            </>
        );
    },
};

export const Disabled: Story = {
    storyName: 'isDisabled',
    args: {
        'aria-label': 'Character class',
        'defaultValue': 'mage',
        'children': [
            <RadioGroup.Item
                key="warrior"
                value="warrior"
                label="Warrior (STR)"
                isDisabled={true}
            />,
            <RadioGroup.Item key="mage" value="mage" label="Mage (INT)" />,
            <RadioGroup.Item
                key="rogue"
                value="rogue"
                label="Rogue (DEX)"
                isDisabled={true}
            />,
        ],
    },
};

export const Horizontal: Story = {
    storyName: 'orientation: horizontal',
    args: {
        'aria-label': 'Character class',
        'orientation': 'horizontal',
        'defaultValue': 'mage',
        'children': itemsTemplate,
    },
};

// ---------------------------------------------------------------------------
// render prop demos
// ---------------------------------------------------------------------------

// --- Rating (stars) ---

const Star = ({ isFilled }: { isFilled: boolean }) => (
    <svg
        viewBox="0 0 24 24"
        width={28}
        height={28}
        fill={isFilled ? '#f59e0b' : 'none'}
        stroke={isFilled ? '#f59e0b' : '#d1d5db'}
        strokeWidth={2}
        aria-hidden="true"
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

export const Rating = {
    storyName: 'render: rating',
    render: () => {
        const [value, setValue] = useState('3');

        return (
            <div>
                <div style={{ marginBlockEnd: 8 }}>
                    Rating: <strong>{value}</strong> / 5
                </div>
                <RadioGroup
                    aria-label="Rating"
                    orientation="horizontal"
                    value={value}
                    onValueChange={setValue}
                >
                    {[1, 2, 3, 4, 5].map((n) => (
                        <RadioGroup.Item
                            key={n}
                            value={String(n)}
                            label={`${n} ${n === 1 ? 'star' : 'stars'}`}
                            render={() => (
                                <Star isFilled={n <= Number(value)} />
                            )}
                        />
                    ))}
                </RadioGroup>
            </div>
        );
    },
};

// --- Payment method (cards) ---

const cardStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 16px',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: '#fff',
    inlineSize: 320,
    transition: 'border-color 0.15s',
};

const cardSelectedStyle: CSSProperties = {
    ...cardStyle,
    borderColor: '#6366f1',
};

const cardIconStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    inlineSize: 46,
    blockSize: 32,
    borderRadius: 4,
    border: '1px solid #e5e7eb',
    fontSize: 11,
    fontWeight: 700,
    flexShrink: 0,
};

const PaymentCard = ({
    brand,
    last4,
    expiry,
    isSelected,
}: {
    brand: string;
    last4: string;
    expiry: string;
    isSelected: boolean;
}) => (
    <div style={isSelected ? cardSelectedStyle : cardStyle}>
        <span
            style={{
                ...cardIconStyle,
                color: brand === 'Visa' ? '#1a1f71' : '#eb001b',
            }}
        >
            {brand}
        </span>
        <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>
                {brand} ending in {last4}
            </div>
            <div style={{ fontSize: 13, color: '#6b7280' }}>
                Expiry {expiry}
            </div>
        </div>
        <div
            style={{
                inlineSize: 18,
                blockSize: 18,
                borderRadius: '50%',
                border: isSelected ? '5px solid #6366f1' : '2px solid #d1d5db',
                boxSizing: 'border-box',
            }}
        />
    </div>
);

export const PaymentMethod = {
    storyName: 'render: payment method',
    render: () => {
        const [value, setValue] = useState('visa-1234');

        return (
            <RadioGroup
                aria-label="Payment options"
                value={value}
                onValueChange={setValue}
            >
                <RadioGroup.Item
                    value="visa-1234"
                    label="Visa ending in 1234"
                    render={({ isSelected }) => (
                        <PaymentCard
                            brand="Visa"
                            last4="1234"
                            expiry="06/2028"
                            isSelected={isSelected}
                        />
                    )}
                />
                <RadioGroup.Item
                    value="mc-5678"
                    label="Mastercard ending in 5678"
                    render={({ isSelected }) => (
                        <PaymentCard
                            brand="MC"
                            last4="5678"
                            expiry="12/2026"
                            isSelected={isSelected}
                        />
                    )}
                />
                <RadioGroup.Item
                    value="visa-9012"
                    label="Visa ending in 9012"
                    render={({ isSelected }) => (
                        <PaymentCard
                            brand="Visa"
                            last4="9012"
                            expiry="03/2027"
                            isSelected={isSelected}
                        />
                    )}
                />
            </RadioGroup>
        );
    },
};

export default meta;
