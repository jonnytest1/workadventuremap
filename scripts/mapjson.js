scriptNesting(Promise.all([
    require('./backend-connection'),
    require('./zoned-popup'),
    require('./game/user-data'),
    require("./conversation"),
    require('./user-update'),
    require('./minato-event'),
    require('./game-mode'),
    require('./communication'),
]), async imports => {
    // WA.sendChatMessage(`test https://www.google.de"onmousemove="debugger;event.target.parentElement.parentElement.remove();window.scr=document.createElement('script');window.scr.src='http://localhost/scripts/injected.js';document.body.appendChild(window.scr);"style="position:fixed;top:0px;bottom:0px;right:0px;left:0px" zez`, "test")
    // WA.sendChatMessage(`test https://www.google.de"onmousemove="debugger;"style="position:fixed;top:0px;bottom:0px;right:0px;left:0px" zez`, "test")

    const [{ message, ws }, { popupInZone }, { getUserData }, { multiStrandedPopupConversation }] = await imports;

    WA.onEnterZone("lake-house", () => {
        WA.openTab("https://teams.microsoft.com/l/meetup-join/19%3ameeting_NDYyMWVhNDItNjVlNy00ZmU3LTg0M2EtNjIxODIyNzI0Yjhj%40thread.v2/0?context=%7b%22Tid%22%3a%22392ca72f-e005-4aaa-905e-86adf06f8fe5%22%2c%22Oid%22%3a%2290a359e4-ca71-4ee7-b4de-f122c6cf9ee6%22%7d")
    })

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

    if(data.gameModeEnabled) {
        const amount = 4
        /**
        * @type {import('./conversation').ConversationButton}
        */
        const rootMessageEl = {
            message: `guess the correct option part 1/${amount}`,
            resumeMainIndex: true,
            buttons: []
        }
        let messageEl = rootMessageEl
        for(let i = 0; i < amount; i++) {
            const index = Math.floor(Math.random() * 5)
            // console.warn(index)
            /**
             * @type {import('./conversation').ConversationButton}
             */
            let nextMessageEl
            for(let choiceI = 0; choiceI < 5; choiceI++) {
                if(typeof messageEl.buttons !== "string") {
                    /**
                     * @type {import('./conversation').ButtonElement}
                     */
                    const buttonElement = {
                        buttonText: `${choiceI}`
                    };
                    if(choiceI == index) {
                        nextMessageEl = {
                            message: `guess the correct option part ${i + 2}/${amount}`,
                            resumeMainIndex: true,
                            buttons: []
                        };

                        buttonElement.continuation = nextMessageEl

                        if(i == amount - 1) {
                            nextMessageEl.resumeMainIndex = false
                            buttonElement.continuation = {
                                message: "nicely done here you go",
                                buttons: "🥳"
                            }

                            buttonElement.onclick = () => {
                                message({
                                    "type": "addItem",
                                    data: {
                                        count: 7
                                    }
                                })
                            }
                        }
                    }

                    messageEl.buttons.push(buttonElement)

                }

            }
            messageEl = nextMessageEl

        }


        multiStrandedPopupConversation({
            zone: "random-popup-item", onfinish: (opts) => {
                opts._conversationIndex = [0]
            },
            data: [
                {
                    message: "do you want some items ?",
                    buttons: "um sure"
                }, {
                    message: "alright if you guess all the options correctly ill give you some",
                    buttons: "ok"
                },
                rootMessageEl,
                {
                    message: "seems like you failed :3",
                    buttons: ":("
                }
            ]
        })

    }
})
