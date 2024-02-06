import { serverAxios } from '@util/commons';

const server = serverAxios();

const url = '/job';

async function getJob(childId, success, fail) {
    await server.get(`${url}/retrieve/${childId}`).then(success).catch(fail);
}

export { getJob };
