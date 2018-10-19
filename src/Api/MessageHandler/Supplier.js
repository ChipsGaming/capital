const Message = require('../Message');

module.exports = (message, routeMatch) => {
  const supplier = message.context.loop.world.supplier;

  (new Message)
    .str(`Стоимость: ${supplier.cost}`).nl()
    .reply(message);
};
