import { serverAxios } from '@util/commons';

const server = serverAxios();

const url = '/users';

async function getChild(childId, success, fail) {
    await server.get(`${url}/profile/getchild/${childId}`).then(success).catch(fail);
}

export { getChild };
