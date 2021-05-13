import type { messaging } from "../../workadventure-mapserver/resources/mapserver/message-communication/message-communication";
import "../../workadventure/front/src/iframe_api";


type baseWorkadventureApi = typeof WA
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
    interface PopupOptions {
        label: string,
        className?: "normal" | "primary" | "success" | "warning" | "error" | "disabled",
        callback?: (popup: Popup) => unknown
    }
    interface Window {
        importScript: () => any
    }

    //var WA: WorkAdventureApi
    var importScript: (url: string) => any
}