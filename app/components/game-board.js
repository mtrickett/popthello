import Component from '@ember/component';
import Emberobject, { computed } from '@ember/object';
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
        // override default
        this._super(...arguments);

        // draw the board
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
                    p = this.get('playerNone');
                }

                b.push({
                    id: id++,
                    row: r,
                    column: c,
                    player: p
                });
            }
        }

        this.set('board', b);
    },

    drawBoard: function (updatedBoard) {
        // update the pieces and check if the game is over yet
        this.set('board', updatedBoard);
        this.isGameOver();
    },

    isGameOver: function() {
        var board = this.get('board'),
            empty = this.get('playerNone'),
            winner;

        function isFull(space) {
            return space.player !== empty;
        }

        // when theres no more spaces left its over
        if (board.every(isFull)) {
            winner = this.get('playerOneScore') > this.get('playerTwoScore') ? this.get('playerOne') : this.get('playerTwo');
            this.set('gameOver', true);
            this.set('winningPlayer', winner);
        }
    },

    checkSpot: function (clickedSpot) {
        var rowClicked = clickedSpot.row,
            columnClicked = clickedSpot.column,
            clickArea = [];

        // check that the clicked space can be chosen
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                var row = rowClicked + j,
                    column = columnClicked + i,
                    selector = '#' + 'r' + row + '_c' + column + ' > div';

                if ($(selector).hasClass(this.get('playerOne')) || $(selector).hasClass(this.get('playerTwo'))) {
                    return true;
                }
            }
        }

    },

    flipPieces: function (clickedSpot, player, board) {
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < 9; j++) {
                if ((clickedSpot.row === board[i].row) && board[i].player !== '' && board[i].player !== player) {
                    Ember.set(board[i], 'player', player);
                } else if (clickedSpot.column === board[i].column && board[i].player !== '' && board[i].player !== player) {
                    Ember.set(board[i], 'player', player);
                }
            }
        }

        this.set('board', board);
    },

    updateScore: function () {
        var board = this.get('board'),
            p1 = this.get('playerOne'),
            p2 = this.get('playerTwo');

        var p1Points,
            p2Points;

        // set the points to the number of pieces
        p1Points = board.filter(function(element) {
            return element.player === p1;
        });

        p2Points = board.filter(function(element) {
            return element.player === p2;
        });

        this.set('playerOneScore', p1Points.length);
        this.set('playerTwoScore', p2Points.length);
    },

    actions: {
        startGame: function () {
            this.set('gameStarted', true);
            this.initBoard();

            // player one goes first
            this.set('currentPlayer', this.get('playerOne'));
        },
        resetGame: function () {
            this.set('gameStarted', false);
            this.initBoard();
            this.set('playerOneScore', 0);
            this.set('playerTwoScore', 0);
            this.set('currentPlayer', null);
            this.set('gameOver', false);
        },
        cellClicked: function (spot) {
            var spotId = spot.id,
                board = this.get('board'),
                clickedSpot = board[spotId],
                player = this.get('currentPlayer'),
                p1 = this.get('playerOne'),
                p2 = this.get('playerTwo'),
                p0 = this.get('playerNone');

            // check which player clicked and make the moves
            if (clickedSpot.player === p0) {
                if (player === p1) {
                    if (this.checkSpot(clickedSpot)) {
                        Ember.set(clickedSpot, 'player', player);
                        this.flipPieces(clickedSpot, player, board);
                        this.set('currentPlayer', p2);
                    }
                } else if (player === p2) {
                    if (this.checkSpot(clickedSpot)) {
                        Ember.set(clickedSpot, 'player', player);
                        this.flipPieces(clickedSpot, player, board);
                        this.set('currentPlayer', p1);
                    }
                }
            }

            this.updateScore();
            this.drawBoard(board);
        }
    }
});
