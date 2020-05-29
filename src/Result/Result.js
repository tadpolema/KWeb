import React from 'react';

//导入折线图
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import 'echarts-gl';
import ReactEcharts from 'echarts-for-react';
// import data from './confidence.json';
import dataJson from '../common/result.json';
import './Result.css';
import { isEqual } from 'lodash';
import moment from 'moment'

// const base = -data.reduce(function (min, val) {
//   return Math.floor(Math.min(min, val.l));
// }, Infinity);
// let i = -160;
// 测试数据
let calResults = [{ ...dataJson, time: new Date(2020, 1, 1) }, { ...dataJson, time: new Date(2020, 2, 1) }, { ...dataJson, time: new Date(2020, 3, 1) },
{ ...dataJson, time: new Date(2020, 3, 2) }, { ...dataJson, time: new Date(2020, 3, 3) }, { ...dataJson, time: new Date(2020, 3, 4) }];
export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnailKeys: []
    };
  };

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.calResult, prevProps.calResult)) {
      // calResults.push[this.props.calResult];
    }
  };

  getOption2D = (dataJson) => {
    const conData = [];
    for (let i = 0; i < dataJson.kest.length; i++) {
      conData[i] = {
        value: dataJson.kest[i],
        l: dataJson.kmin[i],
        u: dataJson.kmax[i],
      };
    }
    const data = conData;
    // 空间、交叉k函数
    let option2D = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          animation: false,
          label: {
            backgroundColor: '#ccc',
            borderColor: '#aaa',
            borderWidth: 1,
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            color: '#222'
          }
        },
        formatter: function (params) {
          return params.value;
        }
      },
      grid: {
        top: 30,
        left: '3%',
        right: 30,
        bottom: 30,
        containLabel: true
      },
      xAxis: {
        name: 'd',
        type: 'category',
        data: data.map(function (item, index) {
          return index;
        }),
        axisLabel: {
          formatter: function (value, idx) {
            return idx;
          }
        },
        splitLine: {
          show: false
        },
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#ffffff',
          }
        },

      },
      yAxis: {
        name: `${dataJson.KType}(d)`,
        axisLabel: {
          formatter: function (val) {
            return val;
          }
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return params.value;
            }
          }
        },
        splitNumber: 3,
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#ffffff',
          }
        },
      },
      series: [{
        name: 'L',
        type: 'line',
        data: data.map(function (item, index) {
          return item.l - index * Math.random();
        }),
        lineStyle: {
          opacity: 0
        },
        stack: 'confidence-band',
        symbol: 'none'
      }, {
        name: 'U',
        type: 'line',
        data: data.map(function (item, index) {
          return (item.u - item.l + index * Math.random());
        }),
        lineStyle: {
          opacity: 0
        },
        areaStyle: {
          color: '#ccc'
        },
        stack: 'confidence-band',
        symbol: 'none'
      }, {
        type: 'line',
        data: data.map(function (item) {
          return item.value;
        }),
        hoverAnimation: false,
        symbolSize: 6,
        itemStyle: {
          color: '#c23531'
        },
        showSymbol: false
      }],
    };
    // // 置信度可视化
    // let option2D = {
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'cross',
    //       animation: false,
    //       label: {
    //         backgroundColor: '#ccc',
    //         borderColor: '#aaa',
    //         borderWidth: 1,
    //         shadowBlur: 0,
    //         shadowOffsetX: 0,
    //         shadowOffsetY: 0,
    //         color: '#222'
    //       }
    //     },
    //     formatter: function (params) {
    //       return params[2].value;
    //     }
    //   },
    //   grid: {
    //     top: '3%',
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   xAxis: {
    //     type: 'category',
    //     data: data.map(function (item) {
    //       return item.date;
    //     }),
    //     axisLabel: {
    //       formatter: function (value, idx) {
    //         var date = new Date(value);
    //         // return idx === 0 ? value : [date.getMonth() + 1, date.getDate()].join('-');
    //         return i++;
    //       }
    //     },
    //     splitLine: {
    //       show: false
    //     },
    //     boundaryGap: false,
    //     axisLine: {
    //       lineStyle: {
    //         color: '#ffffff',
    //       }
    //     },

    //   },
    //   yAxis: {
    //     axisLabel: {
    //       formatter: function (val) {
    //         return (val - base);
    //       }
    //     },
    //     axisPointer: {
    //       label: {
    //         formatter: function (params) {
    //           return ((params.value - base) * 100).toFixed(1) + '%';
    //         }
    //       }
    //     },
    //     splitNumber: 3,
    //     splitLine: {
    //       show: false
    //     },
    //     axisLine: {
    //       lineStyle: {
    //         color: '#ffffff',
    //       }
    //     },
    //   },
    //   series: [{
    //     name: 'L',
    //     type: 'line',
    //     data: data.map(function (item) {
    //       return item.l + base;
    //     }),
    //     lineStyle: {
    //       opacity: 0
    //     },
    //     stack: 'confidence-band',
    //     symbol: 'none'
    //   }, {
    //     name: 'U',
    //     type: 'line',
    //     data: data.map(function (item) {
    //       return item.u - item.l;
    //     }),
    //     lineStyle: {
    //       opacity: 0
    //     },
    //     areaStyle: {
    //       color: '#ccc'
    //     },
    //     stack: 'confidence-band',
    //     symbol: 'none'
    //   }, {
    //     type: 'line',
    //     data: data.map(function (item) {
    //       return item.value + base;
    //     }),
    //     hoverAnimation: false,
    //     symbolSize: 6,
    //     itemStyle: {
    //       color: '#c23531'
    //     },
    //     showSymbol: false
    //   }],
    // };
    return option2D;
  }

  // 三维
  // const dataJson = this.props.calResult;
  getOption3D = (dataJson) => {
    var kest = dataJson.kest;
    var kmax = dataJson.kmax;
    var kmin = dataJson.kmin;
    var maxSpaDis = dataJson.maxSpatialDistance;
    var maxTimDis = dataJson.maxTemporalDistance;
    //prepare data
    var spatialNum = kest.length;
    var temporalNum = kest[0].length;
    function prepareData(kest) {
      let dataArray = Array(spatialNum * temporalNum).fill(0);
      for (let i = 0; i < spatialNum; i++) {
        for (let j = 0; j < temporalNum; j++) {
          dataArray[i * temporalNum + j] = [j * (maxTimDis / (temporalNum - 1)), i * (maxSpaDis / (spatialNum - 1)), kest[i][j]];
        }
      }
      return dataArray;
    }
    var kestArray = prepareData(kest);
    var kmaxArray = prepareData(kmax);
    var kminArray = prepareData(kmin);
    // 三维的数据源是 ../common/result.json
    let option3D = {
      title: {},
      tooltip: {},
      legend: {
        show: true,
        textStyle: {
          color: '#fff'
        },
        left: 50,

      },
      backgroundColor: 'rgba(0,0,0,0)',
      xAxis3D: {
        name: 'X: Temporal Distance (Month)',
        type: 'value',
        nameTextStyle: {
          color: '#fff',
          fontSize: 6
        },
        axisLine: { lineStyle: { color: '#fff' } },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff'
          }
        }
      },
      yAxis3D: {
        name: 'Y: Spatial Distance (Meter)',
        type: 'value',
        nameTextStyle: {
          color: '#fff',
          fontSize: 6
        },
        axisLine: { lineStyle: { color: '#fff' } },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff'
          }
        }
      },
      zAxis3D: {
        name: 'Z: Value',
        type: 'value',
        nameTextStyle: {
          color: '#fff',
          fontSize: 6
        },
        axisLine: { lineStyle: { color: '#fff' } },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff'
          }
        }
      },
      grid3D: {
        boxWidth: 100,
        boxDepth: 100,
        boxHeight: 100,
        axisPointer: { lineStyle: { color: '#fff' } },
      },
      series: [{
        name: 'Kest',
        type: 'surface',
        wireframe: {
          // show: false
          color: '#666666'
        },
        shading: 'color',
        itemStyle: {
          opacity: 1,
          color: '#E84904'
        },
        data: kestArray,
      },
      {
        name: 'Kmax',
        type: 'surface',
        wireframe: {
          show: false
        },
        shading: 'color',
        itemStyle: {
          opacity: 0.5,
          color: '#FFD400'
        },
        data: kmaxArray
      },
      {
        name: 'Kmin',
        type: 'surface',
        wireframe: {
          show: false
        },
        shading: 'color',
        itemStyle: {
          opacity: 0.5,
          color: '#7068FF'
        },
        data: kminArray
      }
      ]
    };
    return option3D;
  }

  getOption = (dataJson) => {
    if (dataJson.KType === "ST") {
      return this.getOption3D(dataJson);
    } else {
      return this.getOption2D(dataJson);
    }
  };

  handleMinimize = (key) => {
    const { thumbnailKeys } = this.state;
    this.setState({ thumbnailKeys: [...new Set([...thumbnailKeys, key])] });
  };

  handelMaximize = (key) => {
    const { thumbnailKeys } = this.state;
    const set = new Set(thumbnailKeys);
    set.delete(key);
    this.setState({ thumbnailKeys: [...set] });
  };

  render() {
    // const dataJson = this.props.calResult;
    const { thumbnailKeys } = this.state;
    return (<div>
      <h3>结果展示</h3>
      <div className="allCharts">
        <div className="results-container">
          {
            calResults
              .filter(data => thumbnailKeys.findIndex(key => key === data.time) === -1)
              .map((data, key) => (
                <div className="chart-wrapper" key={key}>
                  <ReactEcharts
                    option={this.getOption(data)}
                    theme="Imooc"
                    style={{ height: '200px', width: '290px' }} />
                  <span>{moment(data.time).format('YYYY-MM-DD h:mm:ss')}</span>
                  <span className="minimize" onClick={() => this.handleMinimize(data.time)}>缩小</span>
                </div>
              ))
          }
        </div>
        <div className={`thumbnails-container ${thumbnailKeys.length === 0 ? 'unshow' : ''}`}>
          {
            calResults
              .filter(data => thumbnailKeys.findIndex(key => key === data.time) !== -1)
              .map((data, key) => (
                <div className="thumbnail-wrapper" key={key} title={moment(data.time).format('YYYY-MM-DD h:mm:ss')}
                  onClick={() => this.handelMaximize(data.time)}>
                  <ReactEcharts
                    option={this.getOption(data)}
                    theme="Imooc"
                    style={{
                      height: '200px', width: '290px', transform: 'scale(0.2)', transformOrigin: '0 0'
                    }} />
                  <div className="mask"></div>
                </div>
              ))
          }
        </div>
      </div>
    </div>)
  }
}
