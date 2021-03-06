function Gcw(options = {}) {
    this.$options = options;
    let data = this._data = this.$options.data;
    observe(data);
    for(let key in data){
        Object.defineProperty(this,key,{
            enumerable:true,
            get() {
                return this._data[key];
            },
            set(newVal) {
                this._data[key] = newVal;
            }
        })
    }
    new Compile(options.el,this);
}

function Compile(el,vm) {
    //el 表示替换的范围
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();
    while(child = vm.$el.firstChild) {//将#app中的内容引用到内存中
        fragment.appendChild(child);
    }
    replace(fragment);
    function replace(fragment) {
        Array.from(fragment.childNodes).forEach(function(node){
            let text = node.textContent;
            let reg = /\{\{(.*)\}\}/;
            if(node.nodeType === 3 && reg.test(text)){
                console.log(node);
                console.log(RegExp.$1);
                let arr = RegExp.$1.split('.');
                let val = vm;
                arr.forEach(function(k){
                    val = val[k]
                });
                node.textContent = text.replace(/\{\{(.*)\}\}/,val)
            }
            if(node.childNodes){
                replace(node);
            }
        });
    }

    vm.$el.appendChild(fragment);
}

function Observe(data) {
    for (let key in data) {
        let val = data[key];
        observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            get() {
                return val
            },
            set(newVal) {
                if(val === newVal) {
                    return;
                }
                val =  newVal
                observe(val)
            }
        })
    }
}


function observe(data) {
    if(typeof data!=='object') return;
    return new Observe(data)
}
