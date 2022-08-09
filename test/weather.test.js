import tap from 'tap'; 
import buildFastify from '../routes/weather';

tap.pass('this is fine')

tap.test('should be ok', async t => {
    /* const result = await weather() */
    console.log('test')
  })

tap.test('GET `/` route', {only: true}, t => {
  t.plan(5)

  const fastify = buildFastify()

  t.teardown(() => fastify.close())

  fastify.listen({ port: 0 }, (err) => {
    t.error(err)

    request({
      method: 'GET',
      url: 'http://localhost:' + fastify.server.address().port
    }, (err, response, body) => {
      t.error(err)
      t.equal(response.statusCode, 200)
      t.equal(response.headers['content-type'], 'application/json; charset=utf-8')
      t.same(response, 'test')
    })
  })
})