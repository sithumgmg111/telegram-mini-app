import { jsx as _jsx } from "react/jsx-runtime";
import chevronLeftIcon from '../../assets/chevron-left.svg';
const BackButton = ({ goBack }) => {
    return (_jsx("div", { className: "flex p-4 text-sm justify-start", children: _jsx("img", { onClick: goBack, src: chevronLeftIcon, alt: "Back" }) }));
};
export default BackButton;
