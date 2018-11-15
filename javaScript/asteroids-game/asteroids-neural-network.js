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

    // add two matrices
    static add( m0, m1 ) {
        Matrix.checkDimensions(m0, m1);

        let m = new Matrix(m0.rows, m0.columns);

        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.columns; j++) {
                m.data[ i ][ j ] = m0.data[ i ][ j ] + m1.data[ i ][ j ];
            }
        }

        return m;
    }

    // subtract two matrices
    static subtract( m0, m1 ) {
        Matrix.checkDimensions(m0, m1);

        let m = new Matrix(m0.rows, m0.columns);

        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.columns; j++) {
                m.data[ i ][ j ] = m0.data[ i ][ j ] - m1.data[ i ][ j ];
            }
        }

        return m;
    }

    // multiply two matrices (not the dot product)
    static multiply( m0, m1 ) {
        Matrix.checkDimensions(m0, m1);

        let m = new Matrix(m0.rows, m0.columns);

        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.columns; j++) {
                m.data[ i ][ j ] = m0.data[ i ][ j ] * m1.data[ i ][ j ];
            }
        }

        return m;
    }

    // dot product of two matrices
    static dot( m0, m1 ) {
        if (m0.columns !== m1.rows) {
            throw new Error('Matrices are not "dot" compatible!');
        }

        let m = new Matrix(m0.rows, m1.columns);

        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.columns; j++) {

                let sum = 0;

                for (let k = 0; k < m0.columns; k++) {
                    sum += m0.data[ i ][ k ] * m1.data[ k ][ j ];
                }

                m.data[ i ][ j ] = sum;
            }
        }
        return m;
    }

    // check if matrices have the same dimension
    static checkDimensions( m0, m1 ) {
        if (m0.rows !== m1.rows || m0.columns !== m1.columns) {
            throw new Error('Matrices of diff dim');
        }
    }

    // apply random weights between -1 and 1
    randomWeights() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.data[ i ][ j ] = Math.random() * 2 - 1;
            }
        }
    }
}
