class ModInt {
    static mod = 998244353n

    constructor(_v) {
        this.v = BigInt(_v) % BigInt(ModInt.mod)
        if (this.v < 0) this.v += ModInt.mod
    }

    valueOf() { return this.v.valueOf() }
    toString() { return this.v.toString() }
    val() { return Number(this.v); }
    add(_rhs) { return new ModInt(this.v + new ModInt(_rhs).v) }
    sub(_rhs) { return new ModInt(this.v - new ModInt(_rhs).v) }
    mul(_rhs) { return new ModInt(this.v * new ModInt(_rhs).v) }
    div(_rhs) { return new ModInt(this.v * new ModInt(_rhs).inv().v) }
    inv() {
        let s = ModInt.mod; let t = this.v; let m0 = 0n; let m1 = 1n
        while (t != 0) {
            let u = s / t; s -= t * u; m0 -= m1 * u
            let tmp = s; s = t; t = tmp
            tmp = m0; m0 = m1; m1 = tmp
        }
        if (m0 < 0) m0 += ModInt.mod / s
        return new ModInt(m0)
    }
    pow(n) {
        //console.assert(n >= 0, "pow(n) : n must be greater or equal to 0")
        let r = new ModInt(1)
        let x = new ModInt(this.v)
        while(n > 0) { if ((n & 1) > 0) r = r.mul(x); x = x.mul(x); n >>= 1}
        return new ModInt(r)
    }
}

//how to use
// x = new ModInt(100) : 100 (mod ModInt.mod)の変数xを作る
// x.add(y) : modInt同士またはmodInt + bigIntの加算結果を返す
// x.sub(y) : modInt同士またはmodInt - bigIntの減算結果を返す
// x.mul(y) : modInt同士またはmodInt * bigIntの乗算結果を返す
// x.div(y) : modInt同士またはmodInt / bigIntの除算結果を返す
// x.inv()  : 1/x (mod x.mod)の値を返す
// x.pow(n) : x^n (mod x.mod)の値を繰り返し二乗法で計算して返す
// x.val()  : xの保持する値をNumber型で返す
// 動作テスト:https://atcoder.jp/contests/abc326/submissions/47175331
