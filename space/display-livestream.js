/// <reference path="../scripts/index.d.ts" />

window.blockAutoOpenOverlay = true


onload = () => {
    WA.nav.openCoWebSite("../space/iss.html")
    setTimeout(() => {

        setTimeout(() => {
            WA.triggerMessage("press 'space' to jump down", () => {
               WA.nav.goToRoom("/_/global/pi4.e6azumuvyiabvs9s.myfritz.net/mapserver/rest/mapserver/site.json")
            })
        }, 1000)


    }, 1000);

}



