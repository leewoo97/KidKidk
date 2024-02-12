import { serverAxios } from '../util/commons';

const server = serverAxios();

const url = '/users/profile';

async function profileCreate(user, success, fail) {
    // console.log(user)
    await server.post(`${url}/create`, user).then(success).catch(fail);
}

async function profileLogin(success, fail) {
    await server.post(`${url}/login`).then(success).catch(fail);
}

async function profileSelectAll(userId, success, fail) {
    // console.log(user)
    await server.get(`${url}/selectAll/${userId}`).then(success).catch(fail);
}

//여기 고쳐야함
async function profileUpdate(updateUser, success, fail) {
    // console.log(updateUser)
    await server.put(`${url}/update`, updateUser).then(success).catch(fail);
}

async function profileDelete(profile, success, fail) {
    // console.log(profile)
    await server.delete(`${url}/delete/${profile.profileId}`).then(success).catch(fail);
}

async function transferToFundMoney(coinIn, success, fail) {
    await server.post(`${url}/transfer`, coinIn).then(success).catch(fail);
}

async function getChildList(userId, success, fail) {
    await server.get(`${url}/childlist/${userId}`).then(success).catch(fail);
}

export {
    profileCreate,
    profileLogin,
    profileSelectAll,
    profileUpdate,
    profileDelete,
    transferToFundMoney,
    getChildList,
};
