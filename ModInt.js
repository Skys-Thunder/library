var ModInt = (() => {
    var ModInt = function(_v, _mod = 998244353n) {
        this.v = ((_v, _mod) => {v = BigInt(_v) % BigInt(_mod); if (v < 0) v += _mod; return v})(_v, _mod)
        this.mod = BigInt(_mod)
    }

    ModInt.prototype.valueOf = function(){ return this.v.valueOf() }
    ModInt.prototype.toString = function(){ return this.v.toString() }
    ModInt.prototype.val = function(){ return Number(this.v); }
    ModInt.prototype.add = function(_rhs){ return new ModInt(this.v + new ModInt(_rhs, this.mod).v, this.mod) }
    ModInt.prototype.sub = function(_rhs){ return new ModInt(this.v - new ModInt(_rhs, this.mod).v, this.mod) }
    ModInt.prototype.mul = function(_rhs){ return new ModInt(this.v * new ModInt(_rhs, this.mod).v, this.mod) }
    ModInt.prototype.div = function(_rhs){ return new ModInt(this.v * new ModInt(_rhs, this.mod).inv().v, this.mod) }
    ModInt.prototype.inv = function() {
        s = this.mod; t = this.v; m0 = 0n; m1 = 1n
        while (t != 0) {
            u = BigInt(s / t); s -= t * u; m0 -= m1 * u
            tmp = s; s = t; t = tmp
            tmp = m0; m0 = m1; m1 = tmp
        }
        if (m0 < 0) m0 += this.mod / s
        return new ModInt(m0, this.mod)
    }
    ModInt.prototype.pow = function (n) {
        console.assert(n >= 0, "pow(n) : n must be greater or equal to 0")
        r = new ModInt(1, this.mod)
        x = new ModInt(this.v, this.mod)
        while(n > 0) { if ((n & 1) > 0) r = r.mul(x); x = x.mul(x); n >>= 1}
        return new ModInt(r, this.mod)
    }
    return ModInt;
})()
 
//how to use
// x = new ModInt(100) : 100 (mod 998244353)の変数xを作る
// x = new ModInt(100, y) : 100 (mod y)の変数xを作る
// x.add(y) : modInt同士またはmodInt + bigIntの加算結果を返す(x.modとy.modが異なるときには、x.modでmodを取るので注意)
// x.sub(y) : modInt同士またはmodInt - bigIntの減算結果を返す(x.modとy.modが異なるときには、x.modでmodを取るので注意)
// x.mul(y) : modInt同士またはmodInt * bigIntの乗算結果を返す(x.modとy.modが異なるときには、x.modでmodを取るので注意)
// x.div(y) : modInt同士またはmodInt / bigIntの除算結果を返す(x.modとy.modが異なるときには、x.modでmodを取るので注意)
// x.inv()  : 1/x (mod x.mod)の値を返す
// x.pow(n) : x^n (mod x.mod)の値を繰り返し二乗法で計算して返す
// x.val()  : xの保持する値をNumber型で返す
// 動作テスト:https://atcoder.jp/contests/abc326/submissions/47089987
