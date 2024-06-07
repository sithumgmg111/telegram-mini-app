import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import ConnectButton from '../buttons/ConnectButton';
import { useTonConnectModal } from '@tonconnect/ui-react';
const TonConnectModal = ({ title, icon }) => {
    const { open } = useTonConnectModal();
    const openModal = () => {
        open();
    };
    return (_jsx(_Fragment, { children: _jsx(ConnectButton, { title: title, icon: icon, callback: openModal }) }));
};
export default TonConnectModal;
