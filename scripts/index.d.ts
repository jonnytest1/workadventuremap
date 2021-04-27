/// <reference path="../../../workadventure/front/src/iframe_api.ts" />

interface Popup {
    close()
}


interface PopupOptions {
    label: string,
    className?: "normal" | "primary" | "success" | "warning" | "error" | "disabled",
    callback?: (popup: Popup) => unknown
}
declare interface WorkAdventureApi {
    getGameState
    loadPage
}