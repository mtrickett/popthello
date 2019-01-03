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

    confetti: computed(function () {
        var confetti = [];

        for (var c = 1; c <= 20; c++){
            confetti.push(c);
        }

        return confetti;
    }),

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
        for (var r = 0; r < 8; ++r) {
            for (var c = 0; c < 8; ++c) {

                if (r === 3 && c === 3 || r === 4 && c === 4) {
                    p = this.get('playerOne');
                } else if (r === 3 && c === 4 || r === 4 && c === 3) {
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
            winner = this.get('playerOneScore') > this.get('playerTwoScore') ? this.get('playerOne')
                    : this.get('playerOneScore') < this.get('playerTwoScore') ? this.get('playerTwo')
                    : 'tie';
            this.set('gameOver', true);
            this.set('winningPlayer', winner);
            this.set('currentPlayer', null);
        }
    },

    findCanFlip: function (clickedSpot, player) {
        var spots = [];

        // find all the flippable spots in each direction
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (i !== 0 || j !== 0) {
                    spots.push.apply(spots, this.checkFlipDirection(clickedSpot, player, i, j));
                }
            }
        }

        return spots;
    },

    checkFlipDirection: function (spot, player, row, col) {
        var flipSpots = [],
            board = this.get('board'),
            empty = this.get('playerNone'),
            checkRow = spot.row + row,
            checkCol = spot.column + col,
            checkSpot = checkRow * 8 + checkCol;

        while ((checkRow >= 0 && checkCol >= 0 && checkRow < 8 && checkCol < 8)) {
            if (!board[checkSpot] || board[checkSpot].player === empty) break;

            // add only the opposite players spots
            if (board[checkSpot].player === player) {
                return flipSpots;
            }

            flipSpots.push(board[checkSpot]);
            checkRow += row;
            checkCol += col;
            checkSpot = checkRow * 8 + checkCol;
        }

        // no tiles can be flipped in this direction
        return [];
    },

    flipPieces: function (clickedSpot, player, board) {
        var canFlip = this.findCanFlip(clickedSpot, player),
            empty = this.get('playerNone');

        // if theres nothing to flip then get outta here
        if (!canFlip) {
            return;
        }

        canFlip.forEach(function(spot) {
            if (spot.player !== empty) {
                Ember.set(board[spot.id], 'player', player);
            }
        });
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
                        this.flipPieces(clickedSpot, player, board);
                        Ember.set(clickedSpot, 'player', player);
                        this.set('currentPlayer', p2);
                } else if (player === p2) {
                        this.flipPieces(clickedSpot, player, board);
                        Ember.set(clickedSpot, 'player', player);
                        this.set('currentPlayer', p1);
                }
            }

            this.updateScore();
            this.drawBoard(board);
        }
    }
});
