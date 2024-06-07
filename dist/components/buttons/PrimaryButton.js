import { jsx as _jsx } from "react/jsx-runtime";
const PrimaryButton = ({ title, className, textColor = 'white', callback, }) => {
    return (_jsx("button", { className: `flex items-center justify-center bg-customBlueButton w-full h-12 text-${textColor} py-3 px-5 rounded-lg border-customBlueButton border-1 text-base font-semibold text-center ${className} active:bg-blue-400`, onClick: callback, children: _jsx("span", { children: title }) }));
};
export default PrimaryButton;
