import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { getDominantColor } from '../../utils/dominantColor';
const WalletBadge = ({ walletName, icon, selected, callback, }) => {
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
    return (_jsxs("div", { onClick: callback, className: "flex items-center gap-3 rounded-lg p-2 text-customBlackText", style: { backgroundColor: selected ? backgroundColor : '' }, children: [_jsx("img", { className: "w-9 h-9", src: icon, alt: "" }), _jsx("p", { className: "dark:text-customDarkModeTextColor", children: walletName })] }));
};
export default WalletBadge;
