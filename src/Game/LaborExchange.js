module.exports = class{
  constructor(){
    this.salary = 20.0;
  }

  update(delta, k){
  }

  getPrice(volume){
    return this.salary * volume;
  }
};
