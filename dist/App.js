import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import Avatar from './components/utils/Avatar';
import BackButton from './components/buttons/BackButton';
import SkipButton from './components/buttons/SkipButton';
import PrimaryButton from './components/buttons/PrimaryButton';
import Tooltip from './components/utils/Tooltip';
import TransactionButton from './components/buttons/TransactionButton';
import TransactionHistoryItem from './components/utils/TransactionHistoryItem';
import ConnectOverlay from './components/connectOverlay/ConnectOverlay';
import EVMConnectModal from './components/connectors/EVMConnectModal';
import TonConnectModal from './components/connectors/TonConnectModal';
import avatarPhone from './assets/avatar_phone.svg';
import avatarScooter from './assets/avatar_scooter.svg';
import avatarTable from './assets/avatar_table.svg';
import evmConnectIcon from './assets/EVM_connect_logos.png';
import tonConnectIcon from './assets/ton_connect.png';
import walletConnectIcon from './assets/wallet_connect.png';
import etherIcon from './assets/ether_icon.png';
import sendIcon from './assets/send_icon.svg';
import receiveIcon from './assets/receive_icon.svg';
import sellIcon from './assets/sell_icon.svg';
import { useTonWallet } from '@tonconnect/ui-react';
import WalletConnectModal from './components/connectors/WalletConnectModal';
import { useDispatch, useSelector } from 'react-redux';
import { setConnectionState } from './redux/connectionSlice';
var View;
(function (View) {
    View[View["LANDING"] = 0] = "LANDING";
    View[View["CONNECT"] = 1] = "CONNECT";
    View[View["CONNECTED"] = 2] = "CONNECTED";
    View[View["WALLET"] = 3] = "WALLET";
})(View || (View = {}));
WebApp.setHeaderColor('#1a1a1a');
const BRIDGE_URL = import.meta.env.VITE_BRIDGE_URL || '';
function App() {
    const [view, setView] = useState(View.LANDING);
    // Connection State
    const connectionState = useSelector((state) => state.connection.connectionState);
    const dispatch = useDispatch();
    const skip = () => {
        setView(view + 1);
    };
    const goBack = () => {
        if (view === View.LANDING) {
            return;
        }
        setView(view - 1);
    };
    const openWallet = () => {
        setView(View.WALLET);
    };
    // Get Accounts
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const getAccountData = async () => {
        const providerId = window.localStorage.getItem('providerId');
        await axios
            .get(BRIDGE_URL + '/account/' + providerId, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
            },
        })
            .then((response) => {
            setAccount(response.data.account);
            setBalance(response.data.balance);
        });
    };
    const handleConnect = () => {
        dispatch(setConnectionState('connected'));
        setView(View.CONNECTED);
    };
    // Handle MainButton changes on view change
    useEffect(() => {
        if (view === View.LANDING) {
        }
        // Change the Main Buttons color and textColor to match telegrams background color, to "hide" the button
        if (view === View.CONNECT) {
        }
        if (view === View.CONNECTED) {
            getAccountData();
        }
        if (view === View.WALLET) {
        }
    }, [view]);
    // TON Connect
    const tonWallet = useTonWallet();
    useEffect(() => {
        if (!tonWallet)
            return;
        // setAccount(tonWallet.account.address);
        // setView(View.CONNECTED);
    }, [tonWallet]);
    // Test Functions
    const [signedMessage, setSignedMessage] = useState(null);
    const triggerTestMessageSign = () => {
        const providerId = window.localStorage.getItem('providerId');
        if (!providerId) {
            console.error('Provider ID not found.');
            return;
        }
        const wallet = window.localStorage.getItem('walletProvider');
        if (!wallet) {
            console.error('Wallet not found.');
            return;
        }
        const uri = window.localStorage.getItem('walletConnectURI');
        if (wallet === 'metamask') {
            WebApp.openLink(`https://metamask.app.link/wc?uri=${uri}`);
        }
        else if (wallet === 'trust') {
            WebApp.openLink(`https://link.trustwallet.com/wc?uri=${uri}`);
        }
        axios
            .post(BRIDGE_URL + '/sign', {
            message: 'This is a test message.',
            account: account,
            providerId: providerId,
        })
            .then((response) => {
            console.log(response.data.signature);
            setSignedMessage(response.data.signature);
        });
    };
    // Transaction Functions
    const sendFunds = () => {
        // Send Funds
    };
    const receiveFunds = () => {
        // Receive Funds
    };
    const sell = () => {
        // Sell
    };
    // Connect Overlay
    const [showConnectOverlay, setShowConnectOverlay] = useState(false);
    const [slideAnimation, setSlideAnimation] = useState('in');
    const openConnectOverlay = () => {
        setSlideAnimation('in');
        setTimeout(() => setShowConnectOverlay(true), 100);
    };
    const closeConnectOverlay = () => {
        setSlideAnimation('out');
        setTimeout(() => setShowConnectOverlay(false), 100);
    };
    // Disconnect
    const handleDisconnect = async () => {
        WebApp.showConfirm('Are you sure you want to disconnect?', async (confirmed) => {
            if (!confirmed)
                return;
            window.localStorage.removeItem('providerId');
            window.localStorage.removeItem('walletConnectURI');
            window.localStorage.removeItem('walletProvider');
            window.localStorage.removeItem('walletconnect');
            window.localStorage.removeItem('WALLETCONNECT_DEEPLINK_CHOICE');
            dispatch(setConnectionState('disconnected'));
            setSignedMessage(null);
            setView(View.CONNECT);
            await axios.post(BRIDGE_URL + '/disconnect', {
                providerId: window.localStorage.getItem('providerId'),
            });
        });
    };
    return (_jsxs("div", { className: "flex flex-col h-full min-h-screen w-screen rounded-xl bg-customGrayWallet", children: [view === View.LANDING && (_jsxs("div", { className: "flex flex-col flex-grow min-h-full justify-end", children: [_jsxs("div", { className: "components-container mb-2", children: [_jsx(SkipButton, { skip: skip }), _jsx(Avatar, { src: avatarScooter }), _jsxs("div", { className: "flex flex-col bg-white pt-4 pr-8 pb-8 pl-8 gap-4 rounded-t-3xl rounded-b-xl shadow-custom-white", children: [_jsx("div", { children: _jsx("h2", { className: "headline", children: "Telegram Mini App Demo" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-customGrayText mt-0 mr-0 mb-4 ml-0", children: "Click on the button below and follow the instructions to link your wallet to this telegram mini app demo." }), _jsx("p", { className: "text-customGrayText mt-0 mr-0 mb-4 ml-0", children: "Softstack is a Web3 software development, cybersecurity and consulting service partner." })] })] })] }), _jsx("div", { className: "p-2 mb-4", children: _jsx(PrimaryButton, { title: "Connect Your Wallet", callback: skip }) })] })), view === View.CONNECT && (_jsxs("div", { className: "components-container", children: [_jsxs("div", { className: `transition-opacity duration-1000 ease-in-out ${showConnectOverlay && 'blur-sm brightness-90'}`, children: [_jsxs("div", { className: "flex justify-between", children: [_jsx(BackButton, { goBack: goBack }), connectionState === 'connected' && (_jsx(SkipButton, { skip: skip }))] }), _jsx(Avatar, { src: avatarPhone }), _jsxs("div", { className: "flex flex-col absolute w-full bottom-0 bg-white pt-4 px-8 pb-14 gap-4 rounded-t-3xl rounded-b-xl shadow-custom-white", children: [_jsx("h2", { className: "headline", children: "CONNECT" }), _jsx(EVMConnectModal, { title: "t:connect", icon: evmConnectIcon, callback: openConnectOverlay }), _jsx(TonConnectModal, { title: "TON Connect", icon: tonConnectIcon }), _jsx(WalletConnectModal, { title: "Wallet Connect (TEST)", icon: walletConnectIcon, accountCallback: () => { } })] })] }), showConnectOverlay && (_jsx(ConnectOverlay, { slideAnimation: slideAnimation, close: closeConnectOverlay, onConnect: handleConnect, account: account }))] })), view === View.CONNECTED && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "components-container mb-2", children: [_jsx(BackButton, { goBack: goBack }), _jsx(Avatar, { src: avatarTable }), _jsxs("div", { className: "flex flex-col bg-white pt-4 px-8 pb-2 min-h-fit gap-2 rounded-t-3xl rounded-b-xl shadow-custom-white", children: [_jsx("h2", { className: "headline", children: "HORRAY!" }), _jsx("div", { className: "text-xs break-all font-semibold text-center text-customGrayAddress", children: _jsx("p", { className: "my-0 mx-auto", children: account }) }), _jsx("div", { className: "flex justify-center items-center max-w-10 my-0 mx-auto", children: _jsx("img", { className: "h-auto max-w-full", src: etherIcon, alt: "" }) }), _jsxs("div", { className: "flex flex-col items-center", children: [_jsxs("div", { className: "flex justify-between items-center gap-4 text-lg font-semibold", children: [_jsx("p", { className: "m-0", children: "Total Balance" }), _jsx(Tooltip, { headline: "Balance", content: "The balance your wallet is currently holding." })] }), _jsx("div", { className: "text-2xl font-bold mb-4", children: balance || 0 })] })] })] }), _jsxs("div", { className: "flex flex-col gap-2 p-2 mb-4", children: [_jsx(PrimaryButton, { title: "Open my Wallet", callback: openWallet }), _jsx("div", { children: _jsx(PrimaryButton, { title: "Disconnect", className: "bg-red-200 border border-red-300 active:bg-red-300", textColor: "customBlackText", callback: handleDisconnect }) })] })] })), view === View.WALLET && (_jsx(_Fragment, { children: _jsxs("div", { className: "h-screen bg-customGrayWallet rounded-t-xl", children: [_jsx(BackButton, { goBack: goBack }), _jsxs("div", { className: "flex flex-col gap-4 p-4", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("p", { className: "m-0 text-xl font-semibold", children: "Total Balance" }), _jsxs("p", { className: "m-0 text-5xl font-extrabold", children: [_jsx("span", { className: "text-customGrayAddress", children: "ETH" }), balance || 0] })] }), _jsxs("div", { className: "flex justify-around gap-4 py-4 px-8", children: [_jsx(TransactionButton, { text: "Send", icon: sendIcon, callback: sendFunds }), _jsx(TransactionButton, { text: "Receive", icon: receiveIcon, callback: receiveFunds }), _jsx(TransactionButton, { text: "Sell", icon: sellIcon, callback: sell })] }), _jsxs("div", { className: "flex flex-col min-h-32 gap-2", children: [_jsx(TransactionHistoryItem, { currency: "Ether", symbol: "ETH", valueSpot: parseFloat(balance || '0.0') }), _jsx(TransactionHistoryItem, { currency: "Ether", symbol: "ETH", valueSpot: parseFloat(balance || '0.0') }), _jsx(TransactionHistoryItem, { currency: "Ether", symbol: "ETH", valueSpot: parseFloat(balance || '0.0') })] }), signedMessage && (_jsxs("div", { style: {
                                        color: 'black',
                                    }, children: [_jsx("p", { children: "Signed Message:" }), _jsx("p", { className: "my-0 mx-auto text-xs break-all text-center text-wrap", children: signedMessage })] })), _jsx("div", { className: "flex flex-col gap-2", children: _jsx(PrimaryButton, { title: "Sign Test Message in Wallet", callback: triggerTestMessageSign }) })] })] }) }))] }));
}
export default App;
