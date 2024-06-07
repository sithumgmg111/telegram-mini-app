import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import tooltipIcon from '../../assets/tooltip_icon.svg';
const Tooltip = ({ headline, content, link = undefined, linkText = '', children, }) => {
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseEnter = () => {
        setIsHovering(true);
    };
    const handleMouseLeave = () => {
        setIsHovering(false);
    };
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsHovering(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
    return (_jsxs("div", { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, onClick: handleMouseEnter, children: [_jsx("div", { className: "flex justify-center items-center gap-5", children: _jsx("img", { className: "w-4 h-4", src: tooltipIcon, alt: "Tooltip" }) }), children, isHovering && (_jsx("div", { ref: ref, className: "absolute h-fit z-1000 bg-customBlueButton text-white rounded-2xl p-2 text-left my-0 mr-2 ml-0 font-sm shadow-lg", children: _jsxs("div", { className: "max-w-96", children: [_jsx("h3", { className: "p-0 m-0 font-bold", children: headline }), _jsx("p", { className: "pt-2 px-0 pb-0 m-0 font-medium whitespace-pre-line", children: content }), link && (_jsx("a", { href: link, style: { display: 'inline-block' }, target: "_blank", children: linkText }))] }) }))] }));
};
export default Tooltip;
