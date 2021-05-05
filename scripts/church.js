/// <reference path="index.d.ts" />

(async () => {
    const [{ message, ws }, { popupInZone }] = await Promise.all([
        require('./backend-connection'),
        require('./zoned-popup'),
        require('./user-update')
    ]);
    popupInZone({
        zone: 'friendship-explanation-zone',
        popupText: 'stand in there together to become friends 😊',
        objectLayerName: 'freindship popup',
        popupOptions: [{
            label: 'ok',
            callback: popup => popup.close()
        }]
    });

    /**
     * @type {NodeJS.Timeout}
     */
    let friendshipInterval;
    /**
     * @type {Array<string>}
     */
    let friends = null;

    WA.onEnterZone('friendship', async () => {
        let readyFriends = await message({
            type: 'readyfriendship'
        });
        readyFriends.new.forEach(id => {
            WA.sendChatMessage(`you have become friends with ${id}`, 'amor');

        });
        if(readyFriends.new.length == readyFriends.friends.length && readyFriends.friends.length > 0) {
            WA.sendChatMessage(`you can list your friends with !friends in chat`, 'amor');
            WA.sendChatMessage(`you can direct message a friend with !message (index) message`, 'amor');
            WA.sendChatMessage(`you can tp to a friend with !visit (index)`, 'amor');
        }
        friends = readyFriends.friends;

        friendshipInterval = setInterval(async () => {
            /**
             * @type {Array<string>}
             */
            const newFriends = await message({
                type: 'friendscheck'
            });
            newFriends.filter(newFriend => !friends.includes(newFriend))
                .forEach(friend => {
                    WA.sendChatMessage(`you have become friends with ${friend}`, 'amor');
                });
            if(friends.length == 0 && newFriends.length) {
                WA.sendChatMessage(`you can list your friends with !friends in chat`, 'amor');
                WA.sendChatMessage(`you can direct message a friend with !message (index) message`, 'amor');
                WA.sendChatMessage(`you can tp to a friend with !visit (index)`, 'amor');
            }
            friends = newFriends;
        }, 1000);
    });

    WA.onLeaveZone('friendship', () => {
        message({
            type: 'unreadyfriendship'
        });
        clearInterval(friendshipInterval);
    });

    WA.onChatMessage(msg => {
        if(msg === '!friends') {
            message({ type: 'friendstatus' });
        }
    });
})();