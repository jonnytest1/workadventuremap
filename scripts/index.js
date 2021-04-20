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
    if(chatenabled && message.endsWith('?')) {
        WA.sendChatMessage('ich hab doch auch keine ahnung 😭', 'Minato');
    }
});

WA.onEnterZone('eventtest', () => {

    const scriptToInject = `
    <script>
        console.log(this);
        debugger;
    </script>
    `;

    /* window.parent.postMessage({
         type: 'openPopup',
         data: {
             popupId: `${popupCounter++}-0">${scriptToInject}`,
             targetObject: 'eventref',
             message: 'PopupText',
             buttons: [
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

                         popup.close();
                     })
                 }].map(t => ({
                     label: t.label,
                     className: t.className
                 }))
         }
     }, '*');*/

    WA.sendChatMessage('%3Cimportant message>', 'engine script');

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

window.top.addEventListener('message', (...args) => {
    console.log(...args);
});