import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.less']
})
export class HealthComponent implements OnInit {


  health: number = 10
  maxHealth: number = 100


  get percent() {
    return this.health / this.maxHealth
  }


  get healthColor() {
    const percent = this.percent

    if (percent < 0.2) {
      return "red"
    }

    return "#78C000"
  }

  constructor() { }

  ngOnInit() {
  }

}
