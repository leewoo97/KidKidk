import { serverAxios } from '@util/commons';

const server = serverAxios();

const url = '/fund';

// 투자 항목 조회
async function getFund(childId, success, fail) {
    await server.get(`${url}/confirm/${childId}`).then(success).catch(fail);
}

// 투자 내역 조회
async function getFundHistory(childId, success, fail) {
    await server.get(`${url}/history/confirm/${childId}`).then(success).catch(fail);
}

// 투자 성공률 조회
async function getRoi(childId, success, fail) {
    await server.get(`${url}/roi/${childId}`).then(success).catch(fail);
}

// 투자 상태 조회
async function getStatus(childId, success, fail) {
    await server.get(`${url}/status/confirm/${childId}`).then(success).catch(fail);
}

export { getFund, getFundHistory, getRoi, getStatus };
