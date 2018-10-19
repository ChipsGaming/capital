const Discord = require('discord.js'),
  Api = require('./');

module.exports = class{
  constructor(context){
    this.context = context;
    this.router = null;
  }

  initRouter(){
    this.router = new Api.OrRouter([
      new (require('./MessageHandler/Register')),

      new Api.RegexRouter(/^\$ping$/i, [], {handler: message => message.reply('pong')}),
      new Api.RegexRouter(/^\$$/i, [], {handler: require('./MessageHandler/Self')}),
      new Api.RegexRouter(/^\$поставщики$/i, [], {handler: require('./MessageHandler/Supplier')}),
      new Api.RegexRouter(/^\$купить ([0-9]+)$/i, ['volume'], {handler: require('./MessageHandler/Buy')}),
      new Api.RegexRouter(/^\$биржа труда$/i, [], {handler: require('./MessageHandler/LaborExchange')}),
      new Api.RegexRouter(/^\$нанять ([0-9]+)$/i, ['volume'], {handler: require('./MessageHandler/Hire')}),
      new Api.RegexRouter(/^\$уволить ([0-9]+)$/i, ['volume'], {handler: require('./MessageHandler/LayOff')}),
      new Api.RegexRouter(/^\$покупатели$/i, [], {handler: require('./MessageHandler/Consumer')}),
      new Api.RegexRouter(/^\$продать ([0-9]+)$/i, ['volume'], {handler: require('./MessageHandler/Sell')}),
      new Api.RegexRouter(/^\$банк$/i, [], {handler: require('./MessageHandler/Bank')}),
      new Api.RegexRouter(/^\$занять ([0-9]+)$/i, ['volume'], {handler: require('./MessageHandler/TakeLoan')}),
      new Api.RegexRouter(/^\$вернуть ([0-9]+)$/i, ['volume'], {handler: require('./MessageHandler/RepayLoan')}),
    ]);
  }

  async run(token){
    this.context.discord = new Discord.Client;

    this.context.discord.on('ready', () => {
      console.log('ready');
    });

    this.context.discord.on('message', (message) => {
      if(message.author.bot){
        return;
      }
      console.log(`${message.author.username}: ${message.content.substr(0, 100)}`);

      message.context = this.context;
      const routeMatch = this.router.route(message);
      if(routeMatch === null){
        return;
      }
      
      routeMatch.handler(message, routeMatch);
    });

    this.context.discord.login(token);
  }
};
