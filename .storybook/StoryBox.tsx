const StoryBox = ({
    label,
    inlineSize,
    blockSize = 50,
}: {
    inlineSize: number;
    blockSize?: number;
    label?: string;
}) => (
    <div
        style={{
            inlineSize: `${inlineSize}px`,
            blockSize: `${blockSize}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            padding: '32px',
            border: '1px dotted #e5e5e5',
        }}
    >
        {label || 'Box'}
    </div>
);

export default StoryBox;
