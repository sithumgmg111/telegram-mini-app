import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import ConnectButton from '../buttons/ConnectButton';
const EVMConnectModal = ({ title, icon, callback }) => {
    const openModal = () => {
        callback();
    };
    return (_jsx(_Fragment, { children: _jsx(ConnectButton, { title: title, icon: icon, callback: openModal }) }));
};
export default EVMConnectModal;
