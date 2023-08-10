function isprime(x){
    for(let c=2;c*c<=x;c++) if(x%c==0) return false;
    return true;
}
