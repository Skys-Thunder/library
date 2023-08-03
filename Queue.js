function Queue(){
    this.data=new Array();
    let setting=Queue.prototype;
    setting.push=(x)=>this.data.push(x);
    setting.pop=()=>this.data.shift();
    setting.front=()=>this.data[0];
    setting.size=()=>this.data.length;
    setting.empty=()=>this.data.length==0;
}
