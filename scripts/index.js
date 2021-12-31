/// <reference path="./index.d.ts" />
const currentScript = document.currentScript;
/**
 * this function is used to not litter up the global scopes with variables
 * @example
 * scriptNesting(Promise.all([
 *   require('./<somescript.js>'),
 * ]),async imports=>{
 *    const [someImport] = await imports
 *    ...
 * })
 * @template T
 * @param {T} imports
 * @param {(imports:Promise<T>)=>Promise<void>} callback
 */
var scriptNesting = async function(imports, callback) {
    return WA.onInit().then(() => {
        return callback(Promise.resolve(imports))
    })
}

/**
 * this function is used to not litter up the global scopes with variables while still passing through the exports
 * usage: 
 * @example
 * module.exports= exportNesting([require("./<someimport.js>")],imports=>{
 *     return {
 *         someExport:async()=>{
 *               const [someImport]=await imports
 *               ...
 *         } 
 *     }
 * })
 * @template T
 * @template U
 * @param {T} imports
 * @param {(imports:Promise<T>)=>U} callback
 */
var exportNesting = function(imports, callback) {
    return callback(Promise.resolve(imports))
}

/**
 * @type {{[key:string]:Promise<any>}}
 */
let loadingSCriptsMap = {};
var module = { exports: null };
Object.defineProperty(module, 'exports', {
    get: () => {
        return document.currentScript['exports'] || {};
    },
    set: (obj) => {
        document.currentScript['exports'] = obj;
    }
});

// @ts-ignore
const scriptURL = new URL(currentScript?.src || import.meta.url);

const currentScriptUrl = new URL(scriptURL.href);
currentScriptUrl.search = ""

/**
 * this function loads the script specified by the importUrl (currently @jonnygithub can be used a placeholder for the current repositoryurl)
 * @param {string} scriptLoadUrl 
 * @returns 
 */
async function scriptImporting(scriptLoadUrl) {
    const scriptToUse = document.currentScript || currentScript || { src: currentScriptUrl.href };
    if(!scriptLoadUrl.endsWith('.js')) {
        scriptLoadUrl += '.js';
    }
    if(scriptLoadUrl.startsWith("@jonnygithub/")) {
        scriptLoadUrl = new URL(scriptLoadUrl.replace("@jonnygithub/", './'), currentScriptUrl.href.replace("index.js", "")).href
    }
    let newSrc;
    if(scriptToUse && 'src' in scriptToUse) {
        const baseURL = new URL(scriptToUse.src);
        baseURL.search = '';
        newSrc = new URL(scriptLoadUrl, baseURL.href);
    } else {
        //idk
    }
    if(!loadingSCriptsMap[newSrc.href]) {
        loadingSCriptsMap[newSrc.href] = new Promise((resolv, thrower) => {
            const script = document.createElement('script');
            script.src = newSrc.href;
            /*const existingScript = [...document.scripts].find(scr => scr.src === script.src);
            if(existingScript) {
                let exps = existingScript['exports'];

                resolv(exps);
                return;
            }*/
            let timeout = setTimeout(() => {
                //debugger;
                console.error(script.src + ' didnt load in 1 sec');
            }, 2000);
            script.onload = () => {
                const ecps = script['exports'];
                if(!ecps && (script.src.includes('popup'))) {
                    debugger;
                }
                resolv(ecps);
                clearTimeout(timeout);
            };
            script.onerror = e => {
                debugger;
                console.error(e);
            };
            document.body.appendChild(script);
        });
    }
    return loadingSCriptsMap[newSrc.href];
};

//@ts-ignore
window.importScript = scriptImporting

/**
 * assign window.require this way the typing of module imports gets preserved (though it still needs to be awaited sicne the import works asynchronously)
 */
// @ts-ignore
window.require = importScript;

const scriptLoadUrl = scriptURL.searchParams.get('url');
if(!document.body) {
    window.addEventListener('load', () => {
        for(let requireUrl of scriptLoadUrl.split(',')) {
            scriptImporting(requireUrl);
        }
    });
} else {
    for(let requireUrl of scriptLoadUrl.split(',')) {
        scriptImporting(requireUrl);
    }
}
