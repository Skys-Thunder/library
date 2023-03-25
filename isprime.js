function isprime(x){
    cnt=0;
    for(c=1;c<=x;c++){if(x%c==0) cnt++};
    return cnt<=2;
}
