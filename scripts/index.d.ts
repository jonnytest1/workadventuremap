


interface Popup{
    close()
}


interface PopupOptions{
    label:string,
    className?:"normal"|"primary"|"success"|"warning"|"error"|"disabled"|string,
    callback?:(popup:Popup)=>unknown
}

declare const WA: {
    onEnterZone(zone:string,callback:(args:unknown)=>void):void

    onLeaveZone(zone:string,callback:(args:unknown)=>void):void

    openPopup(tag:string,popouptext:string,clickOptions:Array<PopupOptions>):Popup
    displayBubble()
    removeBubble()
    openCoWebSite(url:string)
    closeCoWebSite():void

    onChatMessage(callback:(message:string)=>void)
    sendChatMessage(message:string,username:string)
    
    disablePlayerControl()
    restorePlayerControl()
    goToPage(page:string)
    openTab(url:string)
    getGameState():Promise<any>

}