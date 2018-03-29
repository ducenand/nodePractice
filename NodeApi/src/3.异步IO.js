//异步IO
//阻塞IO
//非阻塞IO

// 阻塞IO造成CPU等待浪费，非阻塞带来的麻烦确实需要轮询去确认是否安全完成数据获取，它会让CPU处理状态判断，是对CPU资源的浪费

//完成整个异步IO环节的有事件循环、观察者、和请求对象等。

//在node中除了Javascript是单线程外，Node自身是多线程的，只是I/O线程使用的CPU较少。除了用户代码无法并行执行外，所有的I/O(磁盘I/O和网络I/O等）都是可以并行起来的。

//非I/O的异步api
// setTimeout()
// setInterval()
// setImmediate()
// process.nextTick();

setTimeout(()=>{
    console.log('延迟执行1')
},0);
process.nextTick(function () {
    console.log('延迟执行2');
});

setImmediate(()=>{
   console.log('延迟执行3')
});


console.log('正常执行');




