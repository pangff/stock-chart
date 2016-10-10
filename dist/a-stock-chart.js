/**
 * Created by pangff on 16/10/9.
 */
var StockChart;
(function (StockChart) {
    var IKLine = (function (_super) {
        __extends(IKLine, _super);
        function IKLine(options) {
            _super.call(this, options);
            this.ohlcPrices = options.ohlcPrices;
            this.volumes = options.volumes;
            this.dates = options.dates;
            this.dataCount = options.dataCount;
            this.volumeTopHeight = this.height - this.volumeHeight + this.textOffsetY;
            this.unitX = this.figureWidth / this.dataCount;
            this.riseColor = options.riseColor;
            this.fallColor = options.fallColor;
            this.period = options.period;
            this.maLists = options.maLists;
            this.cx = -1;
            this.cy = -1;
        }

        IKLine.prototype.popWindowDatas = function (index) {
            var _a = this, prices = _a.prices,dates=_a.dates,  ohlcPrices = _a.ohlcPrices;
            var barColor = this.getBarColor(ohlcPrices, index);
            var percent = ((ohlcPrices[index].c - ohlcPrices[index].o) / ohlcPrices[index].o * 100).toFixed(2) + '%';

            return [{color: _a.popWindowValueColor, value: dates[index]},
                {color: barColor, value:ohlcPrices[index].o},
                {color: barColor, value:ohlcPrices[index].h},
                {color: barColor, value:ohlcPrices[index].l},
                {color: barColor, value:ohlcPrices[index].c},
                {color: barColor, value:percent},
                {color: _a.popWindowValueColor, value:ohlcPrices[index].swap}];
        };
        return IKLine;
    }(StockChart.KLine));

    function drawKLine(options) {
        var defaultOptions = {
            grid: {
                y: 4,
                color: 'rgba(221,221,221,1)'
            },
            lineColor: 'rgba(94,168,199,1)',
            volumeColor: 'rgba(130,152,200,1)',
            riseColor: 'rgba(252,63,29,1)',
            fallColor: 'rgba(85,170,48,1)',
            period: 0,
            popWindowValueColor: 'rgba(0,0,0,1)',
            popWindowKeys: {color: '#939393', keys: ['日期:', '开盘:', '最高:', '最低:', '收盘:', '涨跌:', '换手:']}
        };
        options = StockChart.mixins({}, defaultOptions, options);
        var iKLine = new IKLine(options);
        iKLine.initialize();
        return iKLine;
    }

    StockChart.drawKLine = drawKLine;
})(StockChart || (StockChart = {}));

var StockChart;
(function (StockChart) {
    var ITrendLine = (function (_super) {
        __extends(ITrendLine, _super);
        function ITrendLine(options) {
            _super.call(this, options);
            this.preClosePrice = options.preClosePrice;
            this.prices = options.prices;
            this.volumes = options.volumes;
            this.avgPrices = options.avgPrices;
            this.fillColor = options.fillColor;
            this.middleLineColor = options.middleLineColor;
            this.volumeColor = options.volumeColor;
            this.riseColor = options.riseColor;
            this.avgLineColor = options.avgLineColor;
            this.isIndex = options.isIndex;
            this.popWindowKeys = options.popWindowKeys;
            this.popWindowValueColor = options.popWindowValueColor;
        }
        ITrendLine.prototype.getPointsCount=function(){
            return 240;
        };
        ITrendLine.prototype.popWindowDatas = function (index) {
            var _a = this, avgPrices= _a.avgPrices,prices = _a.prices, volumes = _a.volumes, times = _a.times, preClosePrice=_a.preClosePrice;
            var calcPercent = function (price) {
                return ((price - preClosePrice) / preClosePrice * 100).toFixed(2) + '%';
            };
            var getTextColor = function(price){
                if(price>preClosePrice){
                    return _a.riseColor;
                }else if(price<preClosePrice){
                    return _a.fillColor;
                }else{
                    return  _a.popWindowValueColor;
                }
            };
            var percent = calcPercent(prices[index]);

            return [{color: _a.popWindowValueColor, value: times[index]},
                {color: getTextColor(prices[index]), value: avgPrices[index]},
                {color: getTextColor(prices[index]), value: prices[index]},
                {color: getTextColor(prices[index]), value:percent},
                {color: _a.popWindowValueColor, value: volumes[index]}];
        };

        return ITrendLine;
    }(StockChart.TrendLine));

    function drawTrendLine(options) {
        var defaultOptions = {
            grid: {
                x: 4,
                y: 4,
                color: 'rgba(221,221,221,1)'
            },
            fillColor: 'rgba(187,226,246,.5)',
            middleLineColor: 'rgba(112,179,215,1)',
            volumeColor: 'rgba(130,152,200,1)',
            riseColor: 'rgba(252,63,29,1)',
            avgLineColor: 'rgba(169,77,180,.5)',
            popWindowValueColor: 'rgba(0,0,0,1)',
            popWindowKeys: {color: '#939393', keys: ['时间:','均价:', '现价:', '涨跌:', '现量:']}
        };
        options = StockChart.mixins({}, defaultOptions, options);
        var iTrendLine = new ITrendLine(options);
        iTrendLine.initialize();
    }
    StockChart.ITrendLine = ITrendLine;
    StockChart.drawTrendLine = drawTrendLine;
})(StockChart || (StockChart = {}));
var StockChart;
(function (StockChart) {
    var IFiveDayTrendLine = (function (_super) {
        __extends(IFiveDayTrendLine, _super);
        function IFiveDayTrendLine(options) {
            _super.call(this, options);
            this.dateline = options.dateline;
        }
        IFiveDayTrendLine.prototype.getPointsCount=function(){
            return 240*5;
        };
        IFiveDayTrendLine.prototype.drawAxisText = function () {
            var _a = this, ctx = _a.ctx, dpr = _a.dpr, grid = _a.grid, height = _a.height, axisTextHeight = _a.axisTextHeight, figureWidth = _a.figureWidth, figureHeight = _a.figureHeight, figureOffsetHeight = _a.figureOffsetHeight, figureOffsetY = _a.figureOffsetY, textOffsetY = _a.textOffsetY, volumeHeight = _a.volumeHeight;
            var _b = this,dateline=_b.dateline, roofPrice = _b.roofPrice, floorPrice = _b.floorPrice, preClosePrice = _b.preClosePrice, roofPercent = _b.roofPercent, floorPercent = _b.floorPercent;
            var axisY = height - textOffsetY;
            var roofY = figureOffsetY - textOffsetY;
            var floorY = figureHeight - textOffsetY;
            ctx.font = this.font.replace(/(\d+)(px|em|rem|pt)/g, function (matched, m1, m2) {
                return m1 * dpr + m2;
            });

            for(var i=0;i<dateline.length;i++){
                var wordsWidth = ctx.measureText(dateline[i]).width / dpr;
                var cellWidth = figureWidth / dateline.length;
                var halfCellWidth = figureWidth / dateline.length/2;
                this.drawText(dateline[i], [(cellWidth)*i+halfCellWidth-wordsWidth/2,axisY]);
            }

            this.drawText(roofPrice.toFixed(2), [0, roofY]);
            this.drawText(floorPrice.toFixed(2), [0, floorY]);
            this.drawText(preClosePrice.toFixed(2), [0, figureOffsetHeight / 2 + roofY]);

            var roofPercentWidth = ctx.measureText(roofPercent).width / dpr;
            this.drawText(roofPercent, [figureWidth - roofPercentWidth, roofY]);
            var floorPercentWidth = ctx.measureText(floorPercentWidth).width / dpr;
            this.drawText(floorPercent, [figureWidth - floorPercentWidth, floorY]);
            var zeroTextWidth = ctx.measureText('0.00%').width / dpr;
            this.drawText('0.00%', [figureWidth - zeroTextWidth, figureOffsetHeight / 2 + roofY]);

        };

        IFiveDayTrendLine.prototype.drawGridYLine=function(){
            var _a = this, ctx = _a.ctx, grid = _a.grid, textOffsetY = _a.textOffsetY, axisTextHeight = _a.axisTextHeight, height = _a.height, figureWidth = _a.figureWidth;
            for (var i = 1; i < 5; i++) {
                ctx.beginPath();
                this.drawDashedLine(
                    [(figureWidth / 5) * i, 0],
                    [(figureWidth / 5) * i, height - axisTextHeight - textOffsetY], 4, grid.color);
                ctx.stroke();
            }
        };

        return IFiveDayTrendLine;
    }(StockChart.ITrendLine));

    function drawFiveDayTrendLine(options) {
        var defaultOptions = {
            grid: {
                x: 4,
                y: 4,
                color: 'rgba(221,221,221,1)'
            },
            fillColor: 'rgba(187,226,246,.5)',
            middleLineColor: 'rgba(112,179,215,1)',
            volumeColor: 'rgba(130,152,200,1)',
            riseColor: 'rgba(252,63,29,1)',
            avgLineColor: 'rgba(169,77,180,.5)',
            popWindowValueColor: 'rgba(0,0,0,1)',
            popWindowKeys: {color: '#939393', keys: ['时间:','均价:', '现价:', '涨跌:', '现量:']}
        };
        options = StockChart.mixins({}, defaultOptions, options);
        var iFiveDayTrendLine = new IFiveDayTrendLine(options);
        iFiveDayTrendLine.initialize();
    }

    StockChart.drawFiveDayTrendLine = drawFiveDayTrendLine;
})(StockChart || (StockChart = {}));