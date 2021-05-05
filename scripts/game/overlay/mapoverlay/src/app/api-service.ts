import { Injectable } from '@angular/core';
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


    constructor() {
        window.addEventListener('message', messageEvent => {
            if (messageEvent.data.type === 'passthroughresponse') {
                this.passThroughResponseMap[messageEvent.data.uuid](messageEvent.data.data);
                delete this.passThroughResponseMap[messageEvent.data.uuid];
            } else if (messageEvent.data.type === 'apicallresponse') {
                this.apiResponseMethod[messageEvent.data.uuid](messageEvent.data.data);
                delete this.apiResponseMethod[messageEvent.data.uuid];
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
