import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './router/App.jsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        logo: {
            100: '#FFB700',
        },
        navBackground: {
            100: '#4D4637',
        },
        navText: {
            100: '#A16951',
        },
        sectionBackground: {
            100: '#F8F3E7',
        },
        tabHover: {
            100: '#35B356',
        },
        tabDefault: {
            100: '#90C354',
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>
);
