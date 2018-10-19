const Message = require('../Message');

module.exports = (message, routeMatch) => {
  const bank = message.context.loop.world.bank,
    player = message.context.player;

  (new Message)
    .str(`Ставка: ${bank.rate}`).nl()
    .str(`Задолженность: ${bank.getDebtor(player).volume}`).nl()
    .reply(message);
};
