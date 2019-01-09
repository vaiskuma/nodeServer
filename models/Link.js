const { Model } = require('objection');

class Link extends Model {
    static get tableName() {
        return "links";
    }
    static get jsonSchema() {
        return {
            type: 'object',
            
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                link: { type: 'string' },
                tag: { type: 'string'},
                vote: { type: 'integer'}
            }
        }
    }
}
module.exports = Link;