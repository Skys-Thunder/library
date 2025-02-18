function binary_search(arr,val){
    let [l,r]=[0,arr.length-1];
    while(l<=r){
        let mid=0|(l+r)/2;
        if(arr[mid]==val) return mid;
        if(arr[mid]<val) l=mid+1;
        if(arr[mid]>val) r=mid-1;
    }
    return -1;
}
function lower_bound(arr,val){
    let [l,r,mid]=[0,arr.length-1,];
    while(l<=r){
        mid=0|(l+r)/2;
        if(arr[mid]<val) l=mid+1;
        else r=mid-1;
    }
    return l;
}
function upper_bound(arr,val){
    let [l,r,mid]=[0,arr.length-1,];
    while(l<=r){
        mid=0|(l+r)/2;
        if(arr[mid]<=val) l=mid+1;
        else r=mid-1;
    }
    return l;
}
