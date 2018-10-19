const Message = require('../Message');

module.exports = (message, routeMatch) => {
  const player = message.context.player;

  (new Message)
    .str(`${player.money}$`).nl()
    .str(`${player.resources} -> ${player.workers} -> ${player.products}`).nl()
    .reply(message);
};
