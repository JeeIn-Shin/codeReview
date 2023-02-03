class priorityQueue {

    constructor() {
        this.heap = [ null ];
    }

    push(id, data) {
        const heap = this.heap;

        let info = { id, data }
        heap.push(info);

        let index = heap.length - 1;
        let parent = Math.floor(index / 2);
        


        while(index > 1 ) {
            if(heap[parent].data > heap[index].data)
                [heap[parent], heap[index]] = [heap[index], heap[parent]]

            index = parent;
            parent = Math.floor(index / 2);
        }

        // console.log("in priorityQueue class");
        // console.log(heap);
    }

    pop()   {
        const heap = this.heap;

        let parent = 1;
        let child = 2;
        
        //하나만 값이 존재하는 경우
        if(heap.length - 1 <= 0)
            return 'empty';

        //값이 두개 존재하는 경우
        if(heap.length - 1 === 1)
            return heap.pop();
        
        let root = heap[1];
        heap[1] = heap.pop();
        
        //console.log(`in pop ${heap.length - 1}`);
        if (heap.length - 1 > 2)    {
            while (child <= heap.length - 1) {
                if (heap[child].data > heap[child + 1].data) {
                    [heap[parent], heap[child + 1]] = [heap[child + 1], heap[parent]]

                    parent = child + 1;
                    child = parent * 2;
                }
                else if (heap[child].data <= heap[child + 1].data) {
                    [heap[parent], heap[child]] = [heap[child], heap[parent]]

                    parent = child;
                    child = parent * 2;
                }
                else
                    return root;
            }
        }
        else
            return root;
    }
}

module.exports = priorityQueue;