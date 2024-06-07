import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import ethereumIcon from '../../assets/ether_icon.png';
const TransactionHistoryItem = ({ currency, symbol, valueSpot, }) => {
    const [valueFiat, setValueFiat] = useState(0);
    const getFiatValue = async () => {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`);
        const data = await response.json();
        setValueFiat(Number((data.ethereum.usd * valueSpot).toFixed(2)));
    };
    useEffect(() => {
        getFiatValue();
    }, []);
    return (_jsxs("div", { className: "grid grid-cols-custom-1-3-1 gap-2 items-center py-2 px-4 rounded-2xl bg-white", children: [_jsx("div", { className: "h-12 w-12", children: _jsx("img", { className: "object-contain h-full w-full", src: ethereumIcon, alt: "" }) }), _jsxs("div", { className: "flex flex-col text-left text-lg justify-center", children: [_jsx("p", { className: "m-0 font-semibold", children: currency }), _jsxs("div", { className: "flex gap-1 text-customGrayAddress", children: [_jsx("p", { className: "m-0", children: valueSpot }), _jsx("p", { className: "m-0", children: symbol })] })] }), _jsx("div", { className: "text-lg font-medium text-right", children: _jsxs("p", { children: ["$", valueFiat] }) })] }));
};
export default TransactionHistoryItem;
