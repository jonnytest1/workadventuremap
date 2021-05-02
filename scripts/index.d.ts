interface Popup {
    close()
}
type msgCpy = import("../../../workadventure-mapserver/resources/mapserver/message-communication/message-communication").messaging
interface PopupOptions {
    label: string,
    className?: "normal" | "primary" | "success" | "warning" | "error" | "disabled",
    callback?: (popup: Popup) => unknown
}
interface WorkAdventureApi {
    sendChatMessage(message: string, author: string): void;
    onChatMessage(callback: (message: string) => void): void;
    onEnterZone(name: string, callback: () => void): void;
    onLeaveZone(name: string, callback: () => void): void;
    openPopup(targetObject: string, message: string, buttons: any[]): Popup;
    openTab(url: string): void;
    goToPage(url: string): void;
    openCoWebSite(url: string): void;
    closeCoWebSite(): void;
    disablePlayerControl(): void;
    restorePlayerControl(): void;
    displayBubble(): void;
    removeBubble(): void;
    registerMenuCommand(commandDescriptor: string, callback: (commandDescriptor: string) => void): void

    getGameState(): Promise<{
        startLayerName: string
        roomId: string,
        uuid: string,
        nickName: string
        player: {
            [playerNickName: string]: {
                position: { x: number, y: number },
                pusherId: number
            }
        }
    }>
    exitSceneTo: (page: string) => void
}
/*declare global {


    const WA: WorkAdventureApi
}*/

declare var WA: WorkAdventureApi