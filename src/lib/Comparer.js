import equal from 'deep-equal'

const Comparer = {
    equal: (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2),
    deepEqual: (obj1, obj2) => equal(obj1, obj2)
}

export default Comparer