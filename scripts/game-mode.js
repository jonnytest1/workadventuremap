
scriptNesting(Promise.all([
    require('./backend-connection'),
    require('./zoned-popup'),
    require('./game/user-data'),
    require('./game/main'),
    require('./communication')
]), async imps => {
    const [{ message, ws }, { popupInZone }, { getUserData }, { enableGameMode, openOverlay }] = await imps;

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
                openOverlay();
            }
        }]
    });
})
