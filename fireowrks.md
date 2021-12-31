add the tileset :
(the name is important)
(if you have a lot of tiles maybe increase the firstgid a bunch)
```json
 {
      "columns": 17,
      "firstgid": 19337,
      "image": "fireworks.png",
      "imageheight": 160,
      "imagewidth": 544,
      "margin": 0,
      "name": "fireworks",
      "spacing": 0,
      "tilecount": 85,
      "tileheight": 32,
      "tilewidth": 32,
      "transparentcolor": "#eeeeee"
}
```
add an empty layer with the name "fireworks-layer":
(the name is important)
(tiled will not export the tileset + layer unless they are used so i recommend adding the bottom right pixel of the fireworks tileset somewhere in the layer - its invisible)
should look something liek this (depends on map size)
```json
    {
      "data": [... ],
      "height": 100,
      "id": 88,
      "name": "fireworks-layer",
      "opacity": 1,
      "type": "tilelayer",
      "visible": true,
      "width": 136,
      "x": 0,
      "y": 0
    }
```

add the fireworks.js script to your map (if you already have a script you can copy the code in your script [or use the script laoder ./scripts/index.js=<firstscript.js>,<secondscript.js> here in the repo])