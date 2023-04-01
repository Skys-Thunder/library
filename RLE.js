/* RLEは、ラングレス符号化や、連長圧縮と呼ばれていて、文字列を圧縮できます。(testtted=>t1e1s1t3e1d1) */
function RLE(input){
    i=input.split(""),mem=i[0],cnt=0,txt="";
    i.map(function(value, number){
        if(value==mem){
            cnt++
        }
        else {
            txt+=`${i[number-1]}${cnt}`;
            cnt=1,mem=value;
        }
    })
    txt+=`${i[i.length-1]}${cnt}`;
    return txt;
}
