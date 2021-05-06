import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api-service';
import { UserData } from './backend';

@Injectable({
    providedIn: 'root',
})
export class SharedService {


    private _userData = new BehaviorSubject<UserData>(undefined)

    public userData = this._userData.asObservable()

    constructor(private apiService: ApiService) {
        this.loadUserData()
    }

    public async loadUserData() {
        let userData = await this.apiService.passThrough({
            type: 'getUserData'
        })
        this._userData.next(userData)
    }

    async refreshFriends(allUsers = false) {
        const newFriends = await this.apiService.passThrough({
            type: "friendstatus",
            data: {
                withAdmin: allUsers
            }
        })

        this._userData.next({ ...this._userData.value, friends: newFriends })
    }

    update(arg0: { [att in keyof UserData]?: UserData[att] }) {
        let userData = { ...this._userData.value };
        for (let i in arg0) {
            userData[i] = arg0[i]
        }
        this._userData.next(userData)
        this.apiService.passThrough({
            type: "userUpdate",
            data: userData
        })
    }



}
