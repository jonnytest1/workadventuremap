const requirePromises = Promise.all([
    require('./backend-connection'),
    require('./zoned-popup'),
    require('./game/user-data'),
    require("./conversation"),
    require('./user-update'),
    require('./minato-event'),
    require('./game-mode'),
    require('./communication'),
]);
(async () => {

    const [{ message, ws }, { popupInZone }, { getUserData }, { multiStrandedPopupConversation }] = await requirePromises;

    console.log('script run');
    const data = await getUserData();
    if(!data.gameModeEnabled) {
        WA.registerMenuCommand('miro', () => {
            WA.openCoWebSite('https://jonnytest1.github.io/workadventuremap/scripts/pages/miro.html');
        });
        WA.registerMenuCommand('open chat', () => {
            WA.sendChatMessage('', '');
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
    /* popupInZone({
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
     });*/

    multiStrandedPopupConversation({
        zone: "convtest",
        onfinish: (opts) => {
            opts._conversationIndex = [0]
        },
        data: [{
            message: "this popup leads to the same message no matter where you press ",
            buttons: ["first option", "other option"]
        }, {
            message: "the first option o this popup opens up a new conversation line",
            buttons: [{
                buttonText: "b1",
                continuation: {
                    message: "if you leave and enter again you will be at the same position in the conversation",
                    buttons: [{
                        buttonText: "exhasut popup",
                        continuation: {
                            message: "this popup will resurface until all options have been clicked at least once",
                            exhaustOptionsBeforeContinue: true,
                            resumeMainIndex: true, //back to next item on the main index line
                            buttons: ["exhaust1", "exhaust2"]
                        }
                    }, "finish in the middle"]
                }
            }, "b2a"]
        }, {
            message: "this popup is the last one before reset",
            buttons: "finish"
        }
        ]
    })
})();
