function isprime(x){
    if(x<2) return false; 
    for(let c=2;c*c<=x;c++) if(x%c==0) return false;
    return true;
}
