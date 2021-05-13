(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+xTt":
/*!********************************!*\
  !*** ./src/app/api-service.ts ***!
  \********************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
class ApiService {
    constructor() {
        this.passThroughResponseMap = {};
        this.apiResponseMethod = {};
        // private messageMap: { [uuid: string]: (arg: any) => void } = {};
        this._userPositions = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.userPositions = this._userPositions.asObservable();
        this._passedEvents = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.passedEvents = this._passedEvents.asObservable();
        this._playerPosition = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](undefined);
        this.playerPostion = this._playerPosition.asObservable();
        window.addEventListener('message', messageEvent => {
            if (messageEvent.data.type === 'passthroughresponse') {
                this.passThroughResponseMap[messageEvent.data.uuid](messageEvent.data.data);
                delete this.passThroughResponseMap[messageEvent.data.uuid];
            }
            else if (messageEvent.data.type === 'apicallresponse') {
                this.apiResponseMethod[messageEvent.data.uuid](messageEvent.data.data);
                delete this.apiResponseMethod[messageEvent.data.uuid];
            }
            else if (messageEvent.data.type == "positionUpdate") {
                this._userPositions.next(messageEvent.data.data);
            }
            else if (messageEvent.data.type == "event-pass") {
                this._passedEvents.next(messageEvent.data.data);
            }
            else if (messageEvent.data.type == "movementpassthrough") {
                this._playerPosition.next(messageEvent.data.data);
            }
        });
    }
    passThrough(event) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((res, thr) => {
                const uuid = uuidv4();
                this.passThroughResponseMap[uuid] = res;
                window.parent.postMessage({
                    type: 'passthrough',
                    uuid,
                    data: event
                }, '*');
            });
        });
    }
    WAApi(eventMethod, ...args) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((res, thr) => {
                const uuid = uuidv4();
                this.apiResponseMethod[uuid] = res;
                window.parent.postMessage({
                    type: 'apicall',
                    method: eventMethod,
                    uuid,
                    arguments: args
                }, '*');
            });
        });
    }
}
ApiService.ɵfac = function ApiService_Factory(t) { return new (t || ApiService)(); };
ApiService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: ApiService, factory: ApiService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Jonathan\Projects\bas\jonny-maps\scripts\game\overlay\mapoverlay\src\main.ts */"zUnb");


/***/ }),

/***/ "3gL3":
/*!**********************************************!*\
  !*** ./src/app/friends/friends.component.ts ***!
  \**********************************************/
/*! exports provided: FriendsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FriendsComponent", function() { return FriendsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api-service */ "+xTt");
/* harmony import */ var _shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared-service */ "O8iW");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");








function FriendsComponent_ng_container_0_mat_checkbox_3_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-checkbox", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function FriendsComponent_ng_container_0_mat_checkbox_3_Template_mat_checkbox_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r5.showAllUsers = $event; })("ngModelChange", function FriendsComponent_ng_container_0_mat_checkbox_3_Template_mat_checkbox_ngModelChange_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r6); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r7.refreshFriends(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "show all");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx_r2.showAllUsers);
} }
function FriendsComponent_ng_container_0_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FriendsComponent_ng_container_0_button_5_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r8.messageGlobal(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "message global");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function FriendsComponent_ng_container_0_tr_18_ng_container_7_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FriendsComponent_ng_container_0_tr_18_ng_container_7_button_6_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r16); const friend_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit; const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r14.visitFriend(friend_r10.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "visit");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function FriendsComponent_ng_container_0_tr_18_ng_container_7_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FriendsComponent_ng_container_0_tr_18_ng_container_7_button_7_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4); return ctx_r17.untrack(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "untrack");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function FriendsComponent_ng_container_0_tr_18_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FriendsComponent_ng_container_0_tr_18_ng_container_7_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r21); const friend_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit; const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r19.messageFriend(friend_r10.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "message");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, FriendsComponent_ng_container_0_tr_18_ng_container_7_button_6_Template, 2, 0, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, FriendsComponent_ng_container_0_tr_18_ng_container_7_button_7_Template, 2, 0, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const friend_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const userData_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r11.getRoom(friend_r10.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !userData_r1.trackedUser);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", userData_r1.trackedUser);
} }
function FriendsComponent_ng_container_0_tr_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "td", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, FriendsComponent_ng_container_0_tr_18_ng_container_7_Template, 8, 3, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const friend_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](friend_r10.value.index);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](friend_r10.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](friend_r10.value.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", friend_r10.value.status == "online");
} }
function FriendsComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, FriendsComponent_ng_container_0_mat_checkbox_3_Template, 2, 1, "mat-checkbox", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, FriendsComponent_ng_container_0_button_5_Template, 2, 0, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FriendsComponent_ng_container_0_Template_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r25); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r24.refreshFriends(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "refresh");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "table");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "th", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, " Friend Index ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, " Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, " Status ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "th");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, " Room ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, FriendsComponent_ng_container_0_tr_18_Template, 8, 4, "tr", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](19, "keyvalue");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const userData_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" you died ", userData_r1.deathCount, " times so far ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", userData_r1.isAdmin);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", userData_r1.isAdmin);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](19, 4, userData_r1.friends, ctx_r0.sortFriends));
} }
class FriendsComponent {
    constructor(apiService, sharedService) {
        this.apiService = apiService;
        this.sharedService = sharedService;
        this.userData$ = sharedService.userData;
    }
    loadUserData() {
        this.sharedService.loadUserData();
    }
    ngOnInit() {
    }
    debug(obj) {
        return obj;
    }
    getRoom(friend) {
        const roomParts = friend.room.split('/');
        const currentMap = roomParts.pop();
        const domain = roomParts[2];
        let roomStr = `${domain}-${currentMap} `;
        if (friend.jitsiRoom && friend.jitsiRoom !== 'invalidmapref') {
            roomStr += ` in ${friend.jitsiRoom}`;
        }
        return roomStr;
    }
    sortFriends(friend, friend2) {
        return friend.value.index - friend2.value.index;
    }
    refreshFriends() {
        this.sharedService.refreshFriends(this.showAllUsers);
    }
    messageFriend(friend) {
        const message = prompt('message');
        this.apiService.passThrough({
            type: 'chatmessage',
            data: {
                message: `${friend.index} ${message}`
            }
        });
    }
    untrack() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.sharedService.update({ trackedUser: null });
        });
    }
    visitFriend(friend) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.sharedService.update({ trackedUser: friend.referenceUuid });
            const gameState = yield this.apiService.WAApi("getGameState");
            if (friend.room !== gameState.roomId) {
                const friendInfo = yield this.apiService.passThrough({
                    type: 'friendstatus'
                });
                for (let friendName in friendInfo) {
                    if (friendInfo[friendName].index === friend.index) {
                        this.apiService.WAApi("exitSceneTo", `/${friendInfo[friendName].room}`);
                        return;
                    }
                }
            }
        });
    }
    messageGlobal() {
        const message = prompt('message');
        this.apiService.passThrough({
            type: 'chatmessage',
            data: {
                message: `global ${message}`
            }
        });
    }
}
FriendsComponent.ɵfac = function FriendsComponent_Factory(t) { return new (t || FriendsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_service__WEBPACK_IMPORTED_MODULE_3__["SharedService"])); };
FriendsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: FriendsComponent, selectors: [["app-friends"]], decls: 2, vars: 3, consts: [[4, "ngIf"], [3, "ngModel", "ngModelChange", 4, "ngIf"], ["mat-button", "", 3, "click", 4, "ngIf"], ["mat-button", "", 3, "click"], [1, "friendIndex"], [4, "ngFor", "ngForOf"], [3, "ngModel", "ngModelChange"]], template: function FriendsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, FriendsComponent_ng_container_0_Template, 20, 7, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](1, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](1, 1, ctx.userData$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__["MatCheckbox"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["KeyValuePipe"]], styles: ["@media screen and (max-width: 600px) {\n  .friendIndex[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyaWVuZHMuY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0k7RUFBQTtJQUNJLGFBQUE7RUFDTjtBQUNGIiwiZmlsZSI6ImZyaWVuZHMuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZnJpZW5kSW5kZXh7XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcbiAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG59Il19 */"] });


/***/ }),

/***/ "9URT":
/*!***********************************************!*\
  !*** ./src/app/speech-recognition-service.ts ***!
  \***********************************************/
/*! exports provided: SpeechRecognitionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpeechRecognitionService", function() { return SpeechRecognitionService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api-service */ "+xTt");


class SpeechRecognitionService {
    constructor(apiService) {
        this.apiService = apiService;
        //@ts-ignore
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        //@ts-ignore
        var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
        //@ts-ignore
        var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'de'; //Sprache auf Deutsch festlegen
        var speechRecognitionList = new SpeechGrammarList();
        speechRecognitionList.addFromString('Brandad Systems', 1);
        this.recognition.grammars = speechRecognitionList;
        this.recognition.continuous = true;
        this.recognition.onresult = function (event) {
            if (event.results.length > 0) {
                if (event.results[0][0].transcript.toLocaleLowerCase() == "Brandad Systems".toLocaleLowerCase()) {
                    apiService.WAApi("exitSceneTo", "/_/global/brandad-systems.github.io/workadventure-maps/openbas.json");
                }
                var utterance = new SpeechSynthesisUtterance(event.results[0][0].transcript);
                utterance.lang = 'de'; //Sprache auf Deutsch festlegen
                speechSynthesis.speak(utterance);
            }
        };
        this.recognition.onerror = function (event) {
            console.error(event.error);
            // debugger;
        };
        this.recognition.onnomatch = function (event) {
            debugger;
        };
        this.recognition.onspeechend = function () {
            debugger;
        };
    }
    start() {
        this.recognition.start();
    }
}
SpeechRecognitionService.ɵfac = function SpeechRecognitionService_Factory(t) { return new (t || SpeechRecognitionService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"])); };
SpeechRecognitionService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SpeechRecognitionService, factory: SpeechRecognitionService.ɵfac, providedIn: "root" });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    mapServerOrigin: "pi4.e6azumuvyiabvs9s.myfritz.net"
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Frio":
/*!************************************************!*\
  !*** ./src/app/inventar/inventar.component.ts ***!
  \************************************************/
/*! exports provided: InventarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InventarComponent", function() { return InventarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/internal/operators */ "yrbL");
/* harmony import */ var rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _workadventure_mapserver_resources_mapserver_user_inventory_inventory_item_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../../workadventure-mapserver/resources/mapserver/user/inventory/inventory-item-type */ "vsSO");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "AytR");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./vector */ "sqkX");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../api-service */ "+xTt");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ "bTqV");









const _c0 = ["canvas"];
function InventarComponent_ng_container_3_img_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "img", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function InventarComponent_ng_container_3_img_1_Template_img_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8); const index_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().index; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r6.setActiveIndex(index_r4); })("contextmenu", function InventarComponent_ng_container_3_img_1_Template_img_contextmenu_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8); const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r9.openContextMenu($event, item_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("title", ctx_r5.inventoryMap[item_r3.itemType].title)("src", item_r3.src, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeUrl"]);
} }
function InventarComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, InventarComponent_ng_container_3_img_1_Template, 1, 2, "img", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !!item_r3.src || ctx_r1.getImageSource(item_r3));
} }
function InventarComponent_ng_container_5_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function InventarComponent_ng_container_5_button_4_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r13.preview(ctx_r13.menuItem); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " preview placement ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function InventarComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function InventarComponent_ng_container_5_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r15.activationClick(ctx_r15.menuItem); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, InventarComponent_ng_container_5_button_4_Template, 2, 0, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r2.getInventoryItem(ctx_r2.menuItem.itemType).activationText, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r2.menuItem.itemType == 1);
} }
class InventarComponent {
    constructor(cdr, apiService) {
        this.cdr = cdr;
        this.apiService = apiService;
        this.inventory = [];
        this.canvas = null;
        this.context = null;
        this.menuItem = null;
        this.activeIndex = 0;
        this.inventoryMap = _workadventure_mapserver_resources_mapserver_user_inventory_inventory_item_type__WEBPACK_IMPORTED_MODULE_2__["inventoryTypeMap"];
        this.menuTopLeftPosition = { x: '0', y: '0' };
        this.tileImage = {};
        this.onClick = (event) => {
            if (!event.composedPath().some(ev => ev.id == "inventoryItemDialog")) {
                this.removeMenu();
            }
        };
    }
    setActiveIndex(index) {
        this.activeIndex = index;
        this.draw();
    }
    getInventoryItem(type) {
        return this.inventoryMap[type];
    }
    getImageSource(item) {
        if (item.itemType == 0 /* Random */) {
            return item.src = `assets/img/${_workadventure_mapserver_resources_mapserver_user_inventory_inventory_item_type__WEBPACK_IMPORTED_MODULE_2__["inventoryTypeMap"][item.itemType].image}.svg`;
        }
        else if (item.itemType == 1 /* Tile */) {
            const imageSource = `https://${_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].mapServerOrigin}/mapserver/rest/mapserver/usermap/assets/control.png`;
            if (!this.tileImage[imageSource]) {
                this.tileImage[imageSource] = {
                    loaded: false,
                    imageEl: document.getElementById("tileImageRendererSource")
                };
                this.tileImage[imageSource].imageEl.src = imageSource;
                this.tileImage[imageSource].imageEl.onload = () => {
                    this.tileImage[imageSource].loaded = true;
                    this.cdr.detectChanges();
                };
                this.tileImage[imageSource].imageEl.onerror = () => {
                    debugger;
                };
            }
            if (this.tileImage[imageSource].loaded) {
                try {
                    const renderCanvas = document.getElementById("tileImageRenderer");
                    renderCanvas.height = 32;
                    renderCanvas.width = 32;
                    const context = renderCanvas.getContext("2d");
                    const zeroBasedIndex = item.index - 1;
                    const imageTilePerRow = this.tileImage[imageSource].imageEl.width / 32;
                    const x = zeroBasedIndex % (imageTilePerRow);
                    const y = Math.floor(zeroBasedIndex / imageTilePerRow);
                    context.clearRect(0, 0, 32, 32);
                    context.drawImage(this.tileImage[imageSource].imageEl, -x * 32, -y * 32);
                    item.src = renderCanvas.toDataURL();
                    this.cdr.detectChanges();
                }
                catch (e) {
                    debugger;
                }
            }
        }
    }
    ngAfterViewInit() {
        var _a;
        this.context = ((_a = this.canvas) === null || _a === void 0 ? void 0 : _a.nativeElement.getContext("2d")) || null;
        this.draw();
    }
    openContextMenu(event, item) {
        event.preventDefault();
        this.menuItem = item;
        if (!this.menuRef) {
            this.menuRef = document.getElementById('inventoryItemDialog');
        }
        this.menuRef.style.display = 'initial';
        this.menuRef.style.position = 'fixed';
        this.menuRef.style.margin = "0px";
        this.menuRef.style.padding = "0px";
        this.menuRef.style.border = "0px";
        this.menuRef.style.left = event.pageX + 'px';
        this.menuRef.style.top = event.pageY + 'px';
        this.menuRef.style.transform = "translateY(-100%)";
        this.menuRef.style.display = "initial";
        this.menuRef.show();
        window.parent.focus();
        window.addEventListener("click", this.onClick);
    }
    removeMenu() {
        this.menuRef.close("false");
        this.menuRef.style.display = "none";
        this.cdr.detectChanges();
        window.removeEventListener("click", this.onClick);
    }
    preview(item) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const position = yield this.apiService.playerPostion.pipe(Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1)).toPromise();
            if (position == undefined) {
                return;
            }
            let tiledPosition = {
                x: Math.floor(position.x / 32),
                y: Math.floor(position.y / 32)
            };
            this.apiService.WAApi("updateTile", [Object.assign(Object.assign({}, tiledPosition), { tile: item.index, layer: "background-image" })]);
        });
    }
    activationClick(item) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let tiledPosition = null;
            if (item.itemType == 1 /* Tile */) {
                const position = yield this.apiService.playerPostion.pipe(Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1)).toPromise();
                if (position == undefined) {
                    return;
                }
                tiledPosition = {
                    x: Math.floor(position.x / 32),
                    y: Math.floor(position.y / 32)
                };
            }
            const newItem = yield this.apiService.passThrough({
                type: "activateItem",
                data: {
                    item: item.id,
                    position: tiledPosition
                }
            });
            this.inventory.splice(this.inventory.findIndex(iitem => iitem.id == item.id), 1, ...newItem);
            if (item.itemType == 1 /* Tile */) {
                this.apiService.WAApi("updateTile", [Object.assign(Object.assign({}, tiledPosition), { tile: item.index, layer: "background-image" })]);
            }
            this.removeMenu();
        });
    }
    draw() {
        this.map((pixel, height, width) => {
            const gridPos = pixel.x % 50 == 0 || pixel.y % 50 == 0;
            const borderPos = pixel.x == width - 1 || pixel.y == height - 1;
            const x = Math.floor(pixel.x / 50);
            const y = Math.floor(pixel.y / 50);
            const activeIndex = y * 16 + x === this.activeIndex;
            return Object.assign(Object.assign({}, pixel), { alpha: (gridPos || borderPos || activeIndex) ? 256 : 20, blue: 256, red: 256, green: 256 });
        });
    }
    getPixel(image, pos) {
        const index = pos.y * (image.width * 4) + pos.x * 4;
        return {
            red: image.data[index],
            green: image.data[index + 1],
            blue: image.data[index + 2],
            alpha: image.data[index + 3],
            x: pos.x,
            y: pos.y
        };
    }
    get rect() {
        const rect = this.getRect();
        if (!rect) {
            return null;
        }
        return new _vector__WEBPACK_IMPORTED_MODULE_4__["Vector2"](rect.width, rect.height);
    }
    getRect() {
        var _a;
        return (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.nativeElement.getBoundingClientRect();
    }
    getImageData(from, to) {
        if (!from) {
            from = _vector__WEBPACK_IMPORTED_MODULE_4__["Vector2"].ZERO;
        }
        let toVector;
        if (!to && this.rect) {
            toVector = this.rect;
        }
        else {
            toVector = to;
        }
        const newLocal = toVector.sub(from);
        return this.context.getImageData(from.x, from.y, newLocal.x, newLocal.y);
    }
    map(fnc, options = {}) {
        const imageData = this.getImageData();
        let start = _vector__WEBPACK_IMPORTED_MODULE_4__["Vector2"].ZERO;
        if (options.from) {
            start = options.from.round();
        }
        let end = this.rect;
        if (options.to) {
            end = options.to;
        }
        end = end.limit(this.rect.round());
        for (let x = start.x; x < end.x; x++) {
            for (let y = start.y; y < end.y; y++) {
                const index = y * (imageData.width * 4) + x * 4;
                const rgba = fnc({
                    red: imageData.data[index],
                    green: imageData.data[index + 1],
                    blue: imageData.data[index + 2],
                    alpha: imageData.data[index + 3],
                    x: x,
                    y: y
                }, imageData.height, imageData.width);
                if (rgba) {
                    imageData.data[index] = rgba.red;
                    imageData.data[index + 1] = rgba.green;
                    imageData.data[index + 2] = rgba.blue;
                    imageData.data[index + 3] = rgba.alpha;
                }
                else {
                    debugger;
                }
            }
        }
        this.putImageData(imageData);
        return this.canvas;
    }
    putImageData(imageData, pos) {
        if (!pos) {
            pos = _vector__WEBPACK_IMPORTED_MODULE_4__["Vector2"].ZERO;
        }
        this.context.putImageData(imageData, pos.x, pos.y);
    }
    ngOnInit() {
    }
}
InventarComponent.ɵfac = function InventarComponent_Factory(t) { return new (t || InventarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"])); };
InventarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: InventarComponent, selectors: [["app-inventar"]], viewQuery: function InventarComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.canvas = _t.first);
    } }, inputs: { inventory: "inventory" }, decls: 8, vars: 2, consts: [["width", "800px", "height", "200px"], ["canvas", ""], ["id", "inventoryGridContainer"], [4, "ngFor", "ngForOf"], ["id", "inventoryItemDialog"], [4, "ngIf"], ["id", "tileImageRendererSource", "crossorigin", "anonymous", 2, "position", "absolute", "display", "none"], ["id", "tileImageRenderer", 2, "position", "absolute", "display", "none"], ["width", "40px", "height", "40px", 3, "title", "src", "click", "contextmenu", 4, "ngIf"], ["width", "40px", "height", "40px", 3, "title", "src", "click", "contextmenu"], ["mat-button", "", 3, "click"], ["mat-button", "", 3, "click", 4, "ngIf"]], template: function InventarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "canvas", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, InventarComponent_ng_container_3_Template, 2, 1, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "dialog", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, InventarComponent_ng_container_5_Template, 5, 2, "ng-container", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](6, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "canvas", 7);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.inventory);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.menuItem);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButton"]], styles: ["#inventoryGridContainer[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0px;\n  display: grid;\n  grid-template-columns: repeat(16, 50px);\n  grid-template-rows: repeat(4, 50px);\n  align-items: center;\n  justify-items: center;\n}\nbutton[_ngcontent-%COMP%] {\n  font-size: large;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImludmVudGFyLmNvbXBvbmVudC5sZXNzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7RUFDQSxRQUFBO0VBRUEsYUFBQTtFQUNBLHVDQUFBO0VBQ0EsbUNBQUE7RUFFQSxtQkFBQTtFQUNBLHFCQUFBO0FBREo7QUFJQTtFQUNJLGdCQUFBO0FBRkoiLCJmaWxlIjoiaW52ZW50YXIuY29tcG9uZW50Lmxlc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjaW52ZW50b3J5R3JpZENvbnRhaW5lcntcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwcHg7XG5cbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDE2LDUwcHgpO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDQsNTBweCk7XG5cbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcbn1cblxuYnV0dG9ue1xuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XG59Il19 */"] });


/***/ }),

/***/ "O8iW":
/*!***********************************!*\
  !*** ./src/app/shared-service.ts ***!
  \***********************************/
/*! exports provided: SharedService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedService", function() { return SharedService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api-service */ "+xTt");




class SharedService {
    constructor(apiService) {
        this.apiService = apiService;
        this._userData = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](undefined);
        this.userData = this._userData.asObservable();
        this.gameState$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](undefined);
        this.loadUserData();
        this.apiService.WAApi("getGameState").then(state => {
            this.gameState$.next(state);
        });
    }
    loadUserData() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let userData = yield this.apiService.passThrough({
                type: 'getUserData'
            });
            this._userData.next(userData);
        });
    }
    refreshFriends(allUsers = false) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const newFriends = yield this.apiService.passThrough({
                type: "friendstatus",
                data: {
                    withAdmin: allUsers
                }
            });
            this._userData.next(Object.assign(Object.assign({}, this._userData.value), { friends: newFriends }));
        });
    }
    update(arg0) {
        let userData = Object.assign({}, this._userData.value);
        for (let i in arg0) {
            userData[i] = arg0[i];
        }
        this._userData.next(userData);
        this.apiService.passThrough({
            type: "userUpdate",
            data: userData
        });
    }
}
SharedService.ɵfac = function SharedService_Factory(t) { return new (t || SharedService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"])); };
SharedService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: SharedService, factory: SharedService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "RUEf":
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/*! exports provided: routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony import */ var _friends_friends_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./friends/friends.component */ "3gL3");
/* harmony import */ var _miro_miro_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./miro/miro.component */ "kKqb");


const routes = [{
        path: 'friends',
        component: _friends_friends_component__WEBPACK_IMPORTED_MODULE_0__["FriendsComponent"]
    }, {
        path: "miro",
        component: _miro_miro_component__WEBPACK_IMPORTED_MODULE_1__["MiroComponent"]
    }];


/***/ }),

/***/ "SRwN":
/*!***********************!*\
  !*** ./src/vector.ts ***!
  \***********************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return Vector; });
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    clone() {
        const newVector = Object.create(this);
        Object.assign(newVector, this);
        return newVector;
    }
    dividedBy(divisor) {
        const newVector = this.clone();
        newVector.x = this.x / divisor;
        newVector.y = this.y / divisor;
        return newVector;
    }
    multipliedBy(divisor) {
        const newVector = this.clone();
        newVector.x = this.x * divisor;
        newVector.y = this.y * divisor;
        return newVector;
    }
    rounded() {
        const newVector = this.clone();
        newVector.x = Math.round(this.x);
        newVector.y = Math.round(this.y);
        return newVector;
    }
    subtract(x_Vector, y) {
        let addX;
        let addY;
        if (x_Vector instanceof Vector) {
            const loc = x_Vector;
            addX = loc.x;
            addY = loc.y;
        }
        else {
            const amount = x_Vector;
            addX = amount;
            addY = y | amount;
        }
        const newVector = this.clone();
        newVector.x = this.x - addX;
        newVector.y = this.y - addY;
        return newVector;
    }
    floored(lat = true, lon = true) {
        const newVector = this.clone();
        if (lat) {
            newVector.x = Math.floor(this.x);
        }
        if (lon) {
            newVector.y = Math.floor(this.y);
        }
        return newVector;
    }
    added(pixel, amountLat) {
        let addX;
        let addY;
        if (pixel instanceof Vector) {
            const loc = pixel;
            addX = loc.x;
            addY = loc.y;
        }
        else {
            const amount = pixel;
            addX = amount;
            addY = amountLat | amount;
        }
        const newVector = this.clone();
        newVector.x = this.x + addX;
        newVector.y = this.y + addY;
        return newVector;
    }
    equals(startPoint) {
        return startPoint.x === this.x && startPoint.y === this.y;
    }
    limit(max) {
        const newVector = this.clone();
        newVector.x = Math.min(this.x, max);
        newVector.y = Math.min(this.y, max);
        return newVector;
    }
    atLeast(min) {
        const newVector = this.clone();
        let minX;
        let minY;
        if (min instanceof Vector) {
            minY = min.y;
            minX = min.x;
        }
        else {
            minX = min;
            minY = min;
        }
        newVector.x = Math.max(this.x, minX);
        newVector.y = Math.max(this.y, minY);
        return newVector;
    }
    length() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    scaleTo(length) {
        return this.dividedBy(this.length()).multipliedBy(length);
    }
    toString() {
        return `{"lat":${this.x},"lon":${this.y}}`;
    }
}


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/internal/operators */ "yrbL");
/* harmony import */ var rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "AytR");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../vector */ "SRwN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./api-service */ "+xTt");
/* harmony import */ var _shared_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared-service */ "O8iW");
/* harmony import */ var _speech_recognition_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./speech-recognition-service */ "9URT");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _health_health_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./health/health.component */ "tOTl");
/* harmony import */ var _inventar_inventar_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./inventar/inventar.component */ "Frio");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
















function AppComponent_ng_container_0_mat_checkbox_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-checkbox", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AppComponent_ng_container_0_mat_checkbox_1_Template_mat_checkbox_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r4.autoOpenOverlay = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Automatically Open the overlay on visist");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r2.autoOpenOverlay);
} }
function AppComponent_ng_container_0_ng_container_7_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_ng_container_0_ng_container_7_button_1_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3); return ctx_r10.gotoPrivateMap(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "private map");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function AppComponent_ng_container_0_ng_container_7_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_ng_container_0_ng_container_7_ng_template_2_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3); return ctx_r12.goBackToPreviousMap(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "back");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function AppComponent_ng_container_0_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AppComponent_ng_container_0_ng_container_7_button_1_Template, 2, 0, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, AppComponent_ng_container_0_ng_container_7_ng_template_2_Template, 2, 0, "ng-template", null, 8, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const isPrivateMap_r6 = ctx.$implicit;
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", isPrivateMap_r6 == "other")("ngIfElse", _r8);
} }
function AppComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AppComponent_ng_container_0_mat_checkbox_1_Template, 2, 1, "mat-checkbox", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AppComponent_ng_container_0_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r14.blur(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Friends");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "open miro");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, AppComponent_ng_container_0_ng_container_7_Template, 4, 2, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](10, "router-outlet");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](11, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](12, "app-health");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](13, "app-inventar", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const userData_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", userData_r1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 3, ctx_r0.isPrivateMap$));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("inventory", userData_r1.inventory);
} }
class AppComponent {
    constructor(apiService, sharedService, cdr, speechRecognition, router) {
        this.apiService = apiService;
        this.sharedService = sharedService;
        this.cdr = cdr;
        this.speechRecognition = speechRecognition;
        this.router = router;
        this.title = 'mapoverlay';
        this._autoOpenOverlay = false;
        this.fPressed = apiService.passedEvents.pipe(Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__["groupBy"])(e => e.code), Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(group => group.pipe(Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])(null, e => e.type))), Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__["mergeAll"])(), Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(ev => ev.type == "keydown" || ev.type == "keyup"), Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(ev => ev.code == "KeyF"), Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(ev => ev.type == "keydown"));
        this.fPressed.subscribe(e => {
            if (e) {
                this.router.navigate(["friends"]);
            }
            else {
                if (this.router.url == "/friends") {
                    this.router.navigateByUrl("/");
                }
            }
        });
        this.userData$ = sharedService.userData;
        this.gameState$ = sharedService.gameState$;
        this.userData$.subscribe(data => {
            if (data) {
                this._autoOpenOverlay = data.autoOpenGameOverlay;
                this.cdr.detectChanges();
            }
        });
        speechRecognition.start();
        this.isPrivateMap$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([this.userData$, this.gameState$]).pipe(Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(([userData, gameState]) => !!userData && !!gameState), Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(([userData, gameState]) => {
            return gameState.roomId.includes(userData.referenceUuid) ? "private" : "other";
        }));
        Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([this.apiService.userPositions, this.userData$])
            .subscribe(([positions, userData]) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const gameState = yield this.apiService.WAApi("getGameState");
            const playerInScreen = new _vector__WEBPACK_IMPORTED_MODULE_4__["Vector"](window.innerWidth, window.innerHeight)
                .multipliedBy(devicePixelRatio)
                .subtract(new _vector__WEBPACK_IMPORTED_MODULE_4__["Vector"](window.outerWidth, window.outerHeight)
                .dividedBy(2))
                .dividedBy(devicePixelRatio)
                .floored();
            const playerVector = this.getVectorForPlayer(gameState, gameState.nickName);
            document.getElementById("direction-sign-container").innerHTML = '';
            for (let user of positions) {
                const userRefId = user.userRefereneUuid;
                if (userRefId !== userData.referenceUuid) {
                    if (user.userRefereneUuid == userData.trackedUser) {
                        const otherPlayerVector = new _vector__WEBPACK_IMPORTED_MODULE_4__["Vector"](user.position.x, user.position.y);
                        //if (!this.directionSignMap[pusherId]) {
                        const compassIcon = document.createElement("div");
                        compassIcon.style.position = "fixed";
                        compassIcon.style.backgroundColor = "red";
                        compassIcon.style.width = "10px";
                        compassIcon.style.height = "10px";
                        document.getElementById("direction-sign-container").appendChild(compassIcon);
                        // }
                        const userToPlayer = otherPlayerVector.subtract(playerVector);
                        if (userToPlayer.length() < 300) {
                            compassIcon.remove();
                            //  delete this.directionSignMap[pusherId]
                        }
                        const directionPos = playerInScreen.added(userToPlayer.scaleTo(400).added(0, 60));
                        compassIcon.style.left = directionPos.x + "px";
                        compassIcon.style.top = directionPos.y + "px";
                    }
                }
            }
        }));
        window.addEventListener("click", e => {
            window.parent.focus();
        });
    }
    get autoOpenOverlay() {
        return this._autoOpenOverlay;
    }
    set autoOpenOverlay(value) {
        this._autoOpenOverlay = value;
        this.apiService.passThrough({
            type: "userUpdate",
            data: {
                autoOpenGameOverlay: value
            }
        });
    }
    debug(val) {
        debugger;
        console.log(val);
        return val;
    }
    goBackToPreviousMap() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const userData = yield this.userData$.pipe(Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1)).toPromise();
            this.apiService.WAApi("exitSceneTo", `/${userData.attributes.previousMap}`);
        });
    }
    gotoPrivateMap() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                const [gameState, { referenceUuid }] = yield Promise.all([
                    this.gameState$.pipe(Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1)).toPromise(),
                    this.userData$.pipe(Object(rxjs_internal_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1)).toPromise(),
                ]);
                yield this.apiService.passThrough({
                    type: "setAttribute",
                    data: {
                        key: "previousMap",
                        value: gameState.roomId
                    }
                });
                this.apiService.WAApi("exitSceneTo", `/_/global/${_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].mapServerOrigin}/mapserver/rest/mapserver/usermap/${referenceUuid}.json`);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    getVectorForPlayer(gameState, playerName) {
        const playerPos = gameState.players[playerName].position;
        return new _vector__WEBPACK_IMPORTED_MODULE_4__["Vector"](playerPos.x, playerPos.y);
    }
    blur() {
        window.parent.focus();
    }
    openMiro() {
        this.apiService.WAApi('openCoWebSite', './pages/miro.html');
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_shared_service__WEBPACK_IMPORTED_MODULE_7__["SharedService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_speech_recognition_service__WEBPACK_IMPORTED_MODULE_8__["SpeechRecognitionService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__["Router"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 3, consts: [[4, "ngIf"], [3, "ngModel", "ngModelChange", 4, "ngIf"], ["mat-button", "", "routerLink", "friends", 3, "click"], ["mat-button", "", "routerLink", "miro"], ["id", "direction-sign-container"], [3, "inventory"], [3, "ngModel", "ngModelChange"], ["mat-button", "", 3, "click", 4, "ngIf", "ngIfElse"], ["back", ""], ["mat-button", "", 3, "click"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, AppComponent_ng_container_0_Template, 14, 5, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](1, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](1, 1, ctx.userData$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButton"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterLink"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterOutlet"], _health_health_component__WEBPACK_IMPORTED_MODULE_12__["HealthComponent"], _inventar_inventar_component__WEBPACK_IMPORTED_MODULE_13__["InventarComponent"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_14__["MatCheckbox"], _angular_forms__WEBPACK_IMPORTED_MODULE_15__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_15__["NgModel"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["AsyncPipe"]], styles: ["@media screen and (max-width: 600px) {\n  button[_ngcontent-%COMP%] {\n    display: block;\n    margin-top: 36px;\n    margin-left: auto;\n    margin-right: auto;\n  }\n}\napp-health[_ngcontent-%COMP%] {\n  position: absolute;\n  overflow: hidden;\n}\n@media screen and (max-width: 600px) {\n  app-health[_ngcontent-%COMP%] {\n    bottom: 200px;\n    right: 20px;\n  }\n}\n@media screen and (min-width: 601px) {\n  app-health[_ngcontent-%COMP%] {\n    bottom: 12px;\n    right: 400px;\n  }\n}\napp-inventar[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 12px;\n  right: 600px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQubGVzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFSTtFQUFBO0lBQ0ksY0FBQTtJQUNBLGdCQUFBO0lBQ0EsaUJBQUE7SUFDQSxrQkFBQTtFQUFOO0FBQ0Y7QUFJQTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7QUFGSjtBQUlJO0VBQUE7SUFDSSxhQUFBO0lBQ0EsV0FBQTtFQUROO0FBQ0Y7QUFHSTtFQUFBO0lBQ0ksWUFBQTtJQUNBLFlBQUE7RUFBTjtBQUNGO0FBS0E7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0FBSEoiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiXG5idXR0b257XG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG1hcmdpbi10b3A6IDM2cHg7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG5cbiAgICB9XG59XG5cbmFwcC1oZWFsdGh7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgICAgICBib3R0b206MjAwcHg7XG4gICAgICAgIHJpZ2h0OiAyMHB4O1xuICAgICAgXG4gICAgfVxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDYwMXB4KSB7XG4gICAgICAgIGJvdHRvbToxMnB4O1xuICAgICAgICByaWdodDogNDAwcHg7XG4gICAgfVxuXG59XG5cblxuYXBwLWludmVudGFye1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206MTJweDtcbiAgICByaWdodDogNjAwcHg7XG59XG4iXX0= */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var ng_circle_progress__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-circle-progress */ "K1R0");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./api-service */ "+xTt");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app.routes */ "RUEf");
/* harmony import */ var _friends_friends_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./friends/friends.component */ "3gL3");
/* harmony import */ var _health_health_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./health/health.component */ "tOTl");
/* harmony import */ var _inventar_inventar_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./inventar/inventar.component */ "Frio");
/* harmony import */ var _miro_miro_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./miro/miro.component */ "kKqb");
/* harmony import */ var _shared_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./shared-service */ "O8iW");
/* harmony import */ var _speech_recognition_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./speech-recognition-service */ "9URT");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ "fXoL");





















class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineInjector"]({ providers: [_api_service__WEBPACK_IMPORTED_MODULE_9__["ApiService"], _shared_service__WEBPACK_IMPORTED_MODULE_16__["SharedService"], _speech_recognition_service__WEBPACK_IMPORTED_MODULE_17__["SpeechRecognitionService"]], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["BrowserModule"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterModule"].forRoot(_app_routes__WEBPACK_IMPORTED_MODULE_11__["routes"]), ng_circle_progress__WEBPACK_IMPORTED_MODULE_8__["NgCircleProgressModule"].forRoot(), _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormsModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatListModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"], _friends_friends_component__WEBPACK_IMPORTED_MODULE_12__["FriendsComponent"],
        _health_health_component__WEBPACK_IMPORTED_MODULE_13__["HealthComponent"],
        _miro_miro_component__WEBPACK_IMPORTED_MODULE_15__["MiroComponent"],
        _inventar_inventar_component__WEBPACK_IMPORTED_MODULE_14__["InventarComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["BrowserModule"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterModule"], ng_circle_progress__WEBPACK_IMPORTED_MODULE_8__["NgCircleProgressModule"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__["MatDialogModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormsModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatListModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"]] }); })();


/***/ }),

/***/ "kKqb":
/*!****************************************!*\
  !*** ./src/app/miro/miro.component.ts ***!
  \****************************************/
/*! exports provided: MiroComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MiroComponent", function() { return MiroComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class MiroComponent {
    constructor() { }
    ngOnInit() {
    }
}
MiroComponent.ɵfac = function MiroComponent_Factory(t) { return new (t || MiroComponent)(); };
MiroComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MiroComponent, selectors: [["app-miro"]], decls: 2, vars: 0, consts: [["width", "100%", "height", "100%", "src", "https://miro.com/app/live-embed/o9J_lIWrP_o=/?moveToViewport=-1319,-576,1877,916", "frameBorder", "0", "scrolling", "no", "allowFullScreen", ""]], template: function MiroComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "iframe", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["div[_ngcontent-%COMP%] {\n  height: calc(100% - 90px);\n  position: absolute;\n  right: 0px;\n  left: 0px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1pcm8uY29tcG9uZW50Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7QUFDSiIsImZpbGUiOiJtaXJvLmNvbXBvbmVudC5sZXNzIiwic291cmNlc0NvbnRlbnQiOlsiZGl2e1xuICAgIGhlaWdodDogY2FsYygxMDAlIC0gOTBweCk7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAwcHg7XG4gICAgbGVmdDogMHB4O1xufSJdfQ== */"] });


/***/ }),

/***/ "sqkX":
/*!************************************!*\
  !*** ./src/app/inventar/vector.ts ***!
  \************************************/
/*! exports provided: Vector2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector2", function() { return Vector2; });
function isCustomVector(obj) {
    return typeof obj !== 'number' && 'x' in obj && 'y' in obj;
}
class Vector2 {
    constructor(x, y) {
        if (x instanceof MouseEvent) {
            this.y = x.offsetY;
            this.x = x.offsetX;
        }
        else if (isCustomVector(x)) {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x;
            this.y = y;
        }
    }
    limit(arg0) {
        return new Vector2(Math.min(this.x, arg0.x), Math.min(this.y, arg0.y));
    }
    round() {
        return new Vector2(Math.round(this.x - 0.5), Math.round(this.y - 0.5));
    }
    add(direction) {
        return new Vector2(this.x + direction.x, this.y + direction.y);
    }
    addX(x) {
        return new Vector2(this.x + x, this.y);
    }
    sub(direction) {
        return new Vector2(this.x - direction.x, this.y - direction.y);
    }
    magnitude() {
        return Math.sqrt(this.lengthSqr());
    }
    div(divisor) {
        if (divisor instanceof Vector2) {
            return new Vector2(this.x / divisor.x, this.y / divisor.y);
        }
        return new Vector2(this.x / divisor, this.y / divisor);
    }
    mult(multiplicator) {
        return new Vector2(this.x * multiplicator, this.y * multiplicator);
    }
    dot(vector2) {
        return this.x * vector2.x + this.y * vector2.y;
    }
    lengthSqr() {
        return (this.x * this.x) + (this.y * this.y);
    }
}
Vector2.ZERO = new Vector2(0, 0);


/***/ }),

/***/ "tOTl":
/*!********************************************!*\
  !*** ./src/app/health/health.component.ts ***!
  \********************************************/
/*! exports provided: HealthComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HealthComponent", function() { return HealthComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ng_circle_progress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng-circle-progress */ "K1R0");


class HealthComponent {
    constructor() {
        this.health = 10;
        this.maxHealth = 100;
    }
    get percent() {
        return this.health / this.maxHealth;
    }
    get healthColor() {
        const percent = this.percent;
        if (percent < 0.2) {
            return "red";
        }
        return "#78C000";
    }
    ngOnInit() {
    }
}
HealthComponent.ɵfac = function HealthComponent_Factory(t) { return new (t || HealthComponent)(); };
HealthComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HealthComponent, selectors: [["app-health"]], decls: 1, vars: 12, consts: [["titleFontSize", "40", "titleColor", "black", "unitsFontSize", "26", 3, "percent", "radius", "outerStrokeWidth", "showSubtitle", "showUnits", "showInnerStroke", "innerStrokeWidth", "outerStrokeColor", "showBackground", "innerStrokeColor", "animation", "animationDuration"]], template: function HealthComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "circle-progress", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("percent", ctx.percent * 100)("radius", 80)("outerStrokeWidth", 16)("showSubtitle", false)("showUnits", true)("showInnerStroke", true)("innerStrokeWidth", 4)("outerStrokeColor", ctx.healthColor)("showBackground", false)("innerStrokeColor", "#C7E596")("animation", true)("animationDuration", 300);
    } }, directives: [ng_circle_progress__WEBPACK_IMPORTED_MODULE_1__["CircleProgressComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJoZWFsdGguY29tcG9uZW50Lmxlc3MifQ== */"] });


/***/ }),

/***/ "vsSO":
/*!******************************************************************************************************************!*\
  !*** D:/Jonathan/Projects/bas/workadventure-mapserver/resources/mapserver/user/inventory/inventory-item-type.ts ***!
  \******************************************************************************************************************/
/*! exports provided: inventoryTypeMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inventoryTypeMap", function() { return inventoryTypeMap; });
const inventoryTypeMap = {
    [0 /* Random */]: {
        image: 'help',
        title: 'a random item that will do something at some point',
        activationText: 'roll for item',
    },
    [1 /* Tile */]: {
        image: '{}',
        title: 'a tile',
        activationText: 'place at player',
    }
};


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map