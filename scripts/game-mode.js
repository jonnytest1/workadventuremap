const importPromise = Promise.all([
    require('./backend-connection'),
    require('./zoned-popup'),
    require('./game/user-data'),
    require('./game/main'),
    require('./communication')
]);
(async () => {

    const [{ message, ws }, { popupInZone }, { getUserData }, { enableGameMode }] = await importPromise;

    const data = await getUserData();
    console.log('got userdata');
    if(data.gameModeEnabled) {
        enableGameMode();
    }
    popupInZone({
        zone: 'game-mode',
        popupText: 'are you ready to start your adventure ?',
        popupOptions: [{
            label: 'no :(',
        }, {
            label: 'yes 😎',
            className: 'success',
            callback: () => {
                message({
                    type: 'enableGameMode'
                });
                enableGameMode();
                WA.openCoWebSite('./game/overlay/mapoverlay/dist/mapoverlay/index.html', { asOverlay: true });
            }
        }]
    });

})();
