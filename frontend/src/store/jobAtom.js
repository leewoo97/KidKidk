import { atom } from 'recoil';

export const getJobData = atom({
    key: 'job',
    default: [],
});

export const data2State = atom({
    key: 'data2State',
    default: 'Data 2 Initial Value',
});
