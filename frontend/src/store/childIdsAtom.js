import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';

const { persistAtom } = recoilPersist();

export const getJobData = atom({
    key: 'childIds',
    default: [], // 객체 배열 { childId: '', nickName: '' },{ childId: '', nickName: '' }...
    effects_UNSTABLE: [persistAtom],
});
