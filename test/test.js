/// <reference path="../scripts/index.d.ts" />

let entercount = 0;

const beCon = require('../scripts/backend-connection');

/*WA.onMoveEvent(event => {
    console.log(event)
})*/
/*
WA.onEnterZone('event', async () => {
    console.log('zoneenter');
    entercount++;

    const tmsg = WA.triggerMessage('hallo213', () => { });

    const triggerMessage = WA.triggerMessage('hallo', () => {
        WA.updateTile([{
            layer: 'overlay',
            x: 20, y: 20, tile: Math.floor(Math.random() * 2700)
        }]);
        WA.removeTriggerMessage(triggerMessage);
    });
});
*/
