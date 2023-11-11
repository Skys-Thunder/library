class LazySegtree {
    constructor(n, op, e, mapping, composition, id) {
        this._n = Array.isArray(n) ? n.length : n
        this.log = 0; while ((1 << this.log) < this._n) this.log++
        this.size = 1 << this.log
        this.e = e
        this.op = op
        this.mapping = mapping
        this.composition = composition  
        this.id = id
        this.d = Array(this.size * 2).fill(e)
        this.lz = Array(this.size).fill(id)
        if (Array.isArray(n)) for (let i = 0; i < this._n; i++) this.d[this.size + i] = n[i]
        for (let i = this.size - 1; i >= 1; i--) this.update(i)
    }

    update(k) {
        this.d[k] = this.op(this.d[2 * k], this.d[2 * k + 1])
    }
    all_apply(k, f) {
        this.d[k] = this.mapping(f, this.d[k])
        if (k < this.size) this.lz[k] = this.composition(f, this.lz[k])
    }
    push(k) {
        this.all_apply(2 * k, this.lz[k])
        this.all_apply(2 * k + 1, this.lz[k])
        this.lz[k] = this.id
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
        return this.op(sml, smr)
    }
    all_prod() { return this.d[1] }

    apply(p, f) {
        //console.assert(0<=p&&p<this._n, "apply() : p is out of range")
        p += this.size
        for (let i = this.log; i >= 1; i--) this.push(p >> i)
        d[p] = this.mapping(f, d[p])
        for (let i = 1; i <= log; i++) this.update(p >> i)
    }
    apply(l, r, f) {
        //console.assert(0<=l&&l<=r&&r<=this._n, "apply() : l,r is out of range")
        if (l == r) return

        l += this.size
        r += this.size

        for (let i = this.log; i >= 1; i--) {
            if (((l >> i) << i) != l) this.push(l >> i)
            if (((r >> i) << i) != r) this.push((r - 1) >> i)
        }

        {
            let l2 = l, r2 = r;
            while (l < r) {
                if (l & 1) this.all_apply(l++, f)
                if (r & 1) this.all_apply(--r, f)
                l >>= 1
                r >>= 1
            }
            l = l2
            r = r2
        }

        for (let i = 1; i <= this.log; i++) {
            if (((l >> i) << i) != l) this.update(l >> i)
            if (((r >> i) << i) != r) this.update((r - 1) >> i)
        }
    }

    max_right(l, g) {
        //console.assert(0<=l&&l<=this._n, "max_right() : l is out of range")
        //console.assert(f(this.e), "max_right() : invalid function f")
        if (l == this._n) return this._n;
        l += this.size
        for (let i = log; i >= 1; i--) this.push(l >> i)
        let sm = this.e
        do {
            while (l % 2 == 0) l >>= 1
            if (!g(this.op(sm, this.d[l]))) {
                while (l < this.size) {
                    this.push(l)
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
    min_left(r, g) {
        //console.assert(0<=r&&r<=this._n, "min_left() : r is out of range")
        //console.assert(f(this.e), "min_left() : invalid function f")
        if (r == 0) return 0
        r += this.size
        for (let i = log; i >= 1; i--) this.push((r - 1) >> i)
        let sm = this.e
        do {
            r--
            while (r > 1 && (r % 2)) r >>= 1;
            if (!g(this.op(this.d[r], sm))) {
                while (r < this.size) {
                    this.push(r)
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
// ACLのlazy_segtreeの移植
// read https://atcoder.github.io/ac-library/document_ja/lazysegtree.html
// a = new LazySegtree(n, op, e, mapping, composition, id) 要素数nの遅延セグメントツリーを作る その他の引数についてはacl通り
// a = new LazySegtree(array, op, e, mapping, composition, id) 要素arrayの遅延セグメントツリーを作る その他の引数についてはacl通り
// a.set(p, x)  : a[p]にxを代入
// a.get(p)     : a[p]を返す
// a.prod(l, r) : op(a[l], ..., a[r])を返す l==rの時はeを返す
// a.all_prod() : op(a[l], ..., a[n-1])を返す
// a.apply(p, f) : a[p] = f(a[p])
// a.apply(l, r, f) : i = [l, r) についてa[i] = f(a[i])
// a.max_right(l, f) : 二分探索を行い、f(op(a[l], a[l+1], ..., a[r-1])) = true となる最大のrを返す
// a.min_left(r, f)  : 二分探索を行い、f(op(a[l], a[l+1], ..., a[r-1])) = true となる最小のlを返す
// 上に記載のないメソッドは内部処理用です
// 動作テスト:https://atcoder.jp/contests/abc327/submissions/47449430
