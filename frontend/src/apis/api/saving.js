import { serverAxios } from '@util/commons';

const server = serverAxios();

const url = '/saving';

async function getSavingHistory(childId, success, fail) {
    await server.get(`${url}/info/${childId}`).then(success).catch(fail);
}

export { getSavingHistory };