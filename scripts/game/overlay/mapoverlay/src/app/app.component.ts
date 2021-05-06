import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
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

  directionSignMap: { [pusherUuid: string]: HTMLDivElement } = {}

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
      this._autoOpenOverlay = data.autoOpenGameOverlay
      this.cdr.detectChanges()
    })


    setInterval(async () => {
      const gameState = await this.apiService.WAApi("getGameState")
      const playerVector = this.getVectorForPlayer(gameState, gameState.nickName)
      const playerInScreen = new Vector(window.innerWidth, window.innerHeight)
        .multipliedBy(devicePixelRatio)
        .subtract(
          new Vector(window.outerWidth, window.outerHeight)
            .dividedBy(2))
        .dividedBy(devicePixelRatio)
        .floored()

      for (let i in gameState.players) {
        if (i !== gameState.nickName) {
          const player = gameState.players[i]
          const otherPlayerVector = this.getVectorForPlayer(gameState, i)
          if (!this.directionSignMap[player.pusherId]) {
            this.directionSignMap[player.pusherId] = document.createElement("div")
            this.directionSignMap[player.pusherId].style.position = "fixed"
            this.directionSignMap[player.pusherId].style.backgroundColor = "red"
            this.directionSignMap[player.pusherId].style.width = "10px";
            this.directionSignMap[player.pusherId].style.height = "10px";
            document.getElementById("direction-sign-container").appendChild(this.directionSignMap[player.pusherId])
          }
          const directionPos = playerInScreen.added(
            otherPlayerVector.subtract(playerVector).scaleTo(400)
          )

          this.directionSignMap[player.pusherId].style.left = directionPos.x + "px"
          this.directionSignMap[player.pusherId].style.top = directionPos.y + "px"

        }
      }

    }, 500)
  }

  getVectorForPlayer(gameState: UnPromise<ReturnType<WorkAdventureApi["getGameState"]>>, playerName: string) {
    const playerPos = gameState.players[playerName].position;
    return new Vector(playerPos.x, playerPos.y)
  }

  openMiro() {
    this.apiService.WAApi('openCoWebSite', './pages/miro.html')
  }
}
