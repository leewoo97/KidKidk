import { serverAxios } from '@util/commons';
import axios from 'axios';

const server = serverAxios();

const url = '/job';

async function getRetrieve(childId, success, fail) {
    await server.get(`${url}/retrieve/${childId}`).then(success).catch(fail);
}

export { getRetrieve };
