function equal(a,b){
    if(a.length!=b.length) return false;
    for(let c=0;c<a.length;c++){
        if(a[c]!=b[c]) return false;
    }
    return true;
}
