import autoLoad from '@fastify/autoload';
import swagger from 'fastify-swagger';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fastifyPlugin from 'fastify-plugin';
import NodeCache from 'node-cache';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CACHE_TTL = 15; // 15 seconds to expire

async function cache (fastify, options) {

    const cache = new NodeCache();
  
    cache.on( "expired", function( key, value ){
      console.log('CACHE KEY EXPIRED = ', key);
    });
  
    fastify.addHook('onRequest', async (request, reply) => {
      console.log('Request URL', request.url);
      console.log('Request Method', request.method);
      if("GET" === request.method) {
        const response = cache.get(request.url);
        console.log("Response", response);
        if(response != undefined) {
          console.log('RETURNING FROM CACHE FOR KEY =', request.url, ' VALUE =', response);
          reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(response);
        }
      }
    });
  
    fastify.addHook('onSend', (request, reply, payload, done) => {
      if("GET" === request.method) {
        const response = cache.get(request.url);
        if(response == undefined) {
          console.log('CACHING RESPONSE FOR KEY =', request.url, ' AND VALUE =', payload);
          cache.set(request.url, payload, CACHE_TTL);
        }
      }
      done();
    });
  
  }

export default async function (fastify, opts) {
    // ROUTES
    fastify.register(swagger, {
        exposeRoute: true,
        routePrefix: '/docs',
        swagger: {
            info: { title: 'API OpenWeathermap' },
        },
    });

    fastify.register(autoLoad, {
        dir: join(__dirname, 'routes'),
        options: { prefix: '/api' },
    });

    fastify.register(fastifyPlugin(cache));

    fastify.after(err => err?console.log(err):console.log('Cache plugin is ready.'));

    fastify.ready(err => err?console.log(err):console.log('All plugins are ready'));

    // LISTENER
    fastify.listen(3000, function (err, address) {
        if (err) {
            console.log(err);
            process.exit(1);
        } else {
            console.log('Server is up and running on port 3000...');
        }
    }); 
}
