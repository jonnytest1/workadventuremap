/// <reference path="index.d.ts" />

const ws = require('./backend-connection');
const zonedpp = require('./zoned-popup');
const statePr = WA.getGameState();
WA.onEnterZone('death', async () => {
    try {
        const { message } = await ws;
        const [state] = await Promise.all([statePr,
            message({
                type: 'incrementDeath'
            })]);
        WA.exitSceneTo(`/${state.roomId}${state.startLayerName ? '#' + state.startLayerName : ''}`);
        WA.sendChatMessage('you died ...', '');
    } catch(e) {
        console.error(e);
    }
});

WA.onEnterZone('item-pickup', async () => {
    const { message } = await ws;
    const playerState = await message({
        type: 'getUserData'
    });
    if(!playerState.gameModeEnabled) {
        WA.openPopup('no-player', 'sorry you need to complete the game-mode quest first', [{
            label: 'ok',
            callback: popup => {
                popup.close();
            }
        }]);
    } else {
        WA.sendChatMessage('you just got 3 items 🤩', 'engine');
        message({
            type: 'addItem',
            data: {
                count: 3
            }
        });
    }
});

(async () => {
    const { popupInZone } = await zonedpp;
    popupInZone({
        zone: 'jitsi-guide',
        popupText: 'this jitsi call is connected to openbas etage1 oben rechts in der ecke in case u need a distraction but still want to be in call :)',
        popupOptions: []
    });
})();
