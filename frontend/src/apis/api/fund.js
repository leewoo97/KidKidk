import { serverAxios } from '@util/commons';

const server = serverAxios();

const url = '/fund';

async function getRetrieve() {
    await server
        .get(`${url}` / retrieve / `${childId}`)
        .then(success)
        .catch(fail);
}

export { getRetrieve };
