import { posts, postsHandler } from '../../data/index.js';

const PostSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        content: { type: 'string' },
        date: { type: 'string' },
        author: { type: 'string' },
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
                        items: PostSchema,
                    },
                },
            },
        },
        async function (request, reply) {
            reply.send(posts);
        },
    );

    fastify.get(
        '/:id',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                    },
                },
                response: {
                    default: PostSchema,
                },
            },
        },
        async function (request, reply) {
            const post = postsHandler.get(request.params.id);

            reply.send(post);
        },
    );

    fastify.post(
        '/',
        {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        content: { type: 'string' },
                    },
                    required: ['title', 'content'],
                },
                response: {
                    default: PostSchema,
                },
            },
        },
        async function (request, reply) {
            const post = postsHandler.add(request.body.title, request.body.content);

            reply.send(post);
        },
    );

    fastify.put(
        '/:id',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                    },
                },
                body: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        content: { type: 'string' },
                    },
                    required: ['title', 'content'],
                },
                response: {
                    default: PostSchema,
                },
            },
        },
        async function (request, reply) {
            const post = postsHandler.update(
                request.params.id,
                request.body.title,
                request.body.content,
            );

            reply.send(post);
        },
    );

    fastify.delete(
        '/:id',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                    },
                },
                response: {
                    default: {
                        type: 'boolean',
                    },
                },
            },
        },
        async function (request, reply) {
            const result = postsHandler.delete(request.params.id);

            reply.send(result);
        },
    );
}
