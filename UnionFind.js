class UnionFind {
    constructor(n){
        this.parent=new Array(n).fill(-1);
        this.leng=new Array(n).fill(1);
    }
    issame(x,y){
        return this.root(x)==this.root(y);
    }
    merge(x,y){
        if(this.issame(x,y)) return;
        let roots=[this.root(x),this.root(y)];
        if(this.leng[roots[0]]>this.leng[roots[1]]) roots.reverse();
        this.parent[roots[0]]=roots[1],this.leng[roots[1]]+=roots[0];
    }
    root(x){
        if(this.parent[x]==-1) return x;
        return this.root(this.parent[x]);
    }
}
