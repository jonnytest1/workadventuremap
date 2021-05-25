/// <reference path="../scripts/index.d.ts" />

setTimeout(() => {
    WA.openCoWebSite("./iss.html")
}, 1000);


WA.triggerMessage("press 'space' to jump", () => {
    WA.exitSceneTo("/_/global/pi4.e6azumuvyiabvs9s.myfritz.net/mapserver/rest/mapserver/site.json")
})