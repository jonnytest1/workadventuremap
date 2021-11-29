/// <reference path="../scripts/index.d.ts" />
(() => {
    const currentScript = document.currentScript;

    // @ts-ignore
    const scriptURL = new URL(currentScript.src);

    const currentScriptUrl = new URL(scriptURL.href);
    currentScriptUrl.search = ""

    const script = document.createElement("script")
    script.type = "module"
    script.src = new URL("./module/t1.js", currentScriptUrl.href.replace("index.js", "")).href

    if(!document.body) {
        window.addEventListener('load', () => {
            document.body.appendChild(script)
        });
    } else {
        document.body.appendChild(script)
    }






})()


