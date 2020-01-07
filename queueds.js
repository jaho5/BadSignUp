export class Queue {
    constructor() {
        this.q = [];
    }

    push(item) {
        this.q.push(item)
    }

    remove(id) {
        let q = this.q;
        return new Promise(function(resolve, reject) {
            // do a thing, possibly async, then…
            for(let i = 0; i < q.length; i++) {
                if(q[i].id == id) {
                    let element = q[i];
                    q.splice(i,1);
                    resolve(element);
                }
            }
            reject(Error("Nothing removed"));
            
          });

    }

    removeFront() {
        this.q.shift()
    }

    moveFrontToBack() {
        if(this.q.length>0) this.q.push(this.q.shift());
    }

    list() {
        let list = []
        this.q.forEach(element => {
            if (element && element.name) {
                if (element.partner) {
                    list.push(`${element.name}|${element.partner}`)
                } else {
                    list.push(element.name)
                }
            };
        })
        return list
    }
}

let test = new Queue()
test.push({id:3,name:'cool'})
test.push({id:4,name:'cool1'})
test.push({id:5,name:'cool2'})
test.push({id:6,name:'cool3'})
test.push({id:7,name:'cool4'})

console.log(test.list())
test.moveFrontToBack()

console.log(test.list())

// console.log(test)
// console.log(test.list())
// test.remove(4)
// console.log(test)
// console.log(test.list())