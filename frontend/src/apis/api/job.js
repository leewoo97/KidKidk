import { serverAxios } from '@util/commons';

const server = serverAxios();

const url = '/job';

async function getJob(childId, success, fail) {
    await server.get(`${url}/retrieve/${childId}`).then(success).catch(fail);
}

async function getJobReservation(childId, success, fail) {
    await server.get(`${url}/retrieve/reservation/${childId}`).then(success).catch(fail);
}

async function deleteJob(childId, success, fail) {
    await server.delete(`${url}/delete/${childId}`).then(success).catch(fail);
}

async function deleteJobReservation(childId, success, fail) {
    await server.delete(`${url}/reservation/delete/${childId}`).then(success).catch(fail);
}

async function createJob(success, fail) {
    await server.post(`${url}/create`).then(success).catch(fail);
}

async function createJobReservation(success, fail) {
    await server.post(`${url}/reservation/create`).then(success).catch(fail);
}

export { getJob, getJobReservation, deleteJob, deleteJobReservation, createJob, createJobReservation };
