import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RoomMap } from '../../../../../../../workadventure-mapserver/public/users';
import { FeMessage, UnPromise, WorkAdventureApi } from './backend';


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
    private messageMap: { [uuid: string]: (arg: any) => void } = {};

    private _userPositions = new Subject<RoomMap[string]["users"]>()

    public userPositions = this._userPositions.asObservable()

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


    /* async screenSize(): Promise<Vector> {
         return new Promise<Vector>((res, thr) => {
             const uuid = uuidv4();
             this.passThroughResponseMap[uuid] = this.messageMap[uuid] = (arg) => {
                 res(new Vector(arg.x, arg.y))
             };;
 
             window.parent.postMessage({
                 type: 'windowOffset',
                 uuid,
                 data: event
             }, '*');
         });
     }*/


    async WAApi<T extends keyof WorkAdventureApi>(
        eventMethod: T, ...args: Parameters<WorkAdventureApi[T]>): Promise<UnPromise<ReturnType<WorkAdventureApi[T]>>> {
        return new Promise<UnPromise<ReturnType<WorkAdventureApi[T]>>>((res, thr) => {
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
