/// <reference path="index.d.ts" />

const ws = require('./backend-connection');
const statePr = WA.getGameState()
WA.onEnterZone('death', async () => {
    try {
        const { message } = await ws;
        const [state] = await Promise.all([statePr,
            message({
                type: 'incrementDeath'
            })])
        WA.exitSceneTo(`/${state.roomId}${state.startLayerName ? '#' + state.startLayerName : ''}`);
        WA.sendChatMessage('you died ...', '');
    } catch(e) {
        console.error(e)
    }
});


WA.onEnterZone("item-pickup", async () => {
    const { message } = await ws;
    const playerState = await message({
        type: "getUserData"
    })
    if(!playerState.gameModeEnabled) {
        WA.openPopup("no-player", "sorry you need to complete the game-mode quest first", [{
            label: "ok",
            callback: popup => {
                popup.close()
            }
        }])
    } else {
        WA.sendChatMessage("you received some item idk no items yet give me some tips or try later", "engine")
    }
})