import { atom } from 'recoil';

export const getJobData = atom({
    key: 'job',
    default: [],
});

export const getJobReservationData = atom({
    key: 'reservationJob',
    default: [],
});
