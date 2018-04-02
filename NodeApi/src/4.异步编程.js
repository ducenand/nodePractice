//函数式编程
//高阶函数
// 高阶函数是可以把函数作为参数，或将函数作为返回值的函数，
/**
 function foo(x){
    return function(){
        return x;
    }
 }
 */
var points = [40,34,4,656,12,545];

points.sort((a,b)=>{
    return a - b;
});

points.forEach((a,b)=>{

});
// javascript 中sort、forEach都是典型的高级函数


//4.1.2 偏函数用法
/**
var isType = function (type) { return function (obj) {
    return toString.call(obj) == '[object ' + type + ']'; };
};
var isString = isType('String');
var isFunction = isType('Function');
*/
//4.2.1 优势 Node 最大特性莫过于基于事件驱动的非阻塞I/O模型。
//4.2.2 难点
// 一、异常处理
// 我们自行编写异步方法，需要遵循的原则
// 1、必须执行调用者传入的回调函数；
// 2、正确传递回调异常供调用者判断


/**
const async = function (callback) {
    process.nextTick(()=>{
        let results = something;
        if(error){
            return callback(error);
        }

        callback(null,results);
    })

};*/

// 二、函数嵌套过深
// 三、阻塞代码
/**
 var start = new Date();
    while (new Date() - start < 1000) {
    //TODO
}
 //用来阻塞代码*/

// 这段代码会秩序占用CPU进程的判断，与真正的线程沉睡相去甚远，完全破幻了时间循环的调度，由于Node单线程的原因，CPU资源全部会用于为这段代码服务，导致其其余任何请求都会得不到响应。
// 四、多线程编程
// 五、异步转同步

// 4.3异步编程解决方案
// 1、事件发布/订阅模式
// 2、Promise/Dferred模式
// 3、流程控制库

// 继承events模块
/**
const events = require('events');
const util = require('util');
function Stream(){
    events.EventEmitter.call(this);
}
util.inherits(Stream,events.EventEmitter);
const stream = new Stream();
stream.on('event1',function (messages) {
   console.log(messages);
});
stream.emit('event1','hello world');

const EventEmitter = events.EventEmitter;
class Client extends EventEmitter{
    constructor() {
        super();
    }
    auth() {
        console.log('arguments');
    }
}

let client = new Client();

client.on('auth',client.auth);
client.emit('auth');
*/

// 利用事件队列解决雪崩

/**
var proxy = new events.EventEmitter();
var status = "ready";
var select = function (callback) {
  proxy.once("selected",callback);
  if(status === "ready") {
      status = "pending";
      db.select("SQL",function(results){
          proxy.emit("selected",results);
          status = "ready";
      });

  }
};
*/












































