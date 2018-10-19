const Message = require('../Message');

module.exports = (message, routeMatch) => {
  const player = message.context.player,
    world = message.context.loop.world;

  world.layOffWorkers(player, parseFloat(routeMatch.volume));

  (new Message)
    .str('Работники уволены').nl()
    .reply(message);
};
