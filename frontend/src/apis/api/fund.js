import { serverAxios } from '@util/commons';

const server = serverAxios();

const url = '/fund';

async function getFund(childId, success, fail) {
    await server.get(`${url}/confirm/${childId}`).then(success).catch(fail);
}

async function getFundHistory(childId, success, fail) {
    await server.get(`${url}/history/confirm/${childId}`).then(success).catch(fail);
}

async function getRoi(childId, success, fail) {
    await server.get(`${url}/roi/${childId}`).then(success).catch(fail);
}

async function getStatus(childId, success, fail) {
    await server.get(`${url}/status/confirm/${childId}`).then(success).catch(fail);
}

async function deleteFund(childId, success, fail) {
    await server.delete(`${url}/delete/${childId}`).then(success).catch(fail);
}

export { getFund, getFundHistory, getRoi, getStatus, deleteFund };