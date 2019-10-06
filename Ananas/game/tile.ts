import { floorTile, boxColor } from './settings.js';

class Tile {
    private _x: number;
    private _y: number;
    private _collideable: {
        character: string,
        color: string,
        immoveable: boolean
    }
    private _floor: {
        character: string,
        color: string
    }
    constructor(x, y, collideableCharacter, collideableColor, floorCharacter, floorColor, immoveable) {
        this._x = x;
        this._y = y;
        this._collideable = {
            character: collideableCharacter,
            color: collideableColor,
            immoveable
        }
        this._floor = {
            character: floorCharacter,
            color: floorColor
        }
    }

    private checkNulls() {
        if (!this._collideable || !this._collideable.character) {
            this._collideable = null;
        }
        if (!this._floor || !this._floor.character) {
            this._floor = null;
        }
    }

    public checkCollideable(collideableCharacter: string) {
        return !!this._collideable && (this._collideable.character === collideableCharacter);
    }

    public checkFloor(floorCharacter: string) {
        return !!this._floor && (this._floor.character === floorCharacter);
    }

    public getDisplayedTile() {
        if (this._collideable) {
            return {
                character: this._collideable.character,
                color: this._collideable.color
            }
        } else if (this._floor) {
            return {
                character: this._floor.character,
                color: this._floor.color
            }
        } else {
            return {
                character: floorTile,
                color: undefined
            }
        }
    }

    public isCollideable() {
        return !!this._collideable;
    }

    public isImmoveable() {
        return !!this._collideable && this._collideable.immoveable;
    }

    public removeCollideable() {
        this._collideable = null;
    }

    public removeFloor() {
        this._floor = null;
    }

    public setCollideable(
        collideableCharacter: string,
        collideableColor: string,
        immoveable: boolean
        ) {
        this._collideable = {
            character: collideableCharacter,
            color: collideableColor,
            immoveable
        }
        this.checkNulls();
    }

    public setFloor(
        floorCharacter: string,
        floorColor: string
        ) {
        this._floor = {
            character: floorCharacter,
            color: floorColor
        }
        this.checkNulls();
    }
}

export default Tile;