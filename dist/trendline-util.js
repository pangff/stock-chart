/**
 * Created by pangff on 16/10/10.
 */
function drawTrendLine(data){
    var prices = [];
    var volumes = [];
    var avgPrices = [];
    var times =[];
    for (var i = 0, len = data.length; i < len; i++) {
        prices.push(data[i].last_px);
        volumes.push(data[i].min_business_amount);
        avgPrices.push(data[i].avg_px)
        times.push((data[i].min_time+"").replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, '$4:$5'));
    }

    StockChart.drawTrendLine({
        id: 'trendLine',
        width: document.body.clientWidth - 20,
        height: 180,
        times:times,
        prices: prices,
        volumes: volumes,
        avgPrices: avgPrices,
        preClosePrice: 9.66
    });
}

function drawFiveDayTrendLine(data){
    var prices = [];
    var volumes = [];
    var avgPrices = [];
    var times =[];
    var dateline=[];
    for (var i = 0, len = data.length; i < len; i++) {
        prices.push(data[i].last_px);
        volumes.push(data[i].min_business_amount);
        avgPrices.push(data[i].avg_px)
        times.push((data[i].min_time+"").replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, '$4:$5'));
    }

    dateline[0] = '09-27';
    dateline[1] = '09-28';
    dateline[2] = '09-29';
    dateline[3] = '09-30';
    dateline[4] = '10-10';

    StockChart.drawFiveDayTrendLine({
        id: 'trendLine',
        width: document.body.clientWidth - 20,
        height: 180,
        dateline:dateline,
        times:times,
        prices: prices,
        volumes: volumes,
        avgPrices: avgPrices,
        preClosePrice: 9.66
    });
}


function drawNetWorthLine(data){
    var prices = [];
    var volumes = [];
    var avgPrices = [];
    var times =[];
    var dateline=[];
    for (var i = 0, len = data.length; i < len; i++) {
        prices.push(data[i].last_px);
        volumes.push(data[i].min_business_amount);
        avgPrices.push(data[i].avg_px)
        times.push((data[i].min_time+"").replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, '$4:$5'));
    }

    dateline[0] = '09-27';
    dateline[1] = '09-28';
    dateline[2] = '09-29';
    dateline[3] = '09-30';
    dateline[4] = '10-10';

    StockChart.drawNetWorthLine({
        id: 'trendLine',
        width: document.body.clientWidth - 20,
        height: 180,
        dateline:dateline,
        times:times,
        prices: prices,
        volumes: volumes,
        avgPrices: avgPrices,
        preClosePrice: 9.66
    });
}


