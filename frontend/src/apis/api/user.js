import { serverAxios } from '../util/commons';

const server = serverAxios();
const userUrl = '/auth';
function userInfo(success, fail) {
    server.get(`${userUrl}/userinfo`).then(success).catch(fail);
}

export { userInfo };
