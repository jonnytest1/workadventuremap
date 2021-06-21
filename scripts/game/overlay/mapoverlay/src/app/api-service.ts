import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import type { FeMessage, RoomMap, UnPromise } from './backend';
import type { HasMovedEvent, WAMAp } from './waapi';



function uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    private passThroughResponseMap: { [uuid: string]: (arg: any) => void } = {};
    private apiResponseMethod: { [uuid: string]: (arg: any) => void } = {};
    // private messageMap: { [uuid: string]: (arg: any) => void } = {};

    private _userPositions = new Subject<RoomMap[string]["users"]>()

    public userPositions = this._userPositions.asObservable()

    private _passedEvents = new Subject<KeyboardEvent>()

    public passedEvents = this._passedEvents.asObservable()

    private _playerPosition = new BehaviorSubject<HasMovedEvent>(undefined);

    public playerPostion = this._playerPosition.asObservable()

    constructor() {
        window.addEventListener('message', messageEvent => {
            if (messageEvent.data.type === 'passthroughresponse') {
                this.passThroughResponseMap[messageEvent.data.uuid](messageEvent.data.data);
                delete this.passThroughResponseMap[messageEvent.data.uuid];
            } else if (messageEvent.data.type === 'apicallresponse') {
                this.apiResponseMethod[messageEvent.data.uuid](messageEvent.data.data);
                delete this.apiResponseMethod[messageEvent.data.uuid];
            } else if (messageEvent.data.type == "positionUpdate") {
                this._userPositions.next(messageEvent.data.data)
            } else if (messageEvent.data.type == "event-pass") {
                this._passedEvents.next(messageEvent.data.data)
            } else if (messageEvent.data.type == "movementpassthrough") {
                this._playerPosition.next(messageEvent.data.data)
            }
        });
    }

    async passThrough<T extends keyof FeMessage>(event: { type: T, data?: FeMessage[T]['param'] }): Promise<UnPromise<FeMessage[T]['response']>> {
        return new Promise<UnPromise<FeMessage[T]['response']>>((res, thr) => {
            const uuid = uuidv4();
            this.passThroughResponseMap[uuid] = res;
            window.parent.postMessage({
                type: 'passthrough',
                uuid,
                data: event
            }, '*');
        });
    }
    async WAApi<T extends keyof WAMAp>(
        eventMethod: T, ...args: Parameters<WAMAp[T]>): Promise<UnPromise<ReturnType<WAMAp[T]>>> {
        return new Promise<UnPromise<ReturnType<WAMAp[T]>>>((res, thr) => {
            const uuid = uuidv4();
            this.apiResponseMethod[uuid] = res;

            window.parent.postMessage({
                type: 'apicall',
                method: eventMethod,
                uuid,
                arguments: args
            }, '*');
        });
    }

}
