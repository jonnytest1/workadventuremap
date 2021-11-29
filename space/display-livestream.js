/// <reference path="../scripts/index.d.ts" />

window.blockAutoOpenOverlay = true


onload = () => {
    WA.nav.openCoWebSite("../space/iss.html")
    setTimeout(() => {

        setTimeout(() => {
            WA.ui.displayActionMessage({
                message: "press 'space' to jump down",
                callback: () => {
                    WA.nav.goToRoom("https://pi4.e6azumuvyiabvs9s.myfritz.net/mapserver/rest/mapserver/site.json")
                }
            })
        }, 1000)


    }, 1000);

}



