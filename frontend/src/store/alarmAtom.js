import { atom } from "recoil";

export const sseState = atom({
    key : "sse",
    default: null
})

export const lastEventIdState = atom({
    key : "lastEventId",
    default : null
})

export const notificationsState = atom({
    key : "notifications",
    default : []
})