import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return[ {
                id: 'step-one',
                title: 'Allow the less experienced player to go first.',
                image: 'https://via.placeholder.com/150',
                description: 'Hearts always goes first in Popthello, and the less experienced player should take this color. If the players are equal in skill level, then you may flip a coin to see who gets to be hearts, or allow the player who lost the last game to be hearts.'
            }, {
                id: 'step-two',
                title: 'Place the first disc in a spot that surrounds an opponent’s disc.',
                image: 'https://via.placeholder.com/150',
                description: 'This is also known as “outflanking” in Popthello. A “row” consists of one or more discs that form a line horizontally, vertically, or diagonally.'
            }, {
                id: 'step-three',
                title: 'Flip the outflanked disc to its opposite side.',
                image: 'https://via.placeholder.com/150',
                description: 'Once a disc is outflanked, flip it over to the opposite color. This disc now belongs to you as long as it remains flipped on that side. However, the same disc may be turned over again if it is part of a row that is outflanked.'
            }, {
                id: 'step-four',
                title: 'Pass the turn to your opponent to continue playing.',
                image: 'https://via.placeholder.com/150',
                description: 'Your opponent’s goal is also to place a disc in a spot that outflanks at least 1 of the first player’s discs. If the second player plays the card discs, they would place 1 of their discs at the end of a row. Your opponent should place their card disc so that a heart disc is framed by 2 card discs on each side. Then, make sure your opponent flips the outflanked black disks to cards.'
            }, {
                id: 'step-five',
                title: 'Have fun!',
                image: 'https://via.placeholder.com/150',
                description: 'Enjoy your game of Popthello and make sure to finish for a fun suprise.'
            }
        ]
    }
});
