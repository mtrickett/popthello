import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return[ {
                id: 'step-one',
                title: 'Step One',
                image: 'https://via.placeholder.com/150',
                description: 'This is how you do the first step.'
            }, {
                id: 'step-two',
                title: 'Step Two',
                image: 'https://via.placeholder.com/150',
                description: 'This is how you do the second step.'
            }, {
                id: 'step-three',
                title: 'Step Three',
                image: 'https://via.placeholder.com/150',
                description: 'This is how you do the third step.'
            }
        ]
    }
});
