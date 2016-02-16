'use strict';

const Bcrypt = require ('bcrypt');
const Good   = require ('good');
const Hapi   = require ('hapi');
const Basic  = require ('hapi-auth-basic');


const server = new Hapi.Server();
server.connection({ port: 8080 });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('hello, world!');
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
});

server.register(require('inert'), (err) => {
  if (err) throw err;

  server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {
      reply.file('./public/hello.html');
    }
  });
});

server.register({
  register: Good,
  options: {
    reporters : [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
}, (err) => {
  if (err) throw err; //something bad happend loading the plugin

  server.start(() => {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});


/*
TODO
  Sign In Authentication: 
    http://hapijs.com/tutorials/auth

  Plugins
    http://hapijs.com/tutorials/plugins

  Middleware
    http://hapijs.com/api#serverextevent-method-options
*/
