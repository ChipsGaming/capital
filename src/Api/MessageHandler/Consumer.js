const Message = require('../Message');

module.exports = (message, routeMatch) => {
  const consumer = message.context.loop.world.consumer;

  (new Message)
    .str(`Цены: ${consumer.price}`).nl()
    .reply(message);
};
