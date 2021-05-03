///<reference path="index.d.ts" />

let hasSendMessage = false;
let chatbotenabled = false;
let hasReplied = false;
let hasSentNoReplyMessage = false;

(async () => {
    const { popupInZone } = await require('./zoned-popup');
    WA.onEnterZone('minato-event', () => {
        WA.displayBubble();
        if(!hasSendMessage) {
            WA.sendChatMessage('brauchst du hilfe ?', 'Minato');
            hasSendMessage = true;
        }
        /* WA.openPopup('minato-event', 'continue ?', [
             {
                 label: 'yes',
                 className: 'success',
                 callback: (popup) => {
                     popup.close();
                 }
             }
         ]);*/

        chatbotenabled = true;
    });
    WA.onLeaveZone('minato-event', () => {
        WA.removeBubble();
        if(!hasReplied && !hasSentNoReplyMessage) {
            WA.sendChatMessage('dann halt nicht 🤷‍♂️', 'Minato');
            hasSentNoReplyMessage = true;
        }
    });

    WA.onChatMessage(async (chatmessage) => {
        if(chatbotenabled) {
            chatmessage = chatmessage.toLowerCase();
            if(chatmessage.endsWith('?') || chatmessage.includes('wie') || chatmessage.includes('wo') || chatmessage.includes('wer') || chatmessage.includes('wann') || chatmessage.includes('was')) {
                WA.sendChatMessage('ich hab doch auch keine ahnung 😭', 'Minato');
            }

            hasReplied = true;
        }
    });

    popupInZone({
        zone: 'minato-event',
        popupText: 'https://www.google.de ist ein link',
        objectLayerName: 'minato-event',
        popupOptions: []
    });

})();
