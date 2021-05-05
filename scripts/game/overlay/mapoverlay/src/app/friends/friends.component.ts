import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api-service';
import { FeMessage, UnPromise } from '../backend';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.less']
})
export class FriendsComponent implements OnInit {

  @Input()
  userData: UnPromise<FeMessage['getUserData']['response']>;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }


  openMiro() {
    this.apiService.WAApi('openCoWebSite', './pages/miro.html');
    // 'https://jonnytest1.github.io/workadventuremap/scripts/pages/miro.html'
  }
  messageFriend(friend: UnPromise<FeMessage['getUserData']['response']>['friends']['key']) {
    const message = prompt('message');
    this.apiService.passThrough({
      type: 'chatmessage',
      data: {
        message: `${friend.index} ${message}`
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
