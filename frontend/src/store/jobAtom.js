import { atom } from 'recoil';

export const getJobData = atom({
    key: 'job',
    default: { name: '', task: '', taskAmount: '', wage: '', doneCount: '', childId: '' },
});

export const getJobReservationData = atom({
    key: 'reservationJob',
    default: { state: '', name: '', task: '', taskAmount: '', wage: '', childId: '' },
});
