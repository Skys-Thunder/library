function sort(f,s){
    for(let c=0;c<Math.min(f.length,s.length);c++){
        let [aind,bind]=[f[c],s[c]].map(n=>x.indexOf(n));
        if(aind<bind) return -1
        else if(aind>bind) return 1;
    }
    return f.length-s.length;
}
// x="abcdefghijklmn",.sort(sort)
