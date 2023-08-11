function binary_search(arr,x){
    let [L,R]=[0,arr.length-1];
    while(L<=R){
        let M=Math.floor((L+R)/2);
        if(arr[M]==x) return M;
        if(arr[M]<x) L=M+1;
        if(arr[M]>x) R=M-1;
    }
    return -1;
}
