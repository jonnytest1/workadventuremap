
(async () => {
    const [{ message, ws }, { popupInZone }] = await Promise.all([
        require('./backend-connection'),
        require('./zoned-popup'),
        require('./user-update'),
        require('./minato-event')
    ]);

    console.log('script run');

    WA.registerMenuCommand('miro', () => {
        WA.openCoWebSite('https://jonnytest1.github.io/workadventuremap/scripts/pages/miro.html');
    });
    WA.registerMenuCommand('open chat', () => {
        WA.sendChatMessage('', '');
    });

    WA.onChatMessage(async (chatmessage) => {
        if(chatmessage === '!friends') {
            const friendInfo = await message({
                type: 'friendstatus'
            });
            for(let friend in friendInfo) {
                const friendStatus = friendInfo[friend];
                if(friendStatus.status === 'offline') {
                    WA.sendChatMessage(`${friend}(${friendStatus.index}) is offline`, '');
                } else {
                    const roomParts = friendStatus.room.split('/');
                    const currentMap = roomParts.pop();
                    const domain = roomParts[2];
                    let statusMessage = `${friend}(${friendStatus.index}) is currently in ${domain}-${currentMap} `;
                    if(friendStatus.jitsiRoom !== 'invalidmapref') {
                        statusMessage += ` in ${friendStatus.jitsiRoom}`;
                    }
                    WA.sendChatMessage(statusMessage, '');
                }
            }
        } else if(chatmessage.startsWith('!message')) {
            ws.ws.send(JSON.stringify({
                type: 'chatmessage',
                data: { message: chatmessage.split('!message')[1] }
            }));
        } else if(chatmessage.startsWith('!visit')) {
            const friendInfo = await message({
                type: 'friendstatus'
            });
            for(let friend in friendInfo) {
                if(friendInfo[friend].index === +chatmessage.replace('!visit', '')
                    .trim()) {
                    WA.exitSceneTo(`/${friendInfo[friend].room}`);
                    return;
                }
            }

        }
    });

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
})();