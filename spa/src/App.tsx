import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import GlobalStyle from './styles/Global';
import { CookiesProvider } from 'react-cookie';

const App: React.FC = () => (
    <>
        <CookiesProvider>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
            <GlobalStyle />
        </CookiesProvider>
  </>
);

export default App;