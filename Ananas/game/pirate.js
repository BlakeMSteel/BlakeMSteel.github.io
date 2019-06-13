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
        return (x + "," + y in this.Game.map);
    }
    var astar = new ROT.Path.AStar(x, y, passableCallback, {topology:8});

    var path = [];
    var pathCallback = function(x, y) {
        path.push([x, y]);
    }
    astar.compute(this._x, this._y, pathCallback);

    path.shift(); // Remove current position
    if (path.length == 0) {
        this.Game.removeBeing(this);
    } else if (path.length == 1) {
        this.Game.engine.lock();
        alert("Game over - you were captured by the Pirate!");
    } else {
        x = path[0][0];
        y = path[0][1];
        this.Game.display.draw(this._x, this._y, this.Game.map[this._x + "," + this._y]);
        this._x = x;
        this._y = y;
        this._draw();
    }
}

Pirate.prototype._draw = function() {
    this.Game.display.draw(this._x, this._y, "P", "red");
}

export default Pirate;