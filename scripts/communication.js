const requirePromises = Promise.all([
    require('./backend-connection'),
    require('./zoned-popup'),
    require('./game/user-data'),
]);

(async () => {
    const [{ message, ws }, { popupInZone }, { getUserData }] = await requirePromises;

    ws.addEventListener((event) => {
        if(event.type === 'receivemessage') {
            WA.sendChatMessage(event.message, event.author);
        }
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
            ws.send({
                type: 'chatmessage',
                data: { message: chatmessage.split('!message')[1] }
            });
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
})();