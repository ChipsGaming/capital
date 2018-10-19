const Message = require('../Message');

module.exports = (message, routeMatch) => {
  const laborExchange = message.context.loop.world.laborExchange;

  (new Message)
    .str(`Уровень зарплаты (в месяц): ${laborExchange.salary}`).nl()
    .reply(message);
};
