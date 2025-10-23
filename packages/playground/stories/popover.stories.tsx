import { useState } from 'react';
import { Showcase, ShowcaseItem } from '../components/Showcase';
import Stack from '../../react/src/Stack';
import Popover, { PopoverProps } from '../../react/src/Popover';

export const Overview = () => {
    const [placement, setPlacement] =
        useState<PopoverProps['placement']>('top');

    const handle = (placement: PopoverProps['placement']) => {
        setPlacement(placement);
    };

    return (
        <Showcase>
            <ShowcaseItem label="Interactive Placement Demo">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 300,
                        height: 300,
                        outline: '1px dotted #ccc',
                        outlineOffset: '-2px',
                        backgroundColor: '#f9f9f9',
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            width: 8,
                            height: 8,
                            backgroundColor: '#007acc',
                            borderRadius: '50%',
                        }}
                    >
                        <Popover placement={placement}>
                            <div style={{ padding: '8px', fontSize: '14px' }}>
                                Popover with placement:{' '}
                                <strong>{placement}</strong>
                            </div>
                        </Popover>
                    </div>
                </div>
            </ShowcaseItem>
            <Stack>
                <button onClick={() => handle('top')}>top</button>
                <button onClick={() => handle('top-start')}>top-start</button>
                <button onClick={() => handle('top-end')}>top-end</button>
                <button onClick={() => handle('bottom')}>bottom</button>
                <button onClick={() => handle('bottom-start')}>
                    bottom-start
                </button>
                <button onClick={() => handle('bottom-end')}>bottom-end</button>
                <button onClick={() => handle('left')}>left</button>
                <button onClick={() => handle('right')}>right</button>
            </Stack>
        </Showcase>
    );
};

export const AllPlacements = () => {
    const placements: PopoverProps['placement'][] = [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'right',
    ];

    return (
        <Showcase>
            <ShowcaseItem label="All Placements">
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '16px',
                        padding: '20px',
                        width: '100%',
                        aspectRatio: '1 / 1',
                    }}
                >
                    {placements.map((placement) => (
                        <div
                            key={placement}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                minHeight: '80px',
                                outline: '1px dashed #ddd',
                                backgroundColor: '#f5f5f5',
                            }}
                        >
                            <div
                                style={{
                                    position: 'relative',
                                    width: '6px',
                                    height: '6px',
                                    backgroundColor: '#007acc',
                                    borderRadius: '50%',
                                }}
                            >
                                <Popover placement={placement}>
                                    <div
                                        style={{
                                            padding: '6px',
                                            fontSize: '12px',
                                        }}
                                    >
                                        {placement}
                                    </div>
                                </Popover>
                            </div>
                        </div>
                    ))}
                </div>
            </ShowcaseItem>
        </Showcase>
    );
};
