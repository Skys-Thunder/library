function next_permutation(arr) {
    result=[];
    function perm(strarr, endarr){
        if(endarr.length==0){
            result.push(Array.from(strarr));
            return;
        }
        for (let c=0;c<endarr.length;c++){
            strarr.push(endarr[c]);
            perm(strarr,endarr.filter((_, index) => index !== c));
            strarr.pop();
        }
    }
    perm([], arr);
    return result;
}
