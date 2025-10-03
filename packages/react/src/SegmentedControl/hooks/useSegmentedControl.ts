import { useState } from 'react';

export const useSegmentedControl = (initialValue: string = '') => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        onChange: setValue,
    };
};



