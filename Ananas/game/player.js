import { boxTile, wallTile  } from './settings.js';

var Player = function(x, y, Game) {
    this._x = x;
    this._y = y;
    this.Game = Game;
    this._draw();
}

Player.prototype.act = function() {
    this.Game.engine.lock();
    console.log(this.Game.engine);
    window.addEventListener("keydown", this);
}

Player.prototype.getX = function() { return this._x; }

Player.prototype.getY = function() { return this._y; }

Player.prototype.handleEvent = function(e) {
    var keyMap = {};
    keyMap[38] = 0;
    keyMap[33] = 1;
    keyMap[39] = 2;
    keyMap[34] = 3;
    keyMap[40] = 4;
    keyMap[35] = 5;
    keyMap[37] = 6;
    keyMap[36] = 7;

    var code = e.keyCode;

    if (code == 13 || code == 32) {
        this._checkBox();
        this.Game.engine.unlock();
        return;
    }

    if (!(code in keyMap)) {
        return;
    }

    var diff = ROT.DIRS[8][keyMap[code]];
    var newX = this._x + diff[0];
    var newY = this._y + diff[1];

    var newKey = newX + "," + newY;
    if (this.Game.map[newKey].checkCollideable(wallTile)) {
        return;
    }

    this.Game.map[this._x + "," + this._y].removeCollideable();
    this._x = newX;
    this._y = newY;
    this.Game.map[this._x + "," + this._y].setCollideable("@", "#ff0", false);
    window.removeEventListener("keydown", this);
    this.Game.engine.unlock();
}

Player.prototype._checkBox = function() {
    var key = this._x + "," + this._y;
    if (!this.Game.map[key].checkFloor(boxTile)) {
        alert("There is no box here!");
    } else if (key == this.Game.ananas) {
        alert("Hooray! You found an ananas and won this game.");
    } else {
        this.Game.map[key].removeFloor();
        alert("This box is empty :-(");
    }
}

Player.prototype._draw = function() {
    this.Game.display.draw(this._x, this._y, "@", "#ff0");
}

export default Player;