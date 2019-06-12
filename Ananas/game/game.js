import Player from './player.js';

var Game = {
    display: null,

    init: function() {
        this.display = new ROT.Display();
        document.body.appendChild(this.display.getContainer());
        this._generateMap();
        var scheduler = new ROT.Scheduler.Simple();
        scheduler.add(this.player, true);
        scheduler.add(this.pirate, true);
        this.engine = new ROT.Engine(scheduler);
        this.engine.start();
    },
}

var Pirate = function(x, y, Game = null) {
    this._x = x;
    this._y = y;
    this._draw();
}

Pirate.prototype.act = function() {
    var x = Game.player.getX();
    var y = Game.player.getY();
    var passableCallback = function(x, y) {
        return (x + "," + y in Game.map);
    }
    var astar = new ROT.Path.AStar(x, y, passableCallback, {topology:4});

    var path = [];
    var pathCallback = function(x, y) {
        path.push([x, y]);
    }
    astar.compute(this._x, this._y, pathCallback);

    path.shift(); // Remove current position
    if (path.length == 1) {
        Game.engine.lock();
        alert("Game over - you were captured by the Pirate!");
    } else {
        x = path[0][0];
        y = path[0][1];
        Game.display.draw(this._x, this._y, Game.map[this._x + "," + this._y]);
        this._x = x;
        this._y = y;
        this._draw();
    }
}

Pirate.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "P", "red");
}

Game.map = {};
Game.player = null;
Game.pirate = null;
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
    this.pirate = this._createBeing(Pirate, freeCells);
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

Game.init();