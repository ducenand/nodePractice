// 5.1.3V8对象分配
/**
~  node
> process.memoryUsage()
{ rss: 22228992,
    heapTotal: 7684096,
    heapUsed: 5038800,
    external: 10043 }
>
 */

// heapTotal和heapUsed是V8的堆内存使用情况，前者是已申请的堆内存,后者是当前使用量

// 可以在node启动时传递参数来使用更多的内存
/**
node --max-old-space-size=1700 test.js //    单位为MB //
node --max-new-space-size=1024 test.js //    单位为KB
 */

// 5.1.4 V8垃圾回收机制

// V8的内存分代
// 新生代内存空间（存活时间较短的对象）、和老生代的内存空间（存活时间较长或常驻内存的对象）。 老生代+新生代 = V8堆的整体大小
// 和上面指定的参数对应；


// 5.1.5 查看垃圾回收日志
/**
node --trace_gc -e "var a = [];for (var i = 0; i < 1000000; i++) a.push(new Array(100));" > gc.log
*/

// 添加参数--prof可以得到V8执行事的性能分析数据，其中包括垃圾回收执行时占用的时间。
// node --prof test01.js


// 5.2 高效使用内存
//在javascript执行中，无法立即回收的内存有闭包和全局变量引用这两种情况，由于v8的内存限制，要十分小心此类变量是否无限制的增加。因为它会导致老生态的对象增多。


// 5.3.1 查看内存使用情况
/**
 ~  node
 > process.memoryUsage()
 { rss: 22228992,
     heapTotal: 7684096,
     heapUsed: 5038800,
     external: 10043 }
 >
 */

// rss 是resident set size的缩写，即进程的常驻内存的部分，进程的内存总共有几个部分，一部分是rss,其余部分在交换区（swap）或者文件系统（filesystem）中。

// 查看系统的内存占用

/**
 node
> os.totalmem()
8589934592
> os.freemem()
143175680
>
 */
// 8G内存闲置内存136MB

// Node的内存构成主要由通过V8进行分配的部分和Node自行分配的部分。受V8的垃圾限制的主要是V8堆内存

// 5.4 内存泄漏
// 造成泄漏的原因
// 1、缓存
// 2、队列消费不及时
// 3、作用域未释放


// 5.5内存泄漏排查

// node-heapdump
// node-memwatch

// 5.6大内存应用

// Node提供了stream模块用于处理大文件
// 比如：fs.createReadStream()等


















