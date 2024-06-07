import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ConnectButton = ({ title, icon, callback }) => {
    return (_jsxs("button", { className: "flex items-center justify-center bg-customBlueButton active:bg-blue-400 text-white py-3 px-5 rounded-xl border-none text-base font-semibold whitespace-nowrap", onClick: callback, children: [_jsx("div", { className: "flex flex-shrink-0 items-center justify-center h-7 w-11 mr-3", children: _jsx("img", { className: "max-h-full max-w-full", src: icon, alt: "" }) }), _jsx("span", { className: "flex-grow text-center -ml-9", children: title })] }));
};
export default ConnectButton;
