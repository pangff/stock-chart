var ohlcPrices = [];
var volumes = [];
var dates = [];
var ma5Prices = [];
var ma10Prices = [];
var ma20Prices = [];
var kline;
var lastIndex = 0;
var scrollX;
var dataCount = 40;
var data;

function drawKline(datas) {
    data = datas;
    setUpData(-10000, (document.body.clientWidth - 20) / dataCount);
    kline = StockChart.drawKLine({
        id: 'kLine',
        width: document.body.clientWidth - 20,
        height: 180,
        dataCount: dataCount,
        period: 'Month',
        ohlcPrices: ohlcPrices,
        volumes: volumes,
        dates: dates,
        maLists: [
            {
                title: 'MA5',
                prices: ma5Prices
            },
            {
                title: 'MA10',
                prices: ma10Prices
            },
            {
                title: 'MA20',
                prices: ma20Prices
            }
        ],
        period: 0,
        moveListener: moveListener
    });
}


function setUpData(dx, unitX) {

    maxScroll = (data.length - dataCount) * unitX;
    if (maxScroll < 0) {
        maxScroll = 0;
    }
    //如果在边界上无效滑动那么scrollX将不会再变化
    if (scrollX - dx <= 0 && dx > 0) {
        scrollX = 0;
    } else if (scrollX - dx >= maxScroll && dx < 0) {
        scrollX = maxScroll;
    } else {
        scrollX -= dx;
    }
    lastIndex = Math.round(scrollX / unitX);
    ohlcPrices = [];
    volumes = [];
    dates = [];
    ma5Prices = [];
    ma10Prices = [];
    ma20Prices = [];
    for (var i = lastIndex, len = data.length; i < len && i < lastIndex + dataCount; i++) {
        ohlcPrices.push({
            o: parseFloat(data[i].open_px),
            h: parseFloat(data[i].high_px),
            l: parseFloat(data[i].low_px),
            c: parseFloat(data[i].close_px),
            swap:'0.1%'
        });
        volumes.push(parseFloat(data[i].business_amount));
        dates.push(data[i].min_time.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2'));
        ma5Prices.push(parseFloat(data[i].ma5));
        ma10Prices.push(parseFloat(data[i].ma10));
        ma20Prices.push(parseFloat(data[i].ma20));
    }
}


// console.log(ohlcPrices);

var moveListener = function (dx, unitX) {

    setUpData(dx, unitX);
    kline.refresh({
        ohlcPrices: ohlcPrices,
        volumes: volumes,
        dates: dates,
        maLists: [
            {
                title: 'MA5',
                prices: ma5Prices
            },
            {
                title: 'MA10',
                prices: ma10Prices
            },
            {
                title: 'MA20',
                prices: ma20Prices
            }
        ]
    });
};


