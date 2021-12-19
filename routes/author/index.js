import { authors } from '../../data/index.js';

const AuthorSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
    },
};

export default async function (fastify, opts) {
    fastify.get(
        '/',
        {
            schema: {
                response: {
                    default: {
                        type: 'array',
                        items: AuthorSchema,
                    },
                },
            },
        },
        async function (request, reply) {
            reply.send(authors);
        },
    );
}
