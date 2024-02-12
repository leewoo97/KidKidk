import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './router/App.jsx';
import './index.css';
import { RecoilRoot, useRecoilTransactionObserver_UNSTABLE } from 'recoil';
import { RecoilPersist, updateState } from 'recoil-persist';
import RecoilizeDebugger from 'recoilize';

// const { persistAtom } = new RecoilPersist();

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
    <RecoilRoot>
        <RecoilizeDebugger />
        <App />
    </RecoilRoot>
);

// Recoil 상태 변화 감지 및 로컬 스토리지에 저장
// useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
//     updateState(snapshot);
// });
