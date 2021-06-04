

scriptNesting(require('./backend-connection'), async imports => {
    const { message } = await imports;
    setTimeout(() => {
        WA.getGameState()
            .then(async state => {
                await message({
                    type: 'userUpdate',
                    data: {
                        pusherUuid: state.uuid,
                        nickName: state.nickName
                    }
                });

            });
    }, 2000);
})