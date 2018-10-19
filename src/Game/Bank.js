module.exports = class{
  constructor(){
    this.rate = 0.2;
    this.borrowers = new Map;
  }

  update(delta, k){
    Array.from(this.borrowers.values()).forEach(borrower => {
      borrower.player.money -= borrower.volume * this.rate * k;
    });
  }

  getDebtor(player){
    if(!this.borrowers.has(player.id)){
      this.borrowers.set(player.id, {
        player: player,
        volume: 0
      });
    }

    return this.borrowers.get(player.id);
  }

  takeLoan(player, volume){
    const debtor = this.getDebtor(player);
    debtor.volume += volume;
  }

  repayLoan(player, volume){
    const debtor = this.getDebtor(player);
    if(volume > debtor.volume){
      volume = debtor.volume;
    }

    debtor.volume -= volume;
  }
};
