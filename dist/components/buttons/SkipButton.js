import { jsx as _jsx } from "react/jsx-runtime";
const SkipButton = ({ skip }) => {
    return (_jsx("div", { className: "flex p-4 text-sm font-medium justify-end text-customGraySkip", onClick: skip, children: _jsx("span", { className: "font-medium text-sm", children: "Skip" }) }));
};
export default SkipButton;
