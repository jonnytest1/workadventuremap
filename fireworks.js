/// <reference path="../../bas/jonny-maps/scripts/index.d.ts" />

const overlayLayerName = "fireworks-layer"


class FireWork {


    static shootingStar = 16;

    static explosions = [0, 4, 8]

    eventPhase = 0

    /**
     * @type {Parameters<typeof WA.room.setTiles>[0]}
     */
    setTiles = []

    shootUpOffset = 0

    constructor(x, y, tilesetstart, tilesetWidth) {
        this.startPosition = {
            x, y
        }
        this.tilesetWidth = tilesetWidth
        this.tilesetstart = tilesetstart
        this.explosionColored = FireWork.explosions[(Math.floor(Math.random() * FireWork.explosions.length))]
        this.shoot()
    }

    async shoot() {
        this.unset()
        this.set([
            {
                layer: overlayLayerName,
                tile: this.tilesetstart + FireWork.shootingStar,
                x: this.startPosition.x,
                y: this.startPosition.y - this.shootUpOffset
            }, {
                layer: overlayLayerName,
                tile: this.tilesetstart + FireWork.shootingStar + this.tilesetWidth,
                x: this.startPosition.x,
                y: this.startPosition.y + 1 - this.shootUpOffset++
            }
        ])

        if(this.shootUpOffset >= 5) {
            setTimeout(() => {
                this.unset()
                this.explode();
            }, 50)
            return
        }

        setTimeout(() => {
            this.shoot()
        }, 100)
    }

    explode() {
        const topLeft = {
            x: this.startPosition.x - 1,
            y: this.startPosition.y - this.shootUpOffset - 1
        }
        /**
         * @type {Parameters<typeof WA.room.setTiles>[0]}
         */
        const tiles = []
        for(let x = 0; x < 4; x++) {
            for(let y = 0; y < 3; y++) {
                tiles.push({
                    layer: overlayLayerName,
                    tile: (this.tilesetstart) + this.explosionColored + x + (y * this.tilesetWidth),
                    x: topLeft.x + x,
                    y: topLeft.y + y
                })
            }
        }
        this.set(tiles)

        setTimeout(() => {
            this.unset()
        }, 1000)
    }

    /**
     * 
     * @param {Parameters<typeof WA.room.setTiles>[0]} tiles 
     */
    set(tiles) {
        this.setTiles.push(...tiles)
        WA.room.setTiles(tiles)
    }

    unset() {
        WA.room.setTiles(this.setTiles.map(tile => ({ ...tile, tile: 0 })))
        this.setTiles = []
    }
}



Promise.all([WA.room.getTiledMap(), WA.onInit()]).then(([map]) => {
    const tileset = map.tilesets.find(ts => ts.name == "fireworks")
    let firworks = []
    /**
     * @type {{x:number,y:number}}
     */
    let currentPosition
    WA.player.onPlayerMove(pos => {
        currentPosition = pos
    })


    setInterval(() => {

        const now = new Date()
        const isEvening = Math.abs(24 - now.getHours()) < 4
        if(isEvening && currentPosition) {
            for(let i = 0; i < 5; i++) {
                const chunk = 24
                const x = (Math.random() * chunk) - (chunk / 2)
                const y = (Math.random() * chunk) - (chunk / 2)
                const player = {
                    x: (currentPosition.x / 32),
                    y: (currentPosition.y / 32)
                }

                firworks.push(new FireWork(Math.floor(player.x + x), Math.floor(player.y + y), tileset.firstgid, tileset.columns))
            }

        }
        firworks = firworks.filter(f => f.eventPhase < 2)
    }, 500)


})