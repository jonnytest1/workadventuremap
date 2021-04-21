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
    WA.sendChatMessage('brauchst du hilfe ?', 'Minato');
    chatenabled = true;

});

WA.onChatMessage((message) => {
    if(chatenabled) {
        message = message.toLowerCase();
        if(message.endsWith('?') || message.includes('wie') || message.includes('wo') || message.includes('wer') || message.includes('wann') || message.includes('was')) {
            WA.sendChatMessage('ich hab doch auch keine ahnung 😭', 'Minato');
        }
    }
});
WA.onEnterZone('inbox', () => {
    WA.openTab('https://teams.microsoft.com/l/chat/0/0?users=jonathan.heindl@brandad-systems.de');
});
WA.onEnterZone('eventtest', () => {

    //debugger;
    /*currentPopup = WA.openPopup('eventref', 'PopupText', [
        {
            label: 'peaceful',
            className: 'popUpElement',
            callback: (popup => {
                //nothing to do
                debugger;
                popup.close();
            })
        }, {
            label: 'hard',
            className: 'popUpElement',
            callback: (popup => {
                window.addEventListener('message', (...args) => {
                    debugger;
                });
                popup.close();
            })
        }]);*/
});

window.addEventListener('message', (...args) => {
    console.log(...args);
});