import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';
import EmberArray from '@ember/array';

export default Component.extend({
    playerOne: 'hearts',
    playerTwo: 'cards',
    playerNone: '',

    currentPlayer: null,
    winningPlayer: null,

    playerOneScore: 0,
    playerTwoScore: 0,

    board: [],
    gameStarted: false,
    gameOver: false,

    init: function () {
        //override default
        this._super(...arguments);

        //draw the board
        this.initBoard();
    },

    initBoard: function () {
        var b = [],
            p = '',
            id = 0;

        // setup initial board state
        for (var r = 1; r < 9; ++r) {
            for (var c = 1; c < 9; ++c) {

                if (r === 4 && c === 4 || r === 5 && c === 5) {
                    p = this.get('playerOne');
                } else if (r === 4 && c === 5 || r === 5 && c === 4) {
                    p = this.get('playerTwo');
                } else {
                    p = '';
                }

                b.push({
                    id: id++,
                    row: r,
                    column: c,
                    player: p
                });
            }
        }

        //set board array of spaces
        this.set('board', b);
    },

    drawBoard: function (updatedBoard) {
        this.set('board', updatedBoard);
        this.isGameOver();
    },

    isGameOver: function() {
        var board = this.get('board');

        function isFull(space) {
          return space.player !== '';
        }

        if (board.every(isFull)) {
            var winner = this.get('playerOneScore') > this.get('playerTwoScore') ? this.get('playerOne') : this.get('playerTwo');
            this.set('gameOver', true);
            this.set('winningPlayer', winner);
        }
    },

    checkSpot: function (clickedSpot, obj) {
        var rowClicked = clickedSpot.row,
            columnClicked = clickedSpot.column,
            clickArea = [];

        //check that the clicked space can be chosen
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                var row = rowClicked + j,
                    column = columnClicked + i,
                    selector = '#' + 'r' + row + '_c' + column + ' > div',
                    spots = {
                        'row': row,
                        'column': column
                    };

                // remove jquery
                if ($(selector).hasClass(this.get('playerOne')) || $(selector).hasClass(this.get('playerTwo'))) {
                    return true;
                }
            }
        }

    },

    flipPieces: function (clickedSpot, player, obj) {
        var obj = obj;
        for (var i = 0; i < obj.length; i++) {
            for (var j = 0; j < 9; j++) {
                if ((clickedSpot.row === obj[i].row) && obj[i].player !== '' || (clickedSpot.column === obj[i].column && obj[i].player !== '')) {
                    Ember.set(obj[i], 'player', player);
                }
            }
        }
        this.set('board', obj);

        // var piecesToFlip = [];

        // for (var y = -1; y <= 1; y++) {
        //     for (var x = -1; x <= 1; x++) {
        //         var rowClicked = clickedSpot.row,
        //             columnClicked = clickedSpot.column;
        //         while (true) {
        //             if (y == 0 && x == 0) {
        //                 break;
        //             }
        //             var row = rowClicked + y,
        //                 column = columnClicked + x,
        //                 spots = '#' + 'r' + row + '_c' + column + ' > div',
        //                 p1 = this.get('playerOne'),
        //                 p2 = this.get('playerTwo'),
        //                 rival = player === p1 ? p2 : p1;

        //             if ($(spots).hasClass(p1) || $(spots).hasClass(p2)) {
        //                 if ($(spots).hasClass(player)) {
        //                     if (piecesToFlip.length > 0) {
        //                         for (var a = 0; a < piecesToFlip.length; a++) {
        //                             $(piecesToFlip[a]).removeClass(rival);
        //                             $(piecesToFlip[a]).addClass(player);

        //                             if ($(spot).hasClass(p1)) {
        //                                 //points here
        //                             }

        //                             if ($(spot).hasClass(p2)) {
        //                                 //points here
        //                             }
        //                         }
        //                         piecesToFlip = [];
        //                     }
        //                 } else if (($(spot).hasClass(p2) || $(spot).hasClass(p1)) && $(spot).hasClass(rival)) {
        //                 coinToChange.push(cordsXY);

        //                 } else {
        //                     piecesToFlip = [];
        //                     break;
        //                 }
        //             }
        //         }
        //     }
        // }
    },

    updateScore: function () {
        var obj = this.get('board'),
            points = [];

        var p1Points = obj.filter(function(element) {
            return element.player === 'hearts';
        });

        var p2Points = obj.filter(function(element) {
            return element.player === 'cards';
        });

        this.set('playerOneScore', p1Points.length);
        this.set('playerTwoScore', p2Points.length);
    },

    actions: {
        startGame: function () {
            this.set('gameStarted', true);
            this.initBoard();

            //hearts goes first
            this.set('currentPlayer', this.get('playerOne'));
        },
        resetGame: function () {
            this.set('gameStarted', false);
            this.initBoard();
            this.set('playerOneScore', 0);
            this.set('playerTwoScore', 0);
        },
        cellClicked: function (spot) {
            var spotId = spot.id,
                obj = this.get('board'),
                clickedSpot = obj[spotId],
                player = this.get('currentPlayer'),
                p1 = this.get('playerOne'),
                p2 = this.get('playerTwo');

            if (clickedSpot.player === '') {
                if (player === p1) {
                    if (this.checkSpot(clickedSpot)) {
                        Ember.set(clickedSpot, 'player', player);
                        this.flipPieces(clickedSpot, player, obj);
                        this.set('currentPlayer', p2);
                    }
                } else if (player === p2) {
                    if (this.checkSpot(clickedSpot)) {
                        Ember.set(clickedSpot, 'player', player);
                        this.flipPieces(clickedSpot, player, obj);
                        this.set('currentPlayer', p1);
                    }
                }
            }

            this.updateScore();
            this.drawBoard(obj);
        }
    }
});
