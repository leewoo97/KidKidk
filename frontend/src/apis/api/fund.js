import { serverAxios } from '@util/commons';

const server = serverAxios();

const url = '/fund';

async function createFund(fundResrvation, success, fail) {
    await server.post(`${url}/create`, fundResrvation).then(success).catch(fail);
}

async function createFundReservation(fundResrvation, success, fail) {
    await server.post(`${url}/reservation/create`, fundResrvation).then(success).catch(fail);
}

async function getFund(childId, success, fail) {
    await server.get(`${url}/confirm/${childId}`).then(success).catch(fail);
}

async function getFundHistory(childId, success, fail) {
    await server.get(`${url}/history/confirm/${childId}`).then(success).catch(fail);
}

async function getFundReservation(childId, success, fail) {
    await server.get(`${url}/reservation/confirm/${childId}`).then(success).catch(fail);
}

async function getRoi(childId, success, fail) {
    await server.get(`${url}/roi/${childId}`).then(success).catch(fail);
}

async function getStatus(childId, success, fail) {
    await server.get(`${url}/status/confirm/${childId}`).then(success).catch(fail);
}

async function updateFundReservation(fundResrvation, success, fail) {
    await server.put(`${url}/reservation/modify`, fundResrvation).then(success).catch(fail);
}

async function deleteFundReservation(childId, success, fail) {
    await server.delete(`${url}/reservation/delete/${childId}`).then(success).catch(fail);
}

export { createFund, createFundReservation, updateFundReservation, deleteFundReservation, getFund, getFundHistory, getFundReservation, getRoi, getStatus };