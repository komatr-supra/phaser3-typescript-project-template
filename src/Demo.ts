import { Vector } from 'matter';
import * as Phaser from 'phaser';

export default class Demo extends Phaser.Scene
{
    readonly charMultiatlasName: string = 'characters';
    layer;
    shapeGraphics;
    debugGraphics;
    controls;
    player: Phaser.Physics.Matter.Sprite;
    cursors;
    constructor ()
    {
        super('demo');
    }

    preload ()
    {
        this.load.multiatlas(this.charMultiatlasName, 'assets/spritesheets/characters.json', 'assets/spritesheets');
        this.load.image('tiles', 'assets/tilemaps/tiles/taigaTileset.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/mapa.json');
        this.load.image('player', 'assets/entity/thief.png');
    }

    create ()
    {
  this.cameras.main.setSize(320,180);
  // Nastavte zobrazenou oblast kamery
  this.cameras.main.setViewport(0, 0, 640, 360);
  this.cameras.main.zoom = 2;
  // Nastavení ovládání hráče
  this.cursors = this.input.keyboard.createCursorKeys();
        const map = this.make.tilemap({ key: 'map' });
        // The first parameter is the name of the tileset in Tiled and the second parameter is the key
        // of the tileset image used when loading the file in preload.
        const tiles = map.addTilesetImage('jmeno', 'tiles');
        if(!tiles) console.log("tiles not set from json");
        // You can load a layer from the map using the layer name from Tiled, or by using the layer
        // index (0 in this case).
        const layer = map.createLayer(0, tiles);
        if(!layer) console.log("layer was not created");

        this.layer = map.createLayer(1, tiles);
            // Instead of setting collision by index, you can set any tile that has collision data to
        // collide. Typically, this is done in the Tiled collision editor. All tiles in this layer have
        // collision shapes.
        this.layer.setCollisionFromCollisionGroup(true, false);


        this.matter.world.convertTilemapLayer(this.layer);
        //this.matter.world.setBounds(map.widthInPixels, map.heightInPixels);
        //this.matter.world.debugGraphic.setAlpha(0.5);
        // Drop bouncy, Matter balls on pointer down
        


        


              // Vytvoření hráče s Matter.js fyzikou
              this.player = this.matter.add.sprite(32, 32, this.charMultiatlasName, 'playerFD_idle_0', {render: {"sprite.yOffset": -4}, shape: {type: 'circle', radius: 5}});

              const frameNames = this.anims.generateFrameNames(this.charMultiatlasName, {
                start: 0, end: 3, zeroPad: 0,
                prefix: 'playerFD_walk_'
            });
            this.anims.create({ key: 'walk', frames: frameNames, frameRate: 10, repeat: -1 });
    this.player.anims.play('walk');
  //this.player = this.matter.add.image(100, 100, 'player');
  this.player.setIgnoreGravity(true);
  // Nastavení hmotnosti a kolize hráče

  
  this.player.setFixedRotation();
  this.player.setFriction(0);
        // Získání šířky a výšky mapy v pixelech
var mapWidth = map.widthInPixels;
var mapHeight = map.heightInPixels;

// Nastavte hranice kamery na velikost mapy
this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.startFollow(this.player, true);
    }
    
    update (time, delta)
    {
        //this.player.body.angle = 0;
        //this.controls.update(delta);
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-2);
          } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(2);
          } else {
            this.player.setVelocityX(0);
          }
          if (this.cursors.up.isDown) {
            this.player.setVelocityY(-2);
          } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(2);
          } else {
            this.player.setVelocityY(0);
          }
          
    }

}