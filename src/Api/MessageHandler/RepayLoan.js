const Message = require('../Message');

module.exports = (message, routeMatch) => {
  const player = message.context.player,
    world = message.context.loop.world;

  const response = new Message;

  try{
    world.repayLoan(player, parseFloat(routeMatch.volume));
    response.str('Успешно').nl();
  }
  catch(e){
    response.str(e.message).nl()
  }


  response.reply(message);
};
