let http = require('https');
let baseurl = `https://otcbtc.com/sell_offers?fiat_currency=cny&payment_type=all&currency=`;
    let cheerio = require('cheerio');
let Promise = require('promise');
let otcArray = ['eos','btc','eth','gxs'];
let fetchOtcArray = [];

let filterChapters = (html) => {
    var $ = cheerio.load(html);
    var solution = $('.show-solution-box-normal');
    var curData = {}
    var recommendCard = solution.find('.recommend-card')[0];
    curData.lowPrice = $(recommendCard).find('.recommend-card__price').text().trim();
    curData.username = $(recommendCard).find('.recommend-card__user-name a').text().trim();
    curData.num = $(recommendCard).find('.recommend-card__amount-range').text().trim();
    curData.title = $(recommendCard).find('.recommend-card__unit').text().trim();

    return curData;

};


let printCourseInfo = (courseData)=>{
    courseData.forEach(function(item){
        console.log(`--- ${item.title} ---\n出售人：${item.username}\n最低价格：${item.lowPrice}\n出售价格：\n${item.num}\n--------`);
    });
};


let getPageAsync = (url) =>{
    return new Promise((resolve,reject)=>{
        let html = '';
        http.get(url,(res)=>{
            res.on('data',(data)=>{
                html += data;
            });
            res.on('end',()=>{
                resolve(html)
            })
        }).on('error',(error)=>{
            reject(error);
            console.log('出错了')
        })

    })
};

otcArray.forEach((name)=>{
    fetchOtcArray.push(getPageAsync(baseurl+name))
});


Promise
    .all(fetchOtcArray)
    .then((pages)=>{
        let data = [];
        pages.forEach((html)=>{
            var res = filterChapters(html);
            data.push(res)
        });
        printCourseInfo(data)
    });