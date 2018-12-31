export default function() {
  this.namespace = '/api';

  this.get('/how-to', function() {
    return {
      data: [{
        type: 'how-to',
        id: 'step-one',
        attributes: {
          title: 'Step One',
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
          description: "This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests."
        }
      }, {
        type: 'how-to',
        id: 'step-two',
        attributes: {
          title: 'Step Two',
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
          description: "This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests."
        }
      }, {
        type: 'how-to',
        id: 'step-three',
        attributes: {
          title: 'Step Three',
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
          description: "This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests."
        }
      }]
    };
  });
}
