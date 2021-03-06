// const commonFib = (n, cache = {}) => {
//     try {
//         if (n in cache) {
//             return cache[n]
//         }

//         cache[n] = n <= 1 ? n : commonFib(n - 1, cache) + commonFib(n - 2, cache)

//         return cache[n]
//     } catch (error) {
//         console.error(error)

//         return NaN
//     }
// }
// const startTime = Date.now()
// console.log(commonFib(7000))
// console.log(`executed in ${Date.now() - startTime} ms`)
// const used = process.memoryUsage()
// for (const key in used) {
//     console.log(`${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`)
// }

// const tiedPants = require('./source')
// const { tieUp, tieUpPartial, clearCache, FriendlyError } =
//     tiedPants({ isDevelopment: true })

// const fib = tieUp(
//     'calculating fibonacci number',
//     function (n, a, b, c, d, e) {
//         if (n < 0 || Math.trunc(n) !== n) {
//             throw new FriendlyError('The passed input wasnt possitive number')
//         } else if (n > 1) {
//             const pre = fib.call(this, n - 2, a, b, c, d, e)
//             const prepre = fib.call(this, n - 1, a, b, c, d, e)

//             return pre + prepre
//         }

//         return n
//     },
//     { useCache: ([n]) => [n], onError: () => NaN }
// )

// const measureFib = tieUp(
//     'measuring the time it takes to calculate fibonacci number',
//     function (n, a, b, c, d, e) {
//         const startTime = Date.now()

//         try {
//             return fib.call(this, n, a, b, c, d, e)
//         } finally {
//             console.log(`execution time ${Date.now() - startTime}ms`)
//         }
//     },
//     { onError: () => 'Incorrect fibonacchi calculation' }
// )

// const a = () => { throw new Error('sup') }
// const b = new Error('blabla')
// const c = [5, 6]
// const d = { b: 6, a }

// d.myself = d

// const A = tieUp(
//     'class A',
//     class {
//         constructor ({ a }) {
//             this.a = a
//             this.b = 6
//         }

//         someMethod () {
//             throw new Error('intentional error')
//             // return 'sup'
//         }

//         someMethodOnError () {
//             return 5
//         }
//     }
// )

// const B = tieUp(
//     'class B',
//     class extends A {
//         constructor ({ a, b }) {
//             super({ a })
//             this.c = b
//         }

//         otherMethod () {
//             throw new Error('other error')
//             // return 'bla'
//         }

//         otherMethodOnError () {
//             return 10
//         }
//     }
// )

// console.log(measureFib.call(c, 4300, a, b, c, d, B))
// console.log(measureFib.call(c, 4000, a, b, c, d, B))
// console.log(measureFib.call(c, 4000, a, b, c, d, B))

// for (let i = 1; i <= 100; i++) {
//     console.log(measureFib.call(c, i * 4000, a, b, c, d, B))
// }
// // node --expose-gc
// let used = process.memoryUsage()
// for (const key in used) {
//     console.log(`${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`)
// }
// clearCache(fib)
// global.gc()
// used = process.memoryUsage()
// for (const key in used) {
//     console.log(`${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`)
// }

// const e = new B({ a: 123, b: 5 })
// console.log(e.someMethod())
// console.log(e.otherMethod())
// console.log(e)

// const asyncGen = tieUp(
//     'Asynchronous generator function test',
//     async function * (i) {
//         yield i
//         // throw new Error('intended')
//         await new Promise((resolve) => setTimeout(resolve, 1000))
//         return i + 10
//     }
// )
// const rag = asyncGen(10)

// rag.next().then(res => {
//     console.log(res)

//     rag.next().then(res => {
//         console.log(res)
//     })
// })

// const gen = tieUp(
//     'Generator function test',
//     function * (i) {
//         yield i
//         // throw new Error('intended')
//         return i + 10
//     },
//     { useCache: args => args }
// )

// console.log(gen(10).next())
// console.log(gen(10).next())

// const asyncF = tieUp(
//     'Asynchronous function test',
//     async function (i) {
//         await new Promise((resolve) => setTimeout(resolve, 1000))
//         // throw new Error('intended')
//         return i
//     },
//     { useCache: args => args }
// )

// asyncF(10).then(res => {
//     console.log(res)
//     asyncF(10).then(res => { console.log(res) })
// })

// const loopAsync = tieUp(
//     'cached loop async function',
//     (fn, n) => new Promise((resolve, reject) => {
//         let v

//         for (let i = 0; i < n; i++) {
//             v = fn(i)
//         }

//         resolve(v)
//     }),
//     { useCache: args => args, onError: () => new Promise() }
// )

// let startTime = Date.now()

// loopAsync(Math.sqrt, 1e9).then(result => {
//     console.log(`executed in ${Date.now() - startTime}ms`)
//     console.log(result)
//     startTime = Date.now()

//     loopAsync(Math.sqrt, 1e9).then(result => {
//         console.log(`executed in ${Date.now() - startTime}ms`)
//         console.log(result)
//     })
// })

// const addNumbers = tieUpPartial(
//     'adding two numbers',
//     (a) => {
//         console.log('ran outer')

//         if (typeof a !== 'number') {
//             throw new Error('Outer error - please pass number')
//         }

//         // return []
//         return (b) => {
//             if (typeof b !== 'number') {
//                 throw new Error('Inner error - please pass number')
//             }

//             return a + b
//         }
//     },
//     { useOuterCache: args => args }
// )

// const addTenTo = addNumbers('sup')
// console.log(addTenTo('sup'))

// const addTenTo = addNumbers(10)
// const copyOfAddTenTo = addNumbers(10)
// console.log(addTenTo(5))
// console.log(copyOfAddTenTo(6))
// console.log(copyOfAddTenTo('bla'))
