import autoLoad from 'fastify-autoload';
import cors from 'fastify-cors';
import swagger from 'fastify-swagger';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function (fastify, opts) {
    fastify.register(cors);

    fastify.register(swagger, {
        exposeRoute: true,
        routePrefix: '/docs',
        swagger: {
            info: { title: 'API' },
        },
    });

    fastify.register(autoLoad, {
        dir: join(__dirname, 'routes'),
        options: { prefix: '/api' },
    });
}
