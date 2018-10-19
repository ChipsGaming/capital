const Player = require('./Player/Player'),
  Supplier = require('./Supplier'),
  Consumer = require('./Consumer'),
  LaborExchange = require('./LaborExchange'),
  Bank = require('./Bank');

module.exports = class{
  constructor(){
    this.players = new Map;
    this.supplier = new Supplier;
    this.consumer = new Consumer;
    this.laborExchange = new LaborExchange;
    this.bank = new Bank;
  }

  update(delta, k){
    this.supplier.update(delta, k);
    this.consumer.update(delta, k);
    this.laborExchange.update(delta, k);
    this.bank.update(delta, k);
    Array.from(this.players.values()).forEach(p => p.update(delta, k));
  }

  hasPlayer(id){
    return this.players.has(id);
  }

  getPlayer(id){
    if(!this.hasPlayer(id)){
      return null;
    }

    return this.players.get(id);
  }

  addPlayer(client){
    let player = this.getPlayer(client.id);
    if(player !== null){
      return player;
    }

    player = new Player(client.username);
    this.players.set(client.id, player);

    return player;
  }

  buyResources(player, volume){
    const price = this.supplier.getPrice(volume);
    if(player.money < price){
      throw new Error('Недостаточно денег');
    }

    player.resources += volume;
    player.money -= price;

    return price;
  }

  hireWorkers(player, volume){
    const price = this.laborExchange.getPrice(volume);
    if(player.money < price){
      throw new Error('Недостаточно денег');
    }

    player.workers += volume;
    player.money -= price;

    return price;
  }

  layOffWorkers(player, volume){
    if(player.workers < volume){
      volume = player.workers;
    }

    player.workers -= volume;
  }

  sellProducts(player, volume){
    if(player.products < volume){
      throw new Error('Недостаточно продукции');
    }

    const price = this.consumer.getPrice(volume);
    player.money += price;
    player.products -= volume;

    return price;
  }

  takeLoan(player, volume){
    this.bank.takeLoan(player, volume);
    player.money += volume;
  }

  repayLoan(player, volume){
    if(player.money < volume){
      throw new Error('Недостаточно денег');
    }

    this.bank.repayLoan(player, volume);
    player.money -= volume;
  }
};
