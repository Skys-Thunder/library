var PriorityQueue = (() => {
    var PriorityQueue = function(_f = (a, b) => a < b) {
        this.data = [-1]; //data[0]は使わない
        this.compare = _f;
    }

    PriorityQueue.prototype.swap = function(i, j) {tmp = this.data[i]; this.data[i] = this.data[j]; this.data[j] = tmp}

    PriorityQueue.prototype.size = function(){ return this.data.length - 1 }
    PriorityQueue.prototype.top = function(){ return this.data[1] }
    PriorityQueue.prototype.push = function(a){ 
        this.data.push(a);
        let index = this.data.length - 1;
        while (index > 1) {
            if (this.compare(this.data[index], this.data[index / 2 | 0])) break;
            this.swap(index, index / 2 | 0)
            index = index / 2 | 0
        }
    }
    PriorityQueue.prototype.pop = function(){
        console.assert(this.data.length > 1, "pop() : queue is empty")
        this.swap(1, this.data.length - 1); index = 1
        while (index * 2 < this.data.length - 1) {
            nindex = index * 2
            if (nindex+1 < this.data.length - 1 && this.compare(this.data[nindex], this.data[nindex+1])) nindex++
            if (this.compare(this.data[nindex], this.data[index])) break;
            this.swap(index, nindex)
            index = nindex
        }
        return this.data.pop()
    }

    return PriorityQueue;
})()
var PriorityQueueInv = PriorityQueue.bind(undefined, (a, b) => a > b)

//how to use
// x = new PriorityQueue 降順で取り出すプライオリティキューを作る(最大値がtopに来る)
// x = new PriorityQueueInv 昇順で取り出すプライオリティキューを作る(最小値がtopに来る)
// x = new PriorityQueue(f) 比較関数fを用いたプライオリティキューを作る
// x.size()  : xの保持するデータ数を返す
// x.top()   : topにある値を返す
// x.push(a) : aをプライオリティキューに挿入する 
// x.pop()   : topにある値を返し、その値を削除する 
// 動作テスト:https://atcoder.jp/contests/abc325/submissions/47092140
