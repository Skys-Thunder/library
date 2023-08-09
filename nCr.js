function nCr(n,r){
    let [a,b] = [1,1];
    for(let c=0;c<r;c++) a*=n-c,b*=c+1;
    return a/b;
}
