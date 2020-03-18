import React from 'react';
import './CalcuInfo.css';
import { Button, Progress } from 'antd';
import { getURLWithParam } from '../common/tool';

const CALCUSTATE = {
  BEFRORECALCU: 0,
  PARAMERROR: -1,
  CALCUING: 1,
  FINISHED: 2,
  SERVERERROR: -2,
};

export default class CalcuInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calcuState: CALCUSTATE.BEFRORECALCU,
      percent:0,
    };
  };

  startCalcu = () => {
    
    const params = this.props.params;
    const {KType, DataCate, SpatialMax, TimeMax, SpatialStep, TimeStep, simuTime} = params;
    console.log(this.props.params);
    if(KType === 'Cross'){
      params.DataCate[0] === params.DataCate[1] && alert('交叉K函数入参点数据类型不能相同');
      return false;
    }
    const commitParam = {
      dataSize: 50000,
      maxSpatialDistance: 40,
      maxTemporalDistance: 20,
      spatialStep: 20,
      temporalStep: 20,
      numExecutors: 8,
      executorCores: 8,
      executorMemory: '14g',
    };
    const url = 'http://192.168.200.179:8080/GeoCommerceService/submit.do';

    const urlParam = getURLWithParam(url, commitParam);
    console.log('request url', urlParam);

    fetch(urlParam)
   .then((response) => response.json())
   .then((responseJson) => {
     console.log(responseJson.maxSpatialDistance);
    return responseJson.maxSpatialDistance;
   })
   .catch((error) => {
    console.error(error);
   });

    this.setState({calcuState: CALCUSTATE.CALCUING, percent: 0}, this.changePercent);
  }

  changePercent = () => {
    if(this.state.percent < 100) {
      setTimeout(()=>{
        this.setState({percent: this.state.percent + 1})
        this.changePercent();
      }, 50);
    } else{
      this.setState({calcuState: CALCUSTATE.FINISHED});
    }
  }

  render() {
    return <div className="calcuInfo">
        <h3>集群计算信息</h3>
        { 
          this.state.calcuState === CALCUSTATE.BEFRORECALCU &&
            <Button onClick={this.startCalcu}>点击开始计算</Button>
        }
        { 
          (this.state.calcuState === CALCUSTATE.CALCUING || this.state.calcuState === CALCUSTATE.FINISHED)&&
          <div className="cal-progress">
            <Progress percent={this.state.percent}/>
            <br/> 计算中...<br/>
            <Button>查看详情</Button> {this.state.calcuState === CALCUSTATE.FINISHED && <Button onClick={this.startCalcu}>重新计算</Button>}
          </div>
        }
        
      </div>
  }
}