/// <reference path="index.d.ts" />

const ws = require('./backend-connection');

WA.onEnterZone('death', async () => {
    const { message } = await ws;
    const [state] = await Promise.all([
        WA.getGameState(),
        message({
            type: 'incrementDeath'
        })
    ]);
    WA.exitSceneTo(`/${state.roomId}${state.startLayerName ? '#' + state.startLayerName : ''}`);
    WA.sendChatMessage('you died ...', '');
});