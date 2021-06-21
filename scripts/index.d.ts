import type { messaging } from "../../workadventure-mapserver/resources/mapserver/message-communication/message-communication";
import "../../workadventure/front/src/iframe_api";


type baseWorkadventureApi = typeof WA


type PathImpl<T, Key extends keyof T> =
    Key extends string
    ? (
        T[Key] extends Record<string, any>
        ?
        (
            | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}`
            | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
        )
        : never
    ) : never;

type PathImpl2<T> = PathImpl<T, keyof T> | keyof T;

type Path<T> = PathImpl2<T> extends string | keyof T ? PathImpl2<T> : keyof T;

type PathValue<T, P extends Path<T>> =
    P extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
    ? Rest extends Path<T[Key]>
    ? PathValue<T[Key], Rest>
    : never
    : never
    : P extends keyof T
    ? T[P]
    : never;

//declare function get<T, P extends Path<T>>(obj: T, path: P): PathValue<T, P>;



type WACompleteMap = {
    [K in Path<baseWorkadventureApi>]: PathValue<baseWorkadventureApi, K>
}

type FilteredKeys<T> = { [P in keyof T]: T[P] extends Function ? P : never }[keyof T];


type FilteredFunction = FilteredKeys<WACompleteMap>
export type WAMAp = {
    [K in FilteredFunction]: PathValue<baseWorkadventureApi, K>
}


declare let t: WAMAp;
type test = WAMAp["sendChatMessage"]

export type WorkAdventureApi = baseWorkadventureApi
/*
interface WorkAdventureApi {
    sendChatMessage(message: string, author: string): void;
    onChatMessage(callback: (message: string) => void): void;
    onEnterZone(name: string, callback: () => void): void;
    onLeaveZone(name: string, callback: () => void): void;
    openPopup(targetObject: string, message: string, buttons: any[]): Popup;
    openTab(url: string): void;
    goToPage(url: string): void;
 
    /**
     * 
     * relative to initally loaded sript
     * @param opts 
     *
openCoWebSite(url: string, opts ?): void;
closeCoWebSite(): void;
disablePlayerControl(): void;
restorePlayerControl(): void;
displayBubble(): void;
removeBubble(): void;
registerMenuCommand(commandDescriptor: string, callback: (commandDescriptor: string) => void): void
 
    
    exitSceneTo: (page: string) => void
}*/
/*
declare global {


    const WA: baseWorkadventureApi
}*/



declare global {
    type msgCpy = messaging
    interface Popup {
        close()
    }
    /* interface PopupOptions {
         label: string,
         className?: "normal" | "primary" | "success" | "warning" | "error" | "disabled",
         callback?: (popup: Popup) => unknown
     }*/
    interface Window {
        importScript: () => any

        blockAutoOpenOverlay?: boolean
    }

    //var WA: WorkAdventureApi
    var importScript: (url: string) => any
}