import { serverAxios } from '@util/commons';

const server = serverAxios();

const url = '/child';

async function getChild(childId, success, fail) {
    await server.get(`${url}/info/${childId}`).then(success).catch(fail);
}

export { getChild };