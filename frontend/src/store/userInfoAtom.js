import { atom, RecoilRoot, useRecoilTransactionObserver_UNSTABLE } from 'recoil';
import { RecoilPersist, updateState } from 'recoil-persist';

export const userInfoState = atom({
    key: 'userInfo',
    default: null,
});

// recoil-persist를 사용해 상태를 로컬 스토리지에 저장
export const childState = atom({
    key: 'childState', // 상태를 식별할 때 사용할 고유키
    default: {}, // 디폴트 값 설정
});
