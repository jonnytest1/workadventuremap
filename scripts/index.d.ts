


interface Popup{
    close()
}

declare const WA: {
    onEnterZone(zone:string,callback:(args:unknown)=>void):void

    onLeaveZone(zone:string,callback:(args:unknown)=>void):void

    openPopup(tag:string,popouptext:string,clickOptions:Array<{
        label:string,
        className:"normal"|"primary"|"success"|"warning"|"error"|"disabled"|string,
        callback:(popup:Popup)=>unknown
    }>):Popup
    displayBubble()
    removeBubble
    openCoWebSite(url:string)
    closeCoWebSite():void

    onChatMessage
    sendChatMessage
    
    disablePlayerControl
    restorePlayerControl
    goToPage
    openTab
}