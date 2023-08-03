function Queue(){
    this.data=new Array();
    let setting=Queue.prototype;
    setting.push=(x)=>this.data.push(x);
    setting.pop=(x)=>this.data.shift(x);
    setting.front=(x)=>this.data[0];
    setting.size=(x)=>this.data.length;
    setting.empty=(x)=>this.data.length==0;
}
