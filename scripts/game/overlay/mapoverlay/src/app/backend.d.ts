
import type { messaging } from '../../../../../../../workadventure-mapserver/resources/mapserver/message-communication/message-communication';
import { WAMAp } from './waapi';

export type { RoomMap } from '../../../../../../../workadventure-mapserver/public/users';



export type FeMessage = messaging;

export type UnPromise<P> = P extends Promise<infer T> ? UnPromise<T> : P


export type GameState = UnPromise<ReturnType<WAMAp["getGameState"]>>

export type UserData = UnPromise<FeMessage['getUserData']['response']>


export type FeInventoryItem = UserData["inventory"][number] & {
    src?: string
}