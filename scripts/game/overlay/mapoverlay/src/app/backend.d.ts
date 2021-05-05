export type { messaging as FeMessage } from '../../../../../../../workadventure-mapserver/resources/mapserver/message-communication/message-communication';
export type { WorkAdventureApi } from "../../../../../index";



export type UnPromise<P> = P extends Promise<infer T> ? UnPromise<T> : P