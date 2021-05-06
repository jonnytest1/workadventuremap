import { ChangeDetectorRef, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Vector } from '../vector';
import { ApiService } from './api-service';
import { UnPromise, UserData, WorkAdventureApi } from './backend';
import { SharedService } from './shared-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'mapoverlay';

  userData$: Observable<UserData>;

  _autoOpenOverlay: boolean = false

  get autoOpenOverlay() {
    return this._autoOpenOverlay
  }

  set autoOpenOverlay(value: boolean) {
    this._autoOpenOverlay = value;
    this.apiService.passThrough({
      type: "userUpdate",
      data: {
        autoOpenGameOverlay: value
      }
    })
  }

  constructor(private apiService: ApiService, private sharedService: SharedService, private cdr: ChangeDetectorRef) {

    window.addEventListener("keydown", e => {
      console.log(e)
    })
    this.userData$ = sharedService.userData

    this.userData$.subscribe(data => {
      if (data) {
        this._autoOpenOverlay = data.autoOpenGameOverlay
        this.cdr.detectChanges()
      }
    })


    combineLatest([this.apiService.userPositions, this.userData$])
      .subscribe(async ([positions, userData]) => {
        const gameState = await this.apiService.WAApi("getGameState")
        const playerInScreen = new Vector(window.innerWidth, window.innerHeight)
          .multipliedBy(devicePixelRatio)
          .subtract(
            new Vector(window.outerWidth, window.outerHeight)
              .dividedBy(2))
          .dividedBy(devicePixelRatio)
          .floored()
        const playerVector = this.getVectorForPlayer(gameState, gameState.nickName)

        document.getElementById("direction-sign-container").innerHTML = ''
        for (let user of positions) {
          const userRefId = user.userRefereneUuid
          if (userRefId !== userData.referenceUuid) {
            if (user.userRefereneUuid == userData.trackedUser) {

              const otherPlayerVector = new Vector(user.position.x, user.position.y)
              //if (!this.directionSignMap[pusherId]) {
              const compassIcon = document.createElement("div")
              compassIcon.style.position = "fixed"
              compassIcon.style.backgroundColor = "red"
              compassIcon.style.width = "10px";
              compassIcon.style.height = "10px";
              document.getElementById("direction-sign-container").appendChild(compassIcon)
              // }
              const userToPlayer = otherPlayerVector.subtract(playerVector);
              if (userToPlayer.length() < 300) {
                compassIcon.remove()
                //  delete this.directionSignMap[pusherId]
              }
              const directionPos = playerInScreen.added(
                userToPlayer.scaleTo(400).added(0, 60)
              )

              compassIcon.style.left = directionPos.x + "px"
              compassIcon.style.top = directionPos.y + "px"
            }


          }
        }
      })
  }

  getVectorForPlayer(gameState: UnPromise<ReturnType<WorkAdventureApi["getGameState"]>>, playerName: string) {
    const playerPos = gameState.players[playerName].position;
    return new Vector(playerPos.x, playerPos.y)
  }

  openMiro() {
    this.apiService.WAApi('openCoWebSite', './pages/miro.html')
  }
}
