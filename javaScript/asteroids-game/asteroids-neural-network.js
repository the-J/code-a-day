'use-strict';

/**
 * MATRIX FUNCTIONS
 */

class Matrix {
    constructor( rows, columns, data = [] ) {
        this._rows = rows;
        this._columns = columns;
        this._data = data;

        // initialize with zeros if no data
        if (data === null || data.length === 0) {
            this._data = [];

            for (let i = 0; i < this._rows; i++) {
                this._data[ i ] = [];
                for (let j = 0; j < this._columns; j++) {
                    this._data[ i ][ j ] = 0;
                }
            }
        }
        else {
            // check data integrity
            if (data.length !== rows || data[ 0 ].length !== columns) {
                throw new Error(' Not enough data dimensions');
            }
        }
    }

    get rows() {
        return this._rows;
    }

    get columns() {
        return this._columns;
    }

    get data() {
        return this._data;
    }
}
