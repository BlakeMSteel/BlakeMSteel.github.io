import Player from './player.js';
import Pirate from './pirate.js';

var Game = {
    display: null,

    init: function() {
        this.display = new ROT.Display();
        document.body.appendChild(this.display.getContainer());
        this._generateMap();
        this.scheduler = new ROT.Scheduler.Simple();
        this.scheduler.add(this.player, true);
        for (var index in this.entities) {
            this.scheduler.add(this.entities[index], true);
        }
        this.engine = new ROT.Engine(this.scheduler);
        this.engine.start();
    },
}

Game.map = {};
Game.player = null;
Game.entities = new Array();
Game.scheduler = null;
Game.engine = null;
Game.ananas = null;

Game._generateMap = function() {
    var digger = new ROT.Map.Digger();
    var freeCells = [];

    var digCallback = function(x, y, value) {
        if (value) { return; }
        
        var key = x + "," + y;
        freeCells.push(key);
        this.map[key] = ".";
    }

    digger.create(digCallback.bind(this));
    this._generateBoxes(freeCells);

    this._drawWholeMap();
    this.player = this._createBeing(Player, freeCells);
    this.entities.push(this._createBeing(Pirate, freeCells));
    this.entities.push(this._createBeing(Pirate, freeCells));
    this.entities.push(this._createBeing(Pirate, freeCells));
    this.entities.push(this._createBeing(Pirate, freeCells));
}

Game._drawWholeMap = function() {
    for (var key in this.map) {
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);

        this.display.draw(x, y, this.map[key]);
    }
}

Game._generateBoxes = function(freeCells) {
    for (var i = 0; i < 10; i++) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        this.map[key] = "*";
        if (i === 0) {
            this.ananas = key;
        }
    }
}

Game._createBeing = function(what, freeCells) {
    var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    var key = freeCells.splice(index, 1)[0];
    var parts = key.split(",");
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    return new what(x, y, this);
}

Game.removeBeing = function(entity) {
    this.scheduler.remove(entity);
    var index = this.entities.indexOf(entity);
    this.entities.splice(index, 1);
}

Game.init();