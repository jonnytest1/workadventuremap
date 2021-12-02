/// <reference path="./index.js" />

scriptNesting(require('./backend-connection'), async imports => {
    const { message } = await imports;
    setTimeout(() => {
        Promise.all([
            message({
                type: 'userUpdate',
                data: {
                    pusherUuid: WA.player.id,
                    nickName: WA.player.name
                }
            })
        ]);
        Promise.all([
            message({
                type: "setAttribute",
                data: {
                    key: "devicePixelRatio",
                    value: devicePixelRatio
                }
            }),
            message({
                type: "setAttribute",
                data: {
                    key: "userAgent",
                    value: navigator.userAgent
                }
            }),
        ])
    }, 2000);
})