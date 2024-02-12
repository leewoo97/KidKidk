import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userInfoState = atom({
    key: 'userInfo',
    default: { userId: '', accessToken: '', email: '' },
    effects_UNSTABLE: [persistAtom],
});
