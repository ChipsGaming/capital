module.exports = class{
  constructor(name){
    this.name = name;
    this.money = 100.0;
    this.resources = 0.0;
    this.products = 0.0;
    this.workers = 0.0;
  }

  update(delta, k){
    if(this.resources > 0.0){
      let volume = this.workers * 0.1 * k;
      if(volume > this.resources){
        volume = this.resources;
      }

      this.resources -= volume;
      this.products += volume;
    }
  }
};
