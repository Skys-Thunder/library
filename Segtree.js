class Segtree {
    constructor(n, op, e) {
        this._n = Array.isArray(n) ? n.length : n
        this.log = 0; while ((1 << this.log) < this._n) this.log++
        this.size = 1 << this.log
        this.e = e
        this.op = op
        this.d = Array(this.size * 2).fill(e)
        if (Array.isArray(n)) for (let i = 0; i < this._n; i++) this.d[this.size + i] = n[i]
        for (let i = this.size - 1; i >= 1; i--) this.update(i)
    }

    update(k) {
        this.d[k] = this.op(this.d[2 * k], this.d[2 * k + 1]); 
    }

    set(p, x) {
        //console.assert(0<=p&&p<this._n, "set() : p is out of range")
        p+=this.size; this.d[p] = x
        for (let i=1;i<=this.log;i++) this.update(p>>i)
    }
    get(p, x) {
        //console.assert(0<=p&&p<this._n, "get() : p is out of range")
        return this.d[p+this.size]    
    }
    prod(l, r) {
        //console.assert(0<=l&&l<=r&&r<=this._n, "prod() : l,r is out of range")
        let sml = this.e; let smr = this.e
        l+=this.size; r+=this.size
        while (l < r) {
            if (l & 1) sml = this.op(sml, this.d[l++])
            if (r & 1) smr = this.op(this.d[--r], smr)
            l >>= 1; r >>= 1
        }
        return this.op(sml, smr);
    }
    all_prod() { return this.d[1] }
    max_right(l, f) {
        //console.assert(0<=l&&l<=this._n, "max_right() : l is out of range")
        //console.assert(f(this.e), "max_right() : invalid function f")
        if (l == this._n) return this._n;
        l += this.size; let sm = this.e
        do {
            while (l % 2 == 0) l >>= 1
            if (!f(this.op(sm, this.d[l]))) {
                while (l < this.size) {
                    l = (2 * l)
                    if (f(this.op(sm, this.d[l]))) {
                        sm = this.op(sm, this.d[l])
                        l++
                    }
                }
                return l - this.size
            }
            sm = this.op(sm, this.d[l])
            l++;
        } while ((l & -l) != l);
        return this._n;
    }
    min_left(r, f) {
        //console.assert(0<=r&&r<=this._n, "min_left() : r is out of range")
        //console.assert(f(this.e), "min_left() : invalid function f")
        if (r == 0) return 0
        r += this.size; let sm = this.e
        do {
            r--
            while (r > 1 && (r % 2)) r >>= 1;
            if (!f(this.op(this.d[r], sm))) {
                while (r < this.size) {
                    r = (2 * r + 1)
                    if (f(this.op(this.d[r], sm))) {
                        sm = this.op(this.d[r], sm)
                        r--
                    }
                }
                return r + 1 - this.size
            }
            sm = this.op(this.d[r], sm)
        } while ((r & -r) != r)
        return 0;
    }
}

//how to use
// ACLのsegtreeの移植
// read https://atcoder.github.io/ac-library/document_ja/segtree.html
// a = new Segtree(n, op, e) 要素数n, 二項演算op, 単位元eのセグメントツリーを作る
// a = new Segtree(array, op, e) 要素array, 二項演算op, 単位元eのセグメントツリーを作る
// a.set(p, x)  : a[p]にxを代入
// a.get(p)     : a[p]を返す
// a.prod(l, r) : op(a[l], ..., a[r])を返す l==rの時はeを返す
// a.all_prod() : op(a[l], ..., a[n-1])を返す
// a.max_right(l, f) : 二分探索を行い、f(op(a[l], a[l+1], ..., a[r-1])) = true となる最大のrを返す
// a.min_left(r, f)  : 二分探索を行い、f(op(a[l], a[l+1], ..., a[r-1])) = true となる最小のlを返す
// 動作テスト:https://atcoder.jp/contests/practice2/submissions/47174852
