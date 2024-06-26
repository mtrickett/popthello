import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return[ {
                id: 'step-one',
                number: '➊ ',
                title: 'Allow the less experienced player to go first.',
                image: '/assets/img/first-player.mov',
                description: 'Hearts always goes first in Popthello, and the less experienced player should take this color. If the players are equal in skill level, then you may flip a coin to see who gets to be hearts, or allow the player who lost the last game to be hearts.'
            }, {
                id: 'step-two',
                number: '➋ ',
                title: 'Place the first disc in a spot that surrounds an opponent’s disc.',
                image: '/assets/img/outflank.mov',
                description: 'This is also known as “outflanking” in Popthello. A “row” consists of one or more discs that form a line horizontally, vertically, or diagonally.'
            }, {
                id: 'step-three',
                number: '➌ ',
                title: 'Pass the turn to your opponent to continue playing.',
                image: '/assets/img/next-player.mov',
                description: 'Your opponent’s goal is also to place a disc in a spot that outflanks at least 1 of the first player’s discs. If the second player plays the card discs, they would place 1 of their discs at the end of a row. Your opponent should place their card disc so that a heart disc is framed by 2 card discs on each side. Then, make sure your opponent flips the outflanked black disks to cards.'
            }, {
                id: 'step-five',
                number: '➍ ',
                title: 'Have fun!',
                image: '/assets/img/have-fun.mov',
                description: 'Enjoy your game of Popthello and make sure to finish for a fun suprise.'
            }
        ]
    }
});
