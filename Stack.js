function Stack(){
    this.data=new Array();
    let setting=Stack.prototype;
    setting.push=(x)=>this.data.push(x);
    setting.pop=()=>this.data.pop();
    setting.top=()=>this.data[this.data.length-1];
    setting.size=()=>this.data.length;
    setting.empty=()=>this.data.length==0;
}
