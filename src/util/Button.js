export class Button {
    constructor(title, color, link, row, position, size) {
        this._title = title;
        this._color = color;
        this._size = size;
        this._row = row;
        this._position = position;
        this._link = link;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = value;
    }

    get row() {
        return this._row;
    }

    set row(value) {
        this._row = value;
    }

    get position() {
        return this._position;
    }

    set position(value) {
        this._position = value;
    }

    get link() {
        return this._link;
    }

    set link(value) {
        this._link = value;
    }
}