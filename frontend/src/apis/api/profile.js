import { serverAxios } from '../util/commons';

const server = serverAxios();

const url = '/users/profile';

async function profileCreate(user ,success, fail) {
    console.log(user)
    await server.post(`${url}/create`,user).then(success).catch(fail);
}

async function profileLogin(success, fail) {
    await server.post(`${url}/login`).then(success).catch(fail);
}

async function profileSelectAll(user, success, fail) {
    console.log(user)
    await server.get(`${url}/selectAll/${user.userId}`).then(success).catch(fail);
}

async function profileUpdate(success, fail) {
    await server.put(`${url}/update`).then(success).catch(fail);
}

async function profileDelete(profile, success, fail) {
    console.log(profile)
    await server.delete(`${url}/delete/${profile.profileId}`).then(success).catch(fail);
}


export { profileCreate, profileLogin, profileSelectAll, profileUpdate, profileDelete};