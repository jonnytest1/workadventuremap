/// <reference path="../scripts/index.d.ts" />

let entercount = 0;

WA.onEnterZone('event', () => {
    console.log('zoneenter');
    entercount++;
    WA.updateTile([{
        layer: 'overlay',
        x: 20, y: 20, tile: Math.floor(Math.random() * 2700)
    }]);
});

