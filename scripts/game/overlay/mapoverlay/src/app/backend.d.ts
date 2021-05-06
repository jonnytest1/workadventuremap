import type { messaging } from '../../../../../../../workadventure-mapserver/resources/mapserver/message-communication/message-communication';
import { WorkAdventureApi } from '../../../../../index';

export type { WorkAdventureApi } from "../../../../../index";

export type FeMessage = messaging;

export type UnPromise<P> = P extends Promise<infer T> ? UnPromise<T> : P


export type GameState = UnPromise<ReturnType<WorkAdventureApi["getGameState"]>>

export type UserData = UnPromise<FeMessage['getUserData']['response']>