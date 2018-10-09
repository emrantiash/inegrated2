//Backend Logics Coded By Manal @16 September, 2018

const ChartConfigurations = (data, chartType, quote, loadType, range,scale) => {
    var Highcharts = 'Highcharts';

    const dynamicConfig = {
        chart: {
            animation: Highcharts.svg, 
            padding:20,                  
            events: {
                load: function () {
                    //Pure JS only. No React Codes
                    var interval = 10 * 1000; //Set Update Interval
                    var series = this.series[0]; //Getting the series 

                    //Get Last TimeStamp from Old DataSet and Generate New Time                   
                    var oldDataLength = series.options.data.length;
                    var oldTime = series.options.data[oldDataLength - 1][0];
                    var newTime = oldTime + interval;

                    //Getting Series name as quote symbol
                    var name = series.options.name;

                    //API call prerequisite
                    var root = "https://api-webtrader.ifxdb.com/";
                    var arg = {
                        "method": "getOhlc",
                        "params": {
                            "symbol": name,
                            "period": 'm1',
                            "type": 4
                        }
                    }
                    var body = 'rpc=' + JSON.stringify(arg);
                    setInterval(function () {
                        fetch(root, { method: "POST", body: body })
                            .then(res => res.json())
                            .then(json => {
                                var len = json.result.data.length;
                                var lastObj = json.result.data[len - 1];
                                var x = newTime,      //lastObj.timestamp*1000, 
                                    o = lastObj.open, //Open
                                    h = lastObj.high, //High
                                    l = lastObj.low,  //Low
                                    c = lastObj.close; //Close
                                newTime += interval;
                                series.addPoint([x, o, h, l, c], true, true);
                            })
                    }, interval);
                }
            }
        },
        title: {
            text: ''
        },
        navigator: {
            enabled: true
        },
        rangeSelector: {
            inputPosition: {
                align: 'right',
                x: 0,
                y: 0
            },
            buttons: [{
                type: 'hour',
                count: 1,
                text: '1H'
            },{
                type: 'hour',
                count: 3,
                text: '3H'
            },{
                type: 'hour',
                count: 6,
                text: '6H'
            },{
                type: 'day',
                count: 1,
                text: '1D'
            }, {
                type: 'week',
                count: 1,
                text: '1W'
            }, {
                type: 'month',
                count: 1,
                text: '1M'
            }, {
                type: 'month',
                count: 6,
                text: '6M'
            }, {
                type: 'year',
                count: 1,
                text: '1Y'
            },{
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: scale
        },
        series: [{
            name: quote,
            type: chartType,
            data: data,
            step: true,
            tooltip: {
                valueDecimals: 4
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 1,
                    y2: 1
                },
                stops: [
                    [0, '#7798BF'],
                    [1, '#8085e9']
                ]
            },     
            dataGrouping: {
                //enabled: scale==0?true:false
                enabled: true
            }
        }],        
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            area: {
              stacking: 'present'        
            }
        }       
    };

    const dynamicConfigNoRange = {
        chart: {
            animation: Highcharts.svg,
            padding:20,            
            events: {
                load: function () {
                    //Pure JS only. No React Codes
                    var interval = 10 * 1000; //Set Update Interval
                    var series = this.series[0]; //Getting the series 

                    //Get Last TimeStamp from Old DataSet and Generate New Time                   
                    var oldDataLength = series.options.data.length;
                    var oldTime = series.options.data[oldDataLength - 1][0];
                    var newTime = oldTime + interval;

                    //Getting Series name as quote symbol
                    var name = series.options.name;

                    //API call prerequisite
                    var root = "https://api-webtrader.ifxdb.com/";
                    var arg = {
                        "method": "getOhlc",
                        "params": {
                            "symbol": name,
                            "period": 'm1',
                            "type": 4
                        }
                    }
                    var body = 'rpc=' + JSON.stringify(arg);
                    setInterval(function () {
                        fetch(root, { method: "POST", body: body })
                            .then(res => res.json())
                            .then(json => {
                                var len = json.result.data.length;
                                var lastObj = json.result.data[len - 1];
                                var x = newTime,      //lastObj.timestamp*1000, 
                                    o = lastObj.open, //Open
                                    h = lastObj.high, //High
                                    l = lastObj.low,  //Low
                                    c = lastObj.close; //Close
                                newTime += interval;
                                series.addPoint([x, o, h, l, c], true, true);
                            })
                    }, interval);
                }
            }
        },
        title: {
            text: ''
        },
        navigator: {
            enabled: true
        },
        rangeSelector: {   
            inputEnabled:false,         
            buttons: [{
                type: 'hour',
                count: 1,
                text: '1H'
            },{
                type: 'hour',
                count: 3,
                text: '3H'
            },{
                type: 'hour',
                count: 6,
                text: '6H'
            },{
                type: 'day',
                count: 1,
                text: '1D'
            }, {
                type: 'week',
                count: 1,
                text: '1W'
            }, {
                type: 'month',
                count: 1,
                text: '1M'
            }, {
                type: 'month',
                count: 6,
                text: '6M'
            }, {
                type: 'year',
                count: 1,
                text: '1Y'
            }],
            selected: scale
        },
        series: [{
            name: quote,
            type: chartType,
            data: data,
            step: true,
            tooltip: {
                valueDecimals: 4
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 1,
                    y2: 1
                },
                stops: [
                    [0, '#7798BF'],
                    [1, '#8085e9']
                ]
            },  
            dataGrouping: {
                //enabled: scale==0?true:false
                enabled: true
            }
        }],        
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            area: {
              stacking: 'present'          
            }
        }
    };

    const staticConfig = {
        title: {
            text: ''
        },
        navigator: {
            enabled: true
        },
        rangeSelector: {
            inputPosition: {
                align: 'right',
                x: 0,
                y: 0
            },
            buttons: [{
                type: 'day',
                count: 1,
                text: '1D'
            }, {
                type: 'week',
                count: 1,
                text: '1W'
            }, {
                type: 'month',
                count: 1,
                text: '1M'
            }, {
                type: 'month',
                count: 6,
                text: '6M'
            }, {
                type: 'year',
                count: 1,
                text: '1Y'
            }, {
                type: 'year',
                count: 3,
                text: '3Y'
            }, {
                type: 'all',
                count: 1,
                text: 'All'
            }],
            selected: 6
        },
        series: [{
            name: quote,
            type: chartType,
            data: data,
            step: true,
            tooltip: {
                valueDecimals: 4
            },
            dataGrouping: {
                enabled: true
            }
        }],
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        }
    };

    const staticConfigNoRange = {
        title: {
            text: ''
        },
        navigator: {
            enabled: true
        },
        rangeSelector: {
            enabled: false
        },
        series: [{
            name: quote,
            type: chartType,
            data: data,
            step: true,
            tooltip: {
                valueDecimals: 4
            },
            dataGrouping: {
                enabled: true
            }
        }],
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        }
    };

    if (range) {
        if (loadType)
            return dynamicConfig;
        else
            return staticConfig;
    }
    else {
        if (loadType)
            return dynamicConfigNoRange;
        else
            return staticConfigNoRange;
    }
}

export { ChartConfigurations }