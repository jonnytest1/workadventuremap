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
WA.onEnterZone('minato-event', () => {
    WA.displayBubble();
    WA.disablePlayerControl();
    WA.sendChatMessage('brauchst du hilfe ? (continue by writing exit in c)', 'Minato');
    WA.openPopup('minato-event', 'continue ?', [
        {
            label: 'yes',
            className: 'success',
            callback: (popup) => {
                popup.close();
                WA.restorePlayerControl();
            }
        }
    ]);

    chatenabled = true;
});

WA.registerMenuCommand('miro', () => {
    WA.openCoWebSite('http://localhost/workadventuremap/scripts/miro.html');
});

WA.onLeaveZone('minato-event', () => {
    WA.removeBubble();
});

WA.onChatMessage((message) => {
    if(chatenabled) {
        message = message.toLowerCase();
        if(message.endsWith('?') || message.includes('wie') || message.includes('wo') || message.includes('wer') || message.includes('wann') || message.includes('was')) {
            WA.sendChatMessage('ich hab doch auch keine ahnung 😭', 'Minato');
        } else if(message === 'miro') {
            WA.openCoWebSite('http://localhost/workadventuremap/scripts/miro.html');
        }

    }
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

window.addEventListener('message', (...args) => {
    console.log(...args);
});
