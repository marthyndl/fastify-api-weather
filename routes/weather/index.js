
import { weatherUrl, weathersHandler } from '../../data/index.js';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const weatherSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        country: { type: 'string' },
    },
};

export default async function (fastify, opts) {
    // GET /city=:id
    fastify.get(
        '/city=:id',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                    },
                },
                response: {
                    default: weatherSchema,
                },
            },
        },
        async (req, res) => {
        
        const weatherId = weathersHandler.get(req.params.id);
        await fetch(weatherUrl+'/data/2.5/forecast?id='+req.params.id+'&APPID=2eb23be457f4409e9d8eada570d32341')
        .then(response => response.json())
        .then(data => {
            const payload = {
                id: req.params.id,
                city: data.city
            };
            res.send(payload);
        })
        .catch(err => {
            console.log(err);
        });
    });

    // GET /allinfo/city=:id
    fastify.get(
        '/allinfo/city=:id',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                    },
                },
                response: {
                    default: weatherSchema,
                },
            },
        },
        async (req, res) => {
        const weatherId = weathersHandler.get(req.params.id);
        await fetch(weatherUrl+'/data/2.5/forecast?id='+req.params.id+'&APPID=2eb23be457f4409e9d8eada570d32341')
        .then(response => response.json())
        .then(data => {
            const payload = {
                id: req.params.id,
                data: data
            };
            res.send(payload);
        })
        .catch(err => {
            console.log(err);
        });
    });

    // GET /weathernow/city=:id
    fastify.get(
        '/weathernow/city=:id',
        {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                    },
                },
                response: {
                    default: weatherSchema,
                },
            },
        },
        async (req, res) => {
        const weatherId = weathersHandler.get(req.params.id);
        await fetch(weatherUrl+'/data/2.5/forecast?id='+req.params.id+'&APPID=2eb23be457f4409e9d8eada570d32341')
        .then(response => response.json())
        .then(data => {
            const payload = {
                id: req.params.id,
                weatherdata: data.list[0],
                city: data.city
            };
            res.send(payload);
        })
        .catch(err => {
            console.log(err);
        });
    });
}