import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import WebApp from '@twa-dev/sdk';
import { PulseLoader } from 'react-spinners';
import NetworkBadge from './NetworkBadge';
import WalletBadge from './WalletBadge';
import PrimaryButton from '../buttons/PrimaryButton';
import crossIcon from '../../assets/cross_icon.svg';
import upCircleIcon from '../../assets/up_circle_icon.svg';
import downCircleIcon from '../../assets/down_circle_icon.svg';
import ethereumLogo from '../../assets/ethereum_logo.svg';
import tezosLogo from '../../assets/tezos_logo.png';
import metamaskLogo from '../../assets/metamask_logo.svg';
import trustWalletLogo from '../../assets/trust_wallet.svg';
import templeLogo from '../../assets/temple_logo.svg';
import accountIconPlaceholder from '../../assets/account_placeholder.svg';
import copyIcon from '../../assets/copy_icon.svg';
import documentIcon from '../../assets/document_icon.svg';
import dangerIcon from '../../assets/danger_icon.svg';
import { truncateText } from '../../utils/truncateText';
import { useSelector, useDispatch } from 'react-redux';
import { setConnectionState } from '../../redux/connectionSlice';
import './ConnectOverlay.css';
const BRIDGE_URL = import.meta.env.VITE_BRIDGE_URL || '';
const ConnectOverlay = ({ slideAnimation, account, close, onConnect, }) => {
    // Redux
    const connectionState = useSelector((state) => state.connection.connectionState);
    const dispatch = useDispatch();
    // Dark Mode
    const [darkMode, setDarkMode] = useState(WebApp.colorScheme === 'dark');
    useEffect(() => {
        setDarkMode(WebApp.colorScheme === 'dark');
        document.documentElement.classList.toggle('dark', darkMode);
        window.localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [WebApp.colorScheme]);
    const [networksExpanded, setNetworksExpanded] = useState(true);
    const [ethereumWalletsExpanded, setEthereumWalletsExpanded] = useState(false);
    const [tezosWalletsExpanded, setTezosWalletsExpanded] = useState(false);
    const toggleNetworks = () => {
        setNetworksExpanded(!networksExpanded);
    };
    const [metaMaskSelected, setMetaMaskSelected] = useState(false);
    const [trustWalletSelected, setTrustWalletSelected] = useState(false);
    // handle connect overlay close
    const handleClose = () => {
        if (connectionState === 'connecting') {
            dispatch(setConnectionState('disconnected'));
        }
        close();
    };
    // connect function
    const connectWallet = async (wallet) => {
        if (!wallet)
            return;
        if (wallet === 'metamask') {
            setMetaMaskSelected(true);
            setTrustWalletSelected(false);
        }
        if (wallet === 'trust') {
            setMetaMaskSelected(false);
            setTrustWalletSelected(true);
        }
        try {
            dispatch(setConnectionState('connecting'));
            window.localStorage.removeItem('walletconnect');
            window.localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE');
            const response = await axios.post(BRIDGE_URL + '/init-provider', {
                wallet: wallet,
            });
            const providerId = response.data.providerId;
            const uri = response.data.uri;
            window.localStorage.setItem('providerId', providerId);
            window.localStorage.setItem('walletConnectURI', uri);
            window.localStorage.setItem('walletProvider', wallet);
            WebApp.openLink(response.data.universalLink);
            const startTime = Date.now(); // Record start time
            const timeout = 30000; // 30 seconds timeout
            // Function to check connection status
            const checkConnection = async () => {
                if (Date.now() - startTime > timeout) {
                    return;
                }
                try {
                    const statusResponse = await axios.post(BRIDGE_URL + '/is-connected', {
                        providerId: providerId,
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'ngrok-skip-browser-warning': 'true',
                        },
                    });
                    if (statusResponse.data.connected) {
                        onConnect();
                    }
                    else {
                        console.log('Not Connected, checking again...');
                        setTimeout(checkConnection, 1000);
                    }
                }
                catch (error) {
                    console.error('Error checking connection:', error);
                    setTimeout(checkConnection, 1000);
                }
            };
            // Start checking connection status
            checkConnection();
        }
        catch (error) {
            dispatch(setConnectionState('error'));
        }
    };
    // Network Selection
    const [ethereumSelected, setEthereumSelected] = useState(false);
    const [tezosSelected, setTezosSelected] = useState(false);
    // Toggle Wallets
    const toggleWallets = () => {
        if (ethereumSelected) {
            setEthereumWalletsExpanded(!ethereumWalletsExpanded);
        }
        if (tezosSelected) {
            setTezosWalletsExpanded(!tezosWalletsExpanded);
        }
    };
    const showAvailableWallets = (network) => {
        if (network === 'ethereum') {
            setEthereumSelected(true);
            setTezosSelected(false);
            setTezosWalletsExpanded(false);
            setEthereumWalletsExpanded(true);
        }
        if (network === 'tezos') {
            setEthereumSelected(false);
            setTezosSelected(true);
            setEthereumWalletsExpanded(false);
            setTezosWalletsExpanded(true);
        }
    };
    // Copy Account to Clipboard
    const copyAccountToClipboard = () => {
        if (!account)
            return;
        navigator.clipboard.writeText(account);
        WebApp.showPopup({ message: 'Address copied to clipboard!' });
    };
    // View on Explorer
    const viewOnExplorer = () => {
        if (!account)
            return;
        WebApp.openLink(`https://etherscan.io/address/${account}`);
    };
    // Handle Disconnect
    const handleDisconnect = async () => {
        window.localStorage.removeItem('providerId');
        window.localStorage.removeItem('walletConnectURI');
        window.localStorage.removeItem('walletProvider');
        window.localStorage.removeItem('walletconnect');
        window.localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE');
        dispatch(setConnectionState('disconnected'));
        await axios.post(BRIDGE_URL + '/disconnect', {
            providerId: window.localStorage.getItem('providerId'),
        });
    };
    // Handle Reconnect
    const handleReconnect = () => {
        dispatch(setConnectionState('disconnected'));
    };
    return (_jsxs("div", { className: `connect-overlay ${slideAnimation}`, style: darkMode
            ? {
                backgroundColor: '#262233',
            }
            : {}, children: [_jsxs("div", { className: "flex justify-between text-left py-3 px-4", children: [connectionState === 'connecting' && (_jsx("p", { className: "m-0 text-lg font-bold text-customBlackText dark:text-customDarkModeTextColor", children: "Connecting" })), connectionState === 'disconnected' && (_jsx("p", { className: "m-0 text-lg font-bold text-customBlackText dark:text-customDarkModeTextColor", children: "Connect Wallet" })), connectionState === 'connected' && (_jsx("p", { className: "m-0 text-lg font-bold text-customBlackText dark:text-customDarkModeTextColor", children: "Account Details" })), connectionState === 'error' && (_jsx("p", { className: "m-0 text-lg font-bold text-customBlackText dark:text-customDarkModeTextColor", children: "Connection Error" })), connectionState === 'retrying' && (_jsx("p", { className: "m-0 text-lg font-bold text-customBlackText dark:text-customDarkModeTextColor", children: "Retrying" })), _jsx("div", { onClick: handleClose, className: "flex items-center cursor-pointer", children: _jsx("img", { src: crossIcon, alt: "" }) })] }), _jsx("hr", { className: "m-0 border-t-1 border-solid border-customGrayLine" }), connectionState === 'connecting' && (_jsxs(_Fragment, { children: [_jsx("div", { className: "my-10", children: _jsx(PulseLoader, { size: 12, margin: 5, color: darkMode ? '#DEDEDE' : '#2D2D2D' }) }), _jsx("div", { children: _jsx("p", { className: "text-lg m-4 mt-2 dark:text-customDarkModeTextColor", children: "Connecting Wallet" }) }), _jsx("div", { children: _jsx("p", { className: "m-4 mb-8 px-10 dark:text-customDarkModeTextColor", children: "Please connect your Wallet & approve transaction" }) })] })), connectionState === 'disconnected' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex py-4 px-5 justify-between", children: [_jsx("p", { className: "m-0 text-customBlackText text-base font-medium dark:text-customDarkModeTextColor", children: "Choose Network" }), _jsx("img", { src: networksExpanded ? upCircleIcon : downCircleIcon, onClick: toggleNetworks, alt: "" })] }), networksExpanded && (_jsxs("div", { className: "flex m-4 justify-around", children: [_jsx("div", { className: "w-1/2 px-6", children: _jsx(NetworkBadge, { network: "Ethereum", icon: ethereumLogo, selected: ethereumSelected, callback: () => showAvailableWallets('ethereum') }) }), _jsx("div", { className: "w-1/2 px-6", children: _jsx(NetworkBadge, { network: "Tezos", icon: tezosLogo, selected: tezosSelected, callback: () => showAvailableWallets('tezos') }) })] })), _jsxs("div", { className: "flex py-4 px-5 justify-between", children: [_jsx("p", { className: "m-0 text-customBlackText text-base font-medium dark:text-customDarkModeTextColor", children: "Select Wallet" }), _jsx("img", { src: ethereumWalletsExpanded
                                    ? upCircleIcon
                                    : downCircleIcon, onClick: toggleWallets, alt: "" })] }), ethereumWalletsExpanded && (_jsxs("div", { className: "flex mb-16 m-4 justify-around", children: [_jsx(WalletBadge, { walletName: "Metamask", icon: metamaskLogo, selected: metaMaskSelected, callback: () => connectWallet('metamask') }), _jsx(WalletBadge, { walletName: "Trust Wallet", icon: trustWalletLogo, selected: trustWalletSelected, callback: () => connectWallet('trust') })] })), tezosWalletsExpanded && (_jsxs("div", { className: "flex mb-16 m-4 justify-around", children: [_jsx(WalletBadge, { walletName: "Trust Wallet", icon: trustWalletLogo, selected: trustWalletSelected, callback: () => { } }), _jsx(WalletBadge, { walletName: "Temple", icon: templeLogo, callback: () => { } })] }))] })), connectionState === 'connected' && (_jsxs("div", { className: "flex flex-col gap-4 py-5 px-7", children: [_jsxs("div", { className: "border-solid border border-gray-200 rounded-lg", children: [_jsxs("div", { className: "flex align-middle justify-start items-center my-2 mx-1 p-2 gap-4", children: [_jsx("div", { className: "w-8 h-8 object-contain", children: _jsx("img", { className: "w-full h-full", src: accountIconPlaceholder, alt: "" }) }), account && (_jsx("p", { className: "dark:text-customDarkModeTextColor", children: truncateText(account, 8, 8) }))] }), _jsxs("div", { className: "flex justify-between my-2 mx-1 p-2 mr-4 gap-4", children: [_jsxs("div", { className: "flex align-middle justify-start items-center gap-2", onClick: copyAccountToClipboard, children: [_jsx("img", { src: copyIcon, alt: "" }), _jsx("p", { className: "text-xs text-customGrayAccountDetails font-normal dark:text-customDarkModeTextColor", children: "Copy Address" })] }), _jsxs("div", { className: "flex align-middle justify-start items-center gap-2", onClick: viewOnExplorer, children: [_jsx("img", { src: documentIcon, alt: "" }), _jsx("p", { className: "text-xs text-customGrayAccountDetails font-normal dark:text-customDarkModeTextColor", children: "View on explorer" })] })] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("div", { className: "flex align-middle items-center", children: _jsxs("p", { className: "text-xs dark:text-customDarkModeTextColor", children: ["Connected with", ' ', window.localStorage.getItem('walletProvider')] }) }), _jsx("button", { className: "border border-red-300 rounded-xl py-4 px-6 bg-red-100 active:bg-red-200", onClick: handleDisconnect, children: _jsx("p", { className: "text-base font-normal", children: "Disconnect" }) })] })] })), connectionState === 'error' && (_jsxs("div", { className: "flex flex-col gap-4 py-5 px-7", children: [_jsx("div", { className: "flex justify-center mt-4 mb-0", children: _jsx("img", { src: dangerIcon, alt: "" }) }), _jsx("div", { children: _jsx("p", { className: "text-lg font-normal dark:text-customDarkModeTextColor", children: "An Unwanted Error Occurred" }) }), _jsxs("div", { className: "flex flex-col mb-4 dark:text-customDarkModeTextColor", children: [_jsx("p", { children: "Wallet not connected." }), _jsx("p", { children: "Please try again" })] }), _jsx("div", { className: "flex mb-2 align-middle justify-center", children: _jsx(PrimaryButton, { title: "Re-Connect", className: "w-3/5", callback: handleReconnect }) })] }))] }));
};
export default ConnectOverlay;
