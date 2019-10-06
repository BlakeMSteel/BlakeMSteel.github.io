import Tile from './tile';
import { displayHeight, displayWidth, mapType, wallColor, wallTile } from './settings';

class Map {
    private _map: Array<Array<Tile>>;
    private _draw: (x: number, y: number, character: string, color?: string, backgroundColor?: string) => void;

    constructor(
        width: number,
        height: number,
        draw: (
            x: number,
            y: number,
            character: string,
            color?: string,
            backgroundColor?: string
        ) => void
    ) {
        this._map = this.create2DArrayOfTiles(width, height);
        this._draw = draw;
    }

    private create2DArrayOfTiles(width, height) {
        let array = new Array<Array<Tile>>(width);
        
        for (let i = 0; i < width; i++) {
            array[i] = new Array<Tile>(height);
        }

        return array;
    }

    public drawMap() {
        for (let x = 0; x < this._map.length; x++) {
            for (let y = 0; x < this._map[x].length; y++) {
                this.drawTile(x, y);
            }
        }
    }

    public drawTile(x, y) {
        const { character, color } = this._map[x][y].getDisplayedTile();
        this._draw(x, y, character, color);
    }

    public generateMap( type: string = mapType.ARENA ) {
        var mapper = null;
        switch(type) {
            case mapType.ARENA:
                mapper = new ROT.Map.Arena(displayWidth, displayHeight);
                break;
            case mapType.CELLULAR:
                mapper = new ROT.Map.Cellular(
                    displayWidth,
                    displayHeight, 
                    { 
                        connected: true, 
                        born: [4, 5, 6, 7, 8],
                        survive: [2, 3, 4, 5, 6],
                    }
                );
                mapper.randomize(0.25);
                break;
            case mapType.DUNGEON_DIGGER:
                mapper = new ROT.Map.Digger(
                    displayWidth,
                    displayHeight,
                    {
                        corridorLength: [2,5],
                        dugPercentage: 0.8,
                        roomHeight: [4, 8],
                        roomWidth: [4, 8],
                    }
                );
                break;
            case mapType.DUNGEON_ROGUE:
                mapper = new ROT.Map.Rogue(displayWidth, displayHeight);
                break;
            case mapType.DUNGEON_UNIFORM:
                mapper = new ROT.Map.Uniform(
                    displayWidth,
                    displayHeight,
                    {
                        roomDugPercentage: 0.5,
                        roomHeight: [4, 12],
                        roomWidth: [4, 12],
                    }
                );
                break;
            case mapType.MAZE_DIVIDED:
                mapper = new ROT.Map.DividedMaze(displayWidth, displayHeight);
                break;
            case mapType.MAZE_ELLER:
                mapper = new ROT.Map.EllerMaze(displayWidth, displayHeight);
                break;
            case mapType.MAZE_ICEY:
                mapper = new ROT.Map.IceyMaze(displayWidth, displayHeight);
                break;
            default:
                mapper = new ROT.Map.Arena(displayWidth, displayHeight);
                break;
        }
        var wallTiles = []
        var freeCells = [];

        var mapperCallback = function(x, y, value) {
            //value = 1 -> wall
            //value = 0 -> empty space
            var key = x + "," + y;
            if (value) {
                wallTiles.push(key);
                this.map[key] = new Tile(x, y, wallTile, wallColor, null, null, true, Game);
            } else {
                freeCells.push(key);
                this.map[key] = new Tile(x, y, null, null, null, null, false, Game);
            }
        }

        mapper.create(mapperCallback.bind(this));
        if (type === mapType.CELLULAR) {
            for (var i = 0; i < 40; i++) {
                mapper.create();
            }
            mapper.create(mapperCallback.bind(this));
            mapper.connect(this.display.DEBUG, 1);
        }
        this._generateBoxes(freeCells);

        this._drawWholeMap();
        this.player = this._createBeing(Player, freeCells);
        this.entities.push(this._createBeing(Pirate, freeCells));
        this.entities.push(this._createBeing(Pirate, freeCells));
        this.entities.push(this._createBeing(Pirate, freeCells));
        this.entities.push(this._createBeing(Pirate, freeCells));
    }
}