const cliArgsParser = require('command-line-args'),
  Api = require('./Api/Api'),
  Loop = require('./Game/Loop'),
  World = require('./Game/World');

const context = cliArgsParser([
  {name: 'token', alias: 't', type: String},
  {name: 'password', alias: 'p', type: String},
  {name: 'simulation', alias: 's', type: Number, defaultValue: 500},
]);

context.loop = new Loop(new World);
context.api = new Api(context);
context.api.initRouter();

context.loop.start(context.simulation);
context.api.run(context.token);
