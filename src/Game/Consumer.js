module.exports = class{
  constructor(){
    this.price = 15.0;
  }

  update(delta, k){
  }

  getPrice(volume){
    return this.price * volume;
  }
};
