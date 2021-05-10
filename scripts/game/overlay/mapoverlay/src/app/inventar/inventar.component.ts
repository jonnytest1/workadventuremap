import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { inventoryTypeMap } from '../../../../../../../../workadventure-mapserver/resources/mapserver/models/inventory-item-type';
import { UserData } from '../backend';
import { Vector2 } from './vector';

interface Pixel {
  red: number;
  green: number;
  blue: number;
  alpha: number;
  x: number
  y: number
}


@Component({
  selector: 'app-inventar',
  templateUrl: './inventar.component.html',
  styleUrls: ['./inventar.component.less']
})
export class InventarComponent implements OnInit {

  @Input()
  inventory: Array<UserData["inventory"][number]>


  @ViewChild("canvas")
  canvas: ElementRef<HTMLCanvasElement>
  context: CanvasRenderingContext2D;

  activeIndex = 0;
  imageMap = inventoryTypeMap

  
  constructor() { }


  setActiveIndex(index: number) {
    this.activeIndex = index
    this.draw()
  }
  getImageSource(item: UserData["inventory"][number]) {
    return `assets/img/${inventoryTypeMap[item.itemType].image}.svg`
  }
  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext("2d")
    this.draw();

  }
  private draw() {
    this.map((pixel, height, width) => {
      const gridPos = pixel.x % 50 == 0 || pixel.y % 50 == 0;
      const borderPos = pixel.x == width - 1 || pixel.y == height - 1;

      const x = Math.floor(pixel.x / 50);
      const y = Math.floor(pixel.y / 50);
      const activeIndex = y * 16 + x === this.activeIndex;
      return {
        ...pixel,
        alpha: (gridPos || borderPos || activeIndex) ? 256 : 20,
        blue: 256,
        red: 256,
        green: 256
      };
    });
  }

  getPixel(image: ImageData, pos: Vector2) {
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
    return new Vector2(rect.width, rect.height);
  }

  getRect() {
    return this.canvas.nativeElement.getBoundingClientRect();
  }

  getImageData(from?: Vector2, to?: Vector2) {
    if (!from) {
      from = Vector2.ZERO;
    }
    if (!to) {
      to = this.rect;
    }
    const newLocal = to.sub(from);
    return this.context.getImageData(from.x, from.y, newLocal.x, newLocal.y);
  }

  map(fnc: (pixel: Pixel, height, width) => Pixel, options: { from?: Vector2, to?: Vector2 } = {}) {
    const imageData = this.getImageData();

    let start = Vector2.ZERO;
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
        } else {
          debugger;
        }
      }
    }
    this.putImageData(imageData);
    return this.canvas;

  }
  putImageData(imageData: ImageData, pos?: Vector2) {
    if (!pos) {
      pos = Vector2.ZERO;
    }
    this.context.putImageData(imageData, pos.x, pos.y);
  }


  ngOnInit() {
  }

}
