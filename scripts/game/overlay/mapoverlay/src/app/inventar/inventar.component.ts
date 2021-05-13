import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { InventoryItemType, inventoryTypeMap } from '../../../../../../../../workadventure-mapserver/resources/mapserver/models/inventory-item-type';
import { environment } from '../../environments/environment';
import { ApiService } from '../api-service';
import { FeInventoryItem } from '../backend';
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
  inventory: Array<FeInventoryItem> = []

  @ViewChild("canvas")
  canvas: ElementRef<HTMLCanvasElement> | null = null
  context: CanvasRenderingContext2D | null = null;

  menuItem: FeInventoryItem = null
  activeIndex = 0;
  inventoryMap = inventoryTypeMap

  menuRef: HTMLDialogElement

  menuTopLeftPosition = { x: '0', y: '0' }

  tileImage: { [index: string]: { imageEl: HTMLImageElement, loaded?: boolean } } = {}

  onClick = (event) => {
    if (!event.composedPath().some(ev => (ev as HTMLElement).id == "inventoryItemDialog")) {
      this.removeMenu()
    }
  }


  constructor(private cdr: ChangeDetectorRef, private apiService: ApiService) { }

  setActiveIndex(index: number) {
    this.activeIndex = index
    this.draw()
  }

  getInventoryItem(type: InventoryItemType) {
    return this.inventoryMap[type]
  }

  getImageSource(item: FeInventoryItem): string {
    if (item.itemType == InventoryItemType.Random) {
      return item.src = `assets/img/${inventoryTypeMap[item.itemType].image}.svg`
    } else if (item.itemType == InventoryItemType.Tile) {
      const imageSource = `https://${environment.mapServerOrigin}/mapserver/rest/mapserver/usermap/assets/control.png`
      if (!this.tileImage[imageSource]) {
        this.tileImage[imageSource] = {
          loaded: false,
          imageEl: document.getElementById("tileImageRendererSource") as HTMLImageElement
        }
        this.tileImage[imageSource].imageEl.src = imageSource
        this.tileImage[imageSource].imageEl.onload = () => {
          this.tileImage[imageSource].loaded = true
          this.cdr.detectChanges()
        }
        this.tileImage[imageSource].imageEl.onerror = () => {
          debugger;
        }
      }
      if (this.tileImage[imageSource].loaded) {
        try {
          const renderCanvas = document.getElementById("tileImageRenderer") as HTMLCanvasElement;
          renderCanvas.height = 32
          renderCanvas.width = 32
          const context = renderCanvas.getContext("2d");

          const zeroBasedIndex = item.index - 1
          const imageTilePerRow = this.tileImage[imageSource].imageEl.width / 32;
          const x = zeroBasedIndex % (imageTilePerRow)
          const y = Math.floor(zeroBasedIndex / imageTilePerRow)
          context.clearRect(0, 0, 32, 32)
          context.drawImage(this.tileImage[imageSource].imageEl, -x * 32, -y * 32)
          item.src = renderCanvas.toDataURL()
          this.cdr.detectChanges()
        } catch (e) {
          debugger;
        }
      }
    }

  }
  ngAfterViewInit(): void {
    this.context = this.canvas?.nativeElement.getContext("2d") || null
    this.draw();

  }

  openContextMenu(event: MouseEvent, item: FeInventoryItem) {
    event.preventDefault()
    this.menuItem = item

    if (!this.menuRef) {
      this.menuRef = document.getElementById('inventoryItemDialog') as HTMLDialogElement
    }
    this.menuRef.style.display = 'initial';
    this.menuRef.style.position = 'fixed';
    this.menuRef.style.margin = "0px"
    this.menuRef.style.padding = "0px"
    this.menuRef.style.border = "0px"
    this.menuRef.style.left = event.pageX + 'px';

    this.menuRef.style.top = event.pageY + 'px';
    this.menuRef.style.transform = "translateY(-100%)";
    this.menuRef.style.display = "initial"
    this.menuRef.show()



    window.addEventListener("click", this.onClick)

    // this.menuTopLeftPosition.x = event.clientX + 'px';
    // this.menuTopLeftPosition.y = event.clientY + 'px';


  }

  removeMenu() {
    this.menuRef.close("false")
    this.menuRef.style.display = "none"
    this.cdr.detectChanges();
    window.removeEventListener("click", this.onClick)
  }

  async activationClick(item: FeInventoryItem) {
    const newItem = await this.apiService.passThrough({
      type: "activateItem",
      data: {
        item: item.id
      }
    })
    this.inventory.splice(this.inventory.findIndex(iitem => iitem.id == item.id), 1, newItem)
    this.removeMenu()
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
    if (!rect) {
      return null
    }
    return new Vector2(rect.width, rect.height);
  }

  getRect() {
    return this.canvas?.nativeElement.getBoundingClientRect();
  }

  getImageData(from?: Vector2, to?: Vector2) {
    if (!from) {
      from = Vector2.ZERO;
    }
    let toVector: Vector2
    if (!to && this.rect) {
      toVector = this.rect;
    } else {
      toVector = to as Vector2
    }
    const newLocal = toVector.sub(from);
    return this.context.getImageData(from.x, from.y, newLocal.x, newLocal.y);
  }

  map(fnc: (pixel: Pixel, height: number, width: number) => Pixel, options: { from?: Vector2, to?: Vector2 } = {}) {
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
