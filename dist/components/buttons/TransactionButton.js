import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TransactionButton = ({ text, icon, callback }) => {
    return (_jsxs("div", { onClick: callback, className: "flex flex-col w-full justify-center text-center gap-1", children: [_jsx("div", { className: "flex justify-center", children: _jsx("img", { src: icon, alt: "" }) }), _jsx("div", { className: "text-center", children: _jsx("p", { className: "my-0 mx-auto text-customBlueButton font-semibold", children: text }) })] }));
};
export default TransactionButton;
