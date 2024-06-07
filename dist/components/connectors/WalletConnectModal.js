import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useWeb3Modal } from '@web3modal/ethers/react';
import ConnectButton from '../buttons/ConnectButton';
const WalletConnectModal = ({ title, icon }) => {
    const { open } = useWeb3Modal();
    const connect = async () => {
        open();
    };
    return (_jsx(_Fragment, { children: _jsx(ConnectButton, { title: title, icon: icon, callback: connect }) }));
};
export default WalletConnectModal;
