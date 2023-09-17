function Queue(){
    this.data=new Array();
    this.head=0;
    let setting=Queue.prototype;
    setting.push=(x)=>this.data.push(x);
    setting.pop=()=>this.head++;
    setting.front=()=>this.data[this.head];
    setting.size=()=>this.data.length-this.head;
    setting.empty=()=>this.data.length-this.head==0;
}
