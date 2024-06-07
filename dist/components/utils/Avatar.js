import { jsx as _jsx } from "react/jsx-runtime";
const Avatar = ({ src }) => {
    return (_jsx("div", { className: "flex flex-grow items-center justify-center overflow-hidden max-h-96 py-2 px-8", children: _jsx("img", { className: "h-auto max-w-full object-contain", src: src, alt: "" }) }));
};
export default Avatar;
