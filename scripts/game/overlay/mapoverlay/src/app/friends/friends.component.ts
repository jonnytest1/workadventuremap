import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api-service';
import { FeMessage, UnPromise, UserData } from '../backend';
import { SharedService } from '../shared-service';

type Friend = UnPromise<FeMessage['getUserData']['response']>['friends']['key'];

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.less']
})
export class FriendsComponent implements OnInit {

  userData$: Observable<UserData>;
  showAllUsers: boolean
  constructor(private apiService: ApiService, private sharedService: SharedService) {
    this.userData$ = sharedService.userData
  }

  loadUserData() {
    this.sharedService.loadUserData();
  }

  ngOnInit() {

  }

  debug<T>(obj: T): T {
    return obj
  }

  getRoom(friend: Friend) {
    const roomParts = friend.room.split('/');
    const currentMap = roomParts.pop();
    const domain = roomParts[2];
    let roomStr = `${domain}-${currentMap} `
    if (friend.jitsiRoom && friend.jitsiRoom !== 'invalidmapref') {
      roomStr += ` in ${friend.jitsiRoom}`;
    }

    return roomStr
  }

  sortFriends(friend: KeyValue<string, Friend>, friend2: KeyValue<string, Friend>) {
    return friend.value.index - friend2.value.index
  }

  refreshFriends() {
    this.sharedService.refreshFriends(this.showAllUsers);
  }

  messageFriend(friend: Friend) {
    const message = prompt('message');
    this.apiService.passThrough({
      type: 'chatmessage',
      data: {
        message: `${friend.index} ${message}`
      }
    });
  }

  async visitFriend(friend: Friend) {

    const friendInfo = await this.apiService.passThrough({
      type: 'friendstatus'
    });
    for (let friendName in friendInfo) {
      if (friendInfo[friendName].index === friend.index) {
        this.apiService.WAApi("exitSceneTo", `/${friendInfo[friendName].room}`)
        return;
      }
    }
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
