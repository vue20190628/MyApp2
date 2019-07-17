import React, { Component } from "react";
import "./cityHome.scss";
import axios from "axios"
import { connect } from "react-redux";
// import CityGroup from "./compontents/citycompents/group";
class City extends Component {
    constructor() {
        super();
        this.state = {
            cityData: [],
            cityGroup: [],
            everyGroup: [],
        };
        this.locationCllick = this.locationCllick.bind(this)
    }

    render() {
        let { cityData } = this.state;
        // var {cityGroup}=this.state;
        return (
            <div id="wrap">
                <div id="head"><p>ele.cn</p><p>登陆/注册</p></div>
                {/* 定位城市 */}
                <p>定位城市</p>
                <p onClick={this.locationCllick.bind(this, this.props.location)}>{this.props.location.name}</p>
                {/* 热门城市 */}
                <div>
                    <p id="hot">热门城市</p>
                    <ul id="one">
                        {cityData.map((person, index) => {
                            return (<li className="ones" onClick={() => { this.locationCllick(person); }} key={index}>{person.name}</li>)
                        })}
                    </ul>
                </div> 
                {/* 所有城市 */}
                <div id="alls">
                    <ul >
                        {this.state.cityGroup.map((va, ii) => {
                            return (
                                <li className="letter" key={ii}>
                                    <p id="p1">{va}<span>{va == "A" ? "(按字母排序)" : ""}</span></p>
                                    <ul className="content">
                                        {this.state.everyGroup[ii].map((v, i) => {
                                            return (<li onClick={this.locationCllick.bind(this, v)} className="all" key={i}>{v.name}</li>)
                                        })}
                                    </ul>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
    locationCllick(v) {
        // console.log( this.state.cityData[v].name);
        this.props.history.push("/seach", v);
    }
    componentDidMount() {
        axios.get("https://elm.cangdu.org/v1/cities?type=guess").then((res) => {
            this.props.locationCity(res.data)
        });
        axios.get("https://elm.cangdu.org/v1/cities?type=hot").then((res) => {
            this.setState({
                cityData: res.data

            });
            // console.log(this.state.cityData);
        });
        axios.get("https://elm.cangdu.org/v1/cities?type=group").then((res) => {

            let letter = Object.keys(res.data);
            letter.sort();
            // console.log(letter);
            let eve = [];
            for (let i = 0; i < letter.length; i++) {
                eve.push(res.data[letter[i]]);
            }
            // console.log(eve);
            this.setState({
                cityGroup: letter,
                everyGroup: eve
            });
            // console.log(this.state.cityGroup);
            //   console.log(this.state.everyGroup);
        });

    }

}
function home(state) {
    return {
        location: state.cityReducer.location,
        cityData: state.cityReducer.cityData,
        cityGroup: state.cityReducer.cityGroup,
    }

}
const maps = (dispatch) => {
    return {
        locationCity(loc) {
            dispatch({ type: "city_list_location", loc: loc })
        },
        mapState(data) {
            dispatch({ type: "city_list_action", data: data })
        },
        groupState(value) {
            dispatch({ type: "city_list", value: value })
        },
    }
}
City = connect(home, maps)(City);
export default City
