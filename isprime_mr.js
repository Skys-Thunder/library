//Miller-Rabin法を用いた高速素数判定
//n≦2^64に対してO(log(n))で素数かどうかを判定する
function MillerRabin(n, arr) {
    let pow = function (_x, _mod, _n) {
        let x = BigInt(_x)
        let mod = BigInt(_mod)
        let n = BigInt(_n)
        let r = 1n
        while(n > 0n) { if ((n & 1n) > 0n) r = (r * x) % mod; x = (x * x) % mod; n >>= 1n}
        return r
    }
    
    let s = 0; let d = n - 1n
    while (d % 2n == 0) { ++s; d >>= 1n }
    for(let i = 0; i < arr.length; ++i) {
        if (n <= arr[i]) return true
        let x = pow(arr[i], n, d)
        if (x != 1) {
            let t = 0;
            for (t = 0; t < s; ++t) {
                if (x == n - 1n) break
                x = (x * x) % n
            }
            if (t == s) return false
        }
    }
    return true;
}

function is_prime_mr(n){
    let x = BigInt(n)
    if (x <= 1n) return false
    else if (x == 2n) return true
    else if (x % 2n == 0) return false
    else if (x < 4759123141n) return MillerRabin(x, [2n, 7n, 61n])
    else return MillerRabin(x, [2n, 325n, 9375n, 28178n, 450775n, 9780504n, 1795265022n])
}

//how to use
// is_prime_mr(n) nが素数ならtrueを返す n≦2^64
// 動作テスト: https://atcoder.jp/contests/math-and-algorithm/submissions/48906346
