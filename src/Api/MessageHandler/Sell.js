const Message = require('../Message');

module.exports = (message, routeMatch) => {
  const player = message.context.player,
    world = message.context.loop.world;

  const response = new Message;

  try{
    const price = world.sellProducts(player, parseFloat(routeMatch.volume));
    response.str(`Продано ${routeMatch.volume} общей стоимостью ${price}`).nl();
  }
  catch(e){
    response.str(e.message).nl()
  }

  response.reply(message);
};
