import React, { Component } from "react";
import "./seach.scss";
import axios from "axios"
import { connect } from "react-redux";
import { Icon } from 'antd-mobile';
class Seach extends Component {
    constructor() {
        super();
        this.state = {
            seachArr: [],
            recordArr: [],
            show:false
        }
    }
    render() {
        // console.log(this.props.history.location.state.id);
        let { groupState } = this.props;
        let{delet}=this.props;
        return (
            <div >
                <p onClick={this.goBack.bind(this)} id="fixed"><Icon type="left" size="md" /></p>
                <p id="shead">{this.props.history.location.state.name}</p>
                <p id="sub"><input ref="inp" type="text" placeholder="请输入学校、商务楼、地址" /> <button onClick={this.seach.bind(this)}>确定</button></p>
                <div>
                    <ul>{this.state.seachArr.map((v, i) => {
                        return (
                            <li onClick={this.skip.bind(this,v,groupState)} className="record" key={i}>
                                <p>{v.name}</p>
                                <p>{v.address}</p>
                                {/* <p>{v.geohash}</p> */}
                            </li>
                        )
                    })}

                    </ul>
                </div>
                <div>                  
                    {this.state.show == true ? <p id="his">历史纪录</p> : ""}
                    <ul>{this.props.recordArr.map((vv, ii) => {
                        return (<li className="record" onClick={this.sk.bind(this,vv)} key={ii}>
                            <p>{vv.name}</p>
                            <p>{vv.address}</p>
                        </li>)
                    })}
                    </ul>
                    {this.state.show==true?<p onClick={this.delete.bind(this,delet)} id="delete">删除历史纪录</p>:""}
                </div>
            </div>
        )
    }
    goBack(){
        this.props.history.goBack();
    }
    seach() {
        this.state.show = false;
        if (this.refs.inp.value == "") {
            return;
        }
        axios.get("https://elm.cangdu.org/v1/pois?city_id=" + this.props.history.location.state.id + "&keyword=" + this.refs.inp.value).then((res) => {
            //console.log(res.data);
            this.setState({
                seachArr: res.data
            });
            // console.log(this.state.seachArr);
        });
    }
    skip(v, a) {
        this.props.history.push("/home",v);
        a(v);
        // console.log(v);
    }
    sk(v){
        this.props.history.push("/home", v);
        // console.log(v);
    }
    verdict(){
        if(this.props.recordArr!=""){
            this.setState({
                show:true
            })
            
        }else{
            // this.state.show=false;
            this.setState({
                show:false
            })
           
        }
    }
    delete(v){
        v();
        this.state.show=false;
    }
    componentDidMount(){
       this.verdict();
    }
}
function mapStateToProps(state) {
    // console.log("mapStateToProps", state);
    return {
        // 这个key会变成组件的属性，通过props就可以获取到
        recordArr: state.sea.recordArr,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // 这个方法会自动映射到属性props上
        groupState(value) {
            dispatch({ type: "city_list", value: value })
        },
        delet(){
            dispatch({ type: "city"})
        }
    }
    
};

Seach = connect(mapStateToProps, mapDispatchToProps)(Seach);
export default Seach;