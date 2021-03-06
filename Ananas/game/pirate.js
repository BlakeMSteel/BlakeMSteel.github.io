import { wallTile } from './settings.js';

var Pirate = function(x, y, Game) {
    this._x = x;
    this._y = y;
    this.Game = Game;
    this._draw();
}

Pirate.prototype.act = function() {
    var x = this.Game.player.getX();
    var y = this.Game.player.getY();
    var passableCallback = (x, y) => {
        return !this.Game.map[x + "," + y].isImmoveable();
    }
    var astar = new ROT.Path.AStar(x, y, passableCallback, {topology:4});

    var path = [];
    var pathCallback = function(x, y) {
        path.push([x, y]);
    }
    astar.compute(this._x, this._y, pathCallback);

    path.shift(); // Remove current position
    if (path.length == 0) {
        this.Game.removeBeing(this);
    } else if (path.length == 1) {
        alert("Game over - you were captured by a Pirate!");
        this.Game.engine.lock();
    } else {
        x = path[0][0];
        y = path[0][1];
        this.Game.map[this._x + "," + this._y].removeCollideable();
        this._x = x;
        this._y = y;
        this.Game.map[this._x + "," + this._y].setCollideable("P", "red", false);
    }
}

Pirate.prototype._draw = function() {
    this.Game.display.draw(this._x, this._y, "P", "red");
}

export default Pirate;