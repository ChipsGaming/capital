const Message = require('../Message');

module.exports = (message, routeMatch) => {
  const player = message.context.player,
    world = message.context.loop.world;

  const response = new Message;

  try{
    const price = world.hireWorkers(player, parseFloat(routeMatch.volume));
    response.str(`Нанято ${routeMatch.volume} работников с зарплатой на общую сумму ${price}`).nl();
  }
  catch(e){
    response.str(e.message).nl()
  }

  response.reply(message);
};
