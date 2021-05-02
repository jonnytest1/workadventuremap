/// <reference path="./index.d.ts" />

var zoneWelcomeToTCMName = 'popUpWelcomeToTCM';
var zoneMeetTheDevTeamName = 'popUpMeetTheDevTeam';
var zoneRespectPeopleName = 'popUpRespectPeople';
var zoneTCMAroundTheWorld = 'popUpTCMAroundTheWorld';
var urlWelcomeToTCM = 'https://www.thecodingmachine.com/en/welcome-to-the-coding-machine/';
var urlTCMAroundTheWorld = 'https://www.thecodingmachine.com/en/the-coding-machine-around-the-world/';
var currentPopup;
var isCoWebSiteOpened = false;

console.log('script run');
let popupCounter = 123;

let chatenabled = false;
let hasSendMessage = false;
let hasReplied = false;
let hasSentNoReplyMessage = false;

/**
 * @template {keyof msgCpy} T
 * @param {{
 *      type:T,
 *      data?:msgCpy[T]["param"]
 * }} data
 * @returns {Promise<msgCpy[T]["response"]>}
 */
async function message(data) {
    /**
     * @type {Promise<msgCpy[T]["response"]>}
     */
    const pr = new Promise((resolv, thrower) => {
        const img = document.createElement('iframe');
        window.onmessage = (messageEvent) => {
            /**
             * @type {{type:"iframeresponse",data:msgCpy[T]["response"]}}
             */
            let eventData = messageEvent.data;
            if(eventData.type === 'iframeresponse') {
                resolv(eventData.data);
                img.remove();
            }
        };
        img.src = `https://pi4.e6azumuvyiabvs9s.myfritz.net/mapserver/rest/message/${btoa(JSON.stringify(data))}/message.png`;
        document.body.appendChild(img);
    });
    return pr;
}

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

    chatenabled = true;
});

WA.onLeaveZone('minato-event', () => {
    WA.removeBubble();
    if(!hasReplied && !hasSentNoReplyMessage) {
        WA.sendChatMessage('dann halt nicht 🤷‍♂️', 'Minato');
        hasSentNoReplyMessage = true;
    }

});
WA.registerMenuCommand('miro', () => {
    WA.openCoWebSite('http://localhost/workadventuremap/scripts/miro.html');
});

WA.onChatMessage(async (chatmessage) => {
    if(chatenabled) {
        chatmessage = chatmessage.toLowerCase();
        if(chatmessage.endsWith('?') || chatmessage.includes('wie') || chatmessage.includes('wo') || chatmessage.includes('wer') || chatmessage.includes('wann') || chatmessage.includes('was')) {
            WA.sendChatMessage('ich hab doch auch keine ahnung 😭', 'Minato');
        }
        if(chatmessage === '!friends') {
            const gamestate = await WA.getGameState();
            WA.sendChatMessage('your friends are well', 'Minato');
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

/**
 * @param {{
 *    zone:string
 *    objectLayerName?:string,
 *    popupText:string,
 *    delay?:number
 *    popupOptions:Array<PopupOptions>
 * }} options
 */
function popupInZone(options) {
    if(!options.objectLayerName) {
        options.objectLayerName = options.zone;
    }
    let lastOpened = 0;
    /**
     * @type {Popup}
     */
    let popup;
    WA.onEnterZone(options.zone, () => {
        if(options.delay) {
            if(lastOpened + options.delay > Date.now()) {
                return;
            }
        }
        lastOpened = Date.now();
        popup = WA.openPopup(options.objectLayerName, options.popupText, options.popupOptions.map(option => {
            const callback = option.callback;
            const popupOptions = {
                ...option,
                className: option.className || 'normal',
                callback: () => {
                    if(callback) {
                        callback(popup);
                    }
                    popup.close();
                    popup = undefined;
                }
            };

            return popupOptions;
        }));
    });
    WA.onLeaveZone(options.zone, () => {
        if(popup) {
            popup.close();
            popup = undefined;
        }
    });
}

popupInZone({
    zone: 'inbox',
    objectLayerName: 'eventref',
    popupText: 'Teams Chat mit jonathan.heindl\n@brandad-systems.de öffnen ?',
    popupOptions: [
        {
            label: 'Ja', callback: () => {
                WA.openTab('https://teams.microsoft.com/l/chat/0/0?users=jonathan.heindl@brandad-systems.de');
            }
        },
        {
            label: 'Nein',
        }
    ]
});
popupInZone({
    zone: 'eventtest',
    objectLayerName: 'sig',
    popupText: 'PopupText',
    popupOptions: [
        {
            label: 'hard',
            callback: () => {
                //enable health ui ?
                //enable npc engine
            }
        },
        {
            label: 'peaceful',
        }
    ]
});

setTimeout(() => {
    WA.getGameState()
        .then(async state => {
            await message({
                type: 'userUpdate',
                data: {
                    uuid: state.uuid,
                    nickName: state.nickName
                }
            });

        });
}, 2000);

window.addEventListener('message', (...args) => {
    console.log(...args);
});
