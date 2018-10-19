module.exports = class{
  constructor(){
    this.cost = 10.0;
  }

  update(delta, k){
  }

  getPrice(volume){
    return this.cost * volume;
  }
};
