import { serverAxios } from '@util/commons';

const server = serverAxios();

const url = '/fund';

async function getFund(childId, success, fail) {
    await server.get(`${url}/confirm/${childId}`).then(success).catch(fail);
}

export { getFund };