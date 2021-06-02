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
            message: "test2.2",
            buttons: ["abc", "bef"]
        }, {
            message: "test2.5",
            buttons: [{
                buttonText: "b1",
                continuation: {
                    message: "b1message",
                    resumeMainIndex: true,
                    buttons: [{
                        buttonText: "b1response",
                        continuation: {
                            message: "b1respmess",
                            exhaustOptionsBeforeContinue: true,
                            resumeMainIndex: true,
                            buttons: ["exhaust1", "exhaust2"]
                        }
                    }, "b1responsee2"]
                }
            }, "b2a"]
        }, {
            message: "test3",
            buttons: "finish"
        }
        ]
    })
})();
