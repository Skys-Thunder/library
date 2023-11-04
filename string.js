let suffix_array
let lcp_array

{
    //内部処理用
    const THRESHOLD_NAIVE = 10
    const THRESHOLD_DOUBLING = 40

    function sa_naive(s) {
        let n = s.length
        let sa = Array(n)
        for (let i=0; i<n; ++i) sa[i] = i
        sa.sort((l, r) => {
            if (l == r) return 1
            while (l < n && r < n) {
                if (s[l] != s[r]) return s[l] - s[r]
                l++
                r++
            }
            return l == n ? -1 : 1
        })
        return sa
    }
    
    function sa_doubling(s) {
        let n = s.length
        let sa = Array(n); let rnk = s; let tmp = Array(n)
        for (let i=0; i<n; ++i) sa[i] = i
        for (let k = 1; k < n; k *= 2) {
            let cmp = function(x, y) {
                if (rnk[x] != rnk[y]) return rnk[x] - rnk[y]
                let rx = x + k < n ? rnk[x + k] : -1
                let ry = y + k < n ? rnk[y + k] : -1
                return rx - ry
            };
            sa.sort(cmp)
            tmp[sa[0]] = 0
            for (let i = 1; i < n; i++) {
                tmp[sa[i]] = tmp[sa[i - 1]] + (cmp(sa[i - 1], sa[i]) ? 1 : 0)
            }
            let t = tmp; tmp = rnk; rnk = t //swap
        }
        return sa
    }

    class sa_is {
        constructor() {
            this.s = ""
            this.n = 0
            this.sa = []
            this.la = []
            this.sum_l = []
            this.sum_s = []
        }
            
        calc(_s, upper) {
            this.s = _s
            this.n = _s.length
            if (this.n == 0) return []
            if (this.n == 1) return [0]
            if (this.n == 2) {
                if (this.s[0] < this.s[1]) {
                    return [0, 1]
                } else {
                    return [1, 0]
                }
            }
            if (this.n < THRESHOLD_NAIVE) {
                return sa_naive(_s)
            }
            if (this.n < THRESHOLD_DOUBLING) {
                return sa_doubling(_s)
            }
    
            this.sa = Array(this.n).fill(0)
            this.ls = Array(this.n).fill(false)
            for (let i = this.n - 2; i >= 0; i--) {
                this.ls[i] = (this.s[i] == this.s[i + 1]) ? this.ls[i + 1] : (this.s[i] < this.s[i + 1])
            }
            this.sum_l = Array(upper + 1).fill(0)
            this.sum_s = Array(upper + 1).fill(0)
            for (let i = 0; i < this.n; i++) {
                if (!this.ls[i]) {
                    this.sum_s[this.s[i]]++
                } else {
                    this.sum_l[this.s[i] + 1]++
                }
            }
            for (let i = 0; i <= upper; i++) {
                this.sum_s[i] += this.sum_l[i]
                if (i < upper) this.sum_l[i + 1] += this.sum_s[i]
            }
    
            let lms_map = Array(this.n + 1).fill(-1)
            let m = 0;
            for (let i = 1; i < this.n; i++) {
                if (!this.ls[i - 1] && this.ls[i]) {
                    lms_map[i] = m++
                }
            }
            let lms = []
            for (let i = 1; i < this.n; i++) {
                if (!this.ls[i - 1] && this.ls[i]) {
                    lms.push(i)
                }
            }
            this.induce(lms)
    
            if (m > 0) {
                let sorted_lms = []
                for (let i = 0; i < this.sa.length; i++) {
                    let v = this.sa[i]
                    if (lms_map[v] != -1) sorted_lms.push(v)
                }
                let rec_s = Array(m).fill(0)
                let rec_upper = 0
                rec_s[lms_map[sorted_lms[0]]] = 0
                for (let i = 1; i < m; i++) {
                    let l = sorted_lms[i - 1]; let r = sorted_lms[i]
                    let end_l = (lms_map[l] + 1 < m) ? lms[lms_map[l] + 1] : this.n
                    let end_r = (lms_map[r] + 1 < m) ? lms[lms_map[r] + 1] : this.n
                    let same = true
                    if (end_l - l != end_r - r) {
                        same = false
                    } else {
                        while (l < end_l) {
                            if (this.s[l] != this.s[r]) break
                            l++
                            r++
                        }
                        if (l == this.n || this.s[l] != this.s[r]) same = false
                    }
                    if (!same) rec_upper++
                    rec_s[lms_map[sorted_lms[i]]] = rec_upper
                }
   
                let rec_ins = new sa_is()
                let rec_sa = rec_ins.calc(rec_s, rec_upper)
    
                for (let i = 0; i < m; i++) {
                    sorted_lms[i] = lms[rec_sa[i]]
                }
                this.induce(sorted_lms)
            }
            return this.sa
        }

        induce(lms) {
            this.sa = Array(this.sa.length).fill(-1)
            let buf = this.sum_s.slice(0, this.sum_s.length)
            for (let i = 0; i < lms.length; i++) {
                let d = lms[i]
                if (d == this.n) continue
                this.sa[buf[this.s[d]]++] = d
            };
            buf = this.sum_l.slice(0, this.sum_l.length)
            this.sa[buf[this.s[this.n - 1]]++] = this.n - 1
            for (let i = 0; i < this.n; i++) {
                let v = this.sa[i]
                if (v >= 1 && !this.ls[v - 1]) {
                    this.sa[buf[this.s[v - 1]]++] = v - 1
                }
            }
            buf = this.sum_l.slice(0, this.sum_l.length)
            for (let i = this.n - 1; i >= 0; i--) {
                let v = this.sa[i]
                if (v >= 1 && this.ls[v - 1]) {
                    buf[this.s[v - 1] + 1] -= 1
                    this.sa[buf[this.s[v - 1] + 1]] = v - 1
                }
            }
        }
    }

    suffix_array = function (s) {
        let n = s.length
        let s2 = Array(n)
        for (let i = 0; i < n; i++) s2[i] = s[i].charCodeAt()
        let ins = new sa_is()
        return ins.calc(s2, 255)
    }

    lcp_array = function(s, sa) {
        let n = s.length
        let rnk = Array(n)
        for (let i = 0; i < n; i++) {
            rnk[sa[i]] = i
        }
        let lcp = Array(n - 1)
        let h = 0
        for (let i = 0; i < n; i++) {
            if (h > 0) h--
            if (rnk[i] == 0) continue
            let j = sa[rnk[i] - 1]
            for (; j + h < n && i + h < n; h++) {
                if (s[j + h] != s[i + h]) break
            }
            lcp[rnk[i] - 1] = h
        }
        return lcp
    }
}

//how to use
// sa = suffix_array(s) 長さnの文字列sのsuffix_arrayを返す(長さnの配列)
// lcp = lcp_array(s, sa) 長さnの文字列sとそのsuffix_array saを渡すと、lcp_arrayを返す(長さn-1の配列)
// 動作テスト: https://atcoder.jp/contests/adt_all_20231102_1/submissions/47182150
// cf. https://atcoder.github.io/ac-library/document_ja/string.html
// 注意:文字列はASCII文字でなければならない (厳密には、各文字のcharCodeAt()が[0:255]の範囲の値を返すことが必要)
