class PriorityQueue {
    constructor(_f = (a, b) => a < b) {
        this.data = [-1]; //data[0]は使わない
        this.compare = _f;
    }

    swap(i, j) {let tmp = this.data[i]; this.data[i] = this.data[j]; this.data[j] = tmp}
    size() { return this.data.length - 1 }
    top() { return this.data[1] }
    push(a) { 
        this.data.push(a);
        let index = this.data.length - 1;
        while (index > 1) {
            if (this.compare(this.data[index], this.data[index >> 1])) break;
            this.swap(index, index >> 1)
            index >>= 1
        }
    }
    pop() {
        //console.assert(this.data.length > 1, "pop() : queue is empty")
        this.swap(1, this.data.length - 1); let index = 1
        while (index * 2 < this.data.length - 1) {
            let nindex = index << 1
            if (nindex+1 < this.data.length - 1 && this.compare(this.data[nindex], this.data[nindex+1])) nindex++
            if (this.compare(this.data[nindex], this.data[index])) break;
            this.swap(index, nindex)
            index = nindex
        }
        return this.data.pop()
    }
}
var PriorityQueueInv = PriorityQueue.bind(undefined, (a, b) => a > b)

//how to use
// x = new PriorityQueue 降順で取り出すプライオリティキューを作る(最大値がtopに来る)
// x = new PriorityQueueInv 昇順で取り出すプライオリティキューを作る(最小値がtopに来る)
// x = new PriorityQueue(f) 比較関数fを用いたプライオリティキューを作る
// x.size()  : xの保持するデータ数を返す
// x.top()   : topにある値を返す
// x.push(a) : aをプライオリティキューに挿入する 
// x.pop()   : topにある値を返し、その値を削除する 
// 動作テスト: https://atcoder.jp/contests/abc325/submissions/47175575
