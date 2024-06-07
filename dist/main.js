import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
// Redux
import { Provider } from 'react-redux';
import { store } from './redux/store';
// TonConnect UI
import { TonConnectUIProvider } from '@tonconnect/ui-react';
// Rainbow Kit
import './polyfills';
import { createWalletConnectModal } from './configs/walletConnect';
// Telegram Mini App SDK
import WebApp from '@twa-dev/sdk';
// App + Styles
import App from './App';
import './index.css';
// Hide the main button
WebApp.MainButton.hide();
// Expand the Telegram Mini App to full screen
WebApp.expand();
// Initialize the Telegram Mini App SDK
WebApp.ready();
// Enable the closing confirmation
WebApp.enableClosingConfirmation();
// Create the WalletConnect modal
createWalletConnectModal();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(_jsx(React.StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(TonConnectUIProvider, { manifestUrl: "https://sithumgmg111.github.io/telegram-mini-app/tonconnect-manifest.json", children: _jsx(App, {}) }) }) }));
