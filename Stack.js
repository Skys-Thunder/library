function Stack(){
    this.data=new Array();
    let setting=Stack.prototype;
    setting.push=(x)=>this.data.push(x);
    setting.pop=(x)=>this.data.pop(x);
    setting.top=(x)=>this.data[this.data.length-1];
    setting.size=(x)=>this.data.length;
    setting.empty=(x)=>this.data.length==0;
}
