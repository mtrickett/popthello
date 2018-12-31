import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';

export default Component.extend({
    playerOne: 1,
    playerTwo: -1,
    playerNone: 0,
    maxRow: 8,
    maxCol: 8,

    currentPlayer: computed(function(){
        return this.playerOne ? 1 : -1;
    }),

    currentPlayerName: computed('playerOne', 'playerTwo', function(){
        return this.playerOne ? 'hearts' : 'cards';
    }),

    utils: {
        cellIdForRowAndCol: function (r, c) {
            return "r" + r + "_c" + c;
        },
        rowAndColForCellId: function (cellId) {
            var coords = cellId.split('_');
            coords[0] = parseInt(coords[0].substr(1, coords[0].length));
            coords[1] = parseInt(coords[1].substr(1, coords[1].length));
            return coords;
        }
        // cellContentsForPlayer: function (player) {
        //     if (player === this.playerOne) {
        //         return '<div class="piece hearts"></div>';
        //     } else if (player === this.playerTwo) {
        //         return '<div class="piece cards"></div>';
        //     }
        //     return '';
        // }
    },

    init: function () {
        var t_row,
            r,
            c,
            cellInitialized;

        this._super(...arguments);
        this.board = [];

        //setup initial board state
        //    - all empty, except middle 4 sqares which are alternating colors
        //        ( i.e. [3,3] = red, [3,4] = blue, [4,3] = red, [4,4] = blue )
        for (r = 0; r < this.maxRow; r += 1) {
            t_row = []
            for (c = 0; c < this.maxCol; c += 1) {
                cellInitialized = false;
                if (r === 3) {
                    if (c === 3) {
                        t_row.push(this.playerOne);
                        cellInitialized = true;
                    } else if (c === 4) {
                        t_row.push(this.playerTwo);
                        cellInitialized = true;
                    }
                } else if (r === 4) {
                    if (c === 3) {
                        t_row.push(this.playerTwo);
                        cellInitialized = true;
                    } else if (c === 4) {
                        t_row.push(this.playerOne);
                        cellInitialized = true;
                    }
                }
                if (!cellInitialized) {
                    t_row.push(this.playerNone);
                }
            }
            this.board.push(t_row);
        }

        //setup click handlers
        // $('.cell').on('click', this.cellClicked.bind(this));

        //red goes first
        // this.currentPlayer = this.playerOne;

        this.drawBoard();

        return this;
    },

    drawBoard: function () {
        var t_row,
            t_col,
            r,
            c,
            cellId,

        currPlayer = this.currentPlayer;

        //draw all pieces on the board
        // for (r = 0; r < this.maxRow; r += 1) {
        //     t_row = this.board[r];
        //     for (c = 0; c < this.maxCol; c += 1) {
        //         cellId = '#' + this.utils.cellIdForRowAndCol(r, c);
        //         $(cellId).empty()
        //             .html(this.utils.cellContentsForPlayer(this.board[r][c]));
        //     }
        // }

        //show current player
        // $('#currentPlayer')
        //     .removeClass('blue').removeClass('red')
        //     .addClass(currPlayer)
        //     .text(currPlayer.toUpperCase());
        return this;
    },

    doTurn: function (row, column) {
            //Implement the correct rules
            this.board[row][column] = this.currentPlayer;

            this.set ('currentPlayer', this.currentPlayer *= -1);
            this.drawBoard();
        },

    actions: {
        cellClicked: function (e) {
            var cellId = e.currentTarget.id,
                coords = this.utils.rowAndColForCellId(cellId);

            this.doTurn(coords[0], coords[1]);
        }
    }
});
