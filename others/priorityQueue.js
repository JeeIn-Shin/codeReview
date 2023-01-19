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
    }

    pop()   {
        const heap = this.heap;

        let parent = 1;
        let child = 2;
        
        if(heap.length - 1 <= 0)
            return 'empty';

        if(heap.length - 1 === 1)
            return heap.pop();

        let root = heap[1];
        heap[1] = heap.pop();

        while(child <= heap.length) {
            if(heap[child].data > heap[child + 1].data)  {
                [heap[parent], heap[child + 1]] = [heap[child + 1], heap[parent]]

                parent = child + 1;
                child = parent * 2;
            }         
            else if(heap[child].data <= heap[child + 1].data)   {
                [heap[parent] , heap[child]] = [heap[child], heap[parent]]

                parent = child;
                child = parent * 2;
            }
            else
                return root;
        }
    }
}

module.exports = priorityQueue;