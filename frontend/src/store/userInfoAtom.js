import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';

const { persistAtom } = recoilPersist();

export const userInfoState = atom({
    key: 'userInfo',
    default: null,
    effects_UNSTABLE: [persistAtom],
});
