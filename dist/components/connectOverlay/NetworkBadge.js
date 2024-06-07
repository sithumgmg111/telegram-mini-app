import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { getDominantColor } from '../../utils/dominantColor';
const NetworkBadge = ({ network, icon, selected, callback, }) => {
    const [backgroundColor, setBackgroundColor] = useState('');
    useEffect(() => {
        if (!selected)
            return;
        getDominantColor(icon)
            .then((color) => {
            setBackgroundColor(color);
        })
            .catch((error) => console.error('Failed to load image color:', error));
    }, [icon, selected]);
    return (_jsxs("div", { onClick: callback, className: `flex flex-col items-center justify-center text-customBlackText rounded-lg p-2 
           
            `, style: { backgroundColor: selected ? backgroundColor : '' }, children: [_jsx("img", { className: "w-11 h-11", src: icon, alt: "" }), _jsx("p", { className: "dark:text-customDarkModeTextColor", children: network })] }));
};
export default NetworkBadge;
