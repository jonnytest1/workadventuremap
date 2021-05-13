import type { messaging } from '../../../../../../../workadventure-mapserver/resources/mapserver/message-communication/message-communication';
import type { WorkAdventureApi } from '../../../../../index';


export type { WorkAdventureApi } from "../../../../../index";

export type FeMessage = messaging;

export type UnPromise<P> = P extends Promise<infer T> ? UnPromise<T> : P


export type GameState = UnPromise<ReturnType<WorkAdventureApi["getGameState"]>>

export type UserData = UnPromise<FeMessage['getUserData']['response']>


export type FeInventoryItem = UserData["inventory"][number] & {
    src?: string
}


declare let t: {
    e: {
        a: 123,
        d: 23
    },
    b: 234
}

type JoinedWith<Key extends keyof T, T extends {
    [K: string]: any;
    // @ts-ignore
}> = `${Key}.${JoinByDots<T[Key]>}`;

type JoinByDots<T extends { [K: string]: any }> = {
    [Key in keyof T]: (T[Key] extends number | string ? [Key] : [JoinedWith<Key, T>])
}[keyof T][number]

type tmsg = JoinByDots<typeof t["e"]>
type msg = JoinByDots<typeof t>