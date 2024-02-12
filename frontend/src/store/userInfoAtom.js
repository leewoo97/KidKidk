import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';

const { persistAtom } = recoilPersist();

export const userInfoState = atom({
    key: 'userInfo',
    default: { userId: '', accessToken: '', email: '' },
    effects_UNSTABLE: [persistAtom],
});
