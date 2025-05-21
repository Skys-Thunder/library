class UnionFind{
    constructor(n){
        this.n=n;
        this.parent=new Array(n).fill(-1);
        this.member=[...Array(n)].map(()=>new Set());
    }
    issame(a,b){ 
        return this.root(a)==this.root(b);
    }
    merge(a,b){
        if(this.issame(a,b)) return;
        let [x,y]=[this.root(a),this.root(b)];
        if(-this.parent[x]>-this.parent[y]) [x,y]=[y,x];
        this.parent[y]+=this.parent[x],this.parent[x]=y;
    }
    root(a){
        if(this.parent[a]<0) return a;
        return this.parent[a]=this.root(this.parent[a]);
    }
    size(a){
        return -this.parent[this.root(a)];
    }
    group(){
        let res=[];
        for(let v=0;v<this.n;v++) this.member[this.root(v)].add(v);
        this.member.filter(n=>n.size!=0).map(z=>res.push([...z]));
        return res;
    }
}
