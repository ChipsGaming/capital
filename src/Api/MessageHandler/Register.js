module.exports = class{
  route(message){
    const context = message.context;
    context.player = context.loop.world.addPlayer(message.author);

    return null;
  }
};
