import React, { Component } from "react";
import styles from "./home.module.scss";
import axios from "axios"
import { Icon } from 'antd-mobile';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import StarRatingComponent from 'react-star-rating-component';
class Home extends Component {
    constructor() {
        super();
        this.state = {
            address: "",
            listA: [],
            listF: [],
            geohash: "",
            shop: []
        }

    }
    render() {
        const { rating } = this.state;
        return (
            <div>
                <div id={styles.a}>
                    <p onClick={this.goBack.bind(this)}><Icon type="left" size="lg"/></p>
                    <p><span>{this.state.address}</span></p>
                </div>
                <div id={styles.b}>
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <ul id={styles.slideshow}>
                                    {this.state.listA.map((v, i) => {
                                        return (<li key={i}>
                                            <p><img src={"https://fuss10.elemecdn.com" + v.image_url} /></p>
                                            <p>{v.title}</p>
                                        </li>)
                                    })}
                                </ul>
                            </div>
                            <div className="swiper-slide">
                                <ul id={styles.slideshow}>
                                    {this.state.listF.map((v, i) => {
                                        return (<li key={i}>
                                            <p><img src={"https://fuss10.elemecdn.com" + v.image_url} /></p>
                                            <p>{v.title}</p>
                                        </li>)
                                    })}
                                </ul>

                            </div>
                        </div>
                        {/* <!-- 如果需要分页器 --> */}
                        <div className="swiper-pagination"></div>
                    </div>
                </div>
                <div className={styles.detail}>
                    <ul>
                        {this.state.shop.map((value, index) => {
                            return (<div key={index}>
                                <li className={styles.shops} >
                                    <div>
                                        <img src={"https://elm.cangdu.org/img/" + value.image_path} />
                                    </div>
                                    <div>
                                        <div id={styles.firstLine}>
                                            <p>品牌</p>
                                            <p>
                                                {value.name}
                                            </p>
                                            <p>{value.supports.map((v, i) => {
                                                return (
                                                    <span key={i}>{v.icon_name}
                                                    </span>)
                                            })}
                                            </p>
                                        </div>
                                        <div id={styles.secondLine}>    
                                            <span>
                                                <span>{rating}</span>
                                                <StarRatingComponent
                                                    name="rate2"
                                                    starCount={5}
                                                    value={value.rating}
                                                />
                                                 {value.rating} 月售{value.recent_order_num}单
                                            </span>
                                            <span>
                                                <span>{value.delivery_mode.text}</span>
                                                <span>{value.supports[1].name}</span>
                                            </span>
                                        </div>
                                        <div id={styles.thirdLine}>
                                            <span>{value.float_minimum_order_amount}起送/{value.piecewise_agent_fee.tips}</span>
                                            <span>
                                                <span>{value.distance}/</span>
                                                <span>{value.order_lead_time}</span>
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </div>)
                        })}
                    </ul>
                </div> 
            </div>
        )
    }
    goBack() {
        this.props.history.goBack();
    }
    adress() {
        // console.log(this.props.history.location.state);
        axios.get("https://elm.cangdu.org/v2/pois/" + this.props.history.location.state.geohash).then((res) => {
            //console.log(res.data);
            this.setState({
                address: res.data.address
            });

            // console.log(this.state.address);
        });
        axios.get("https://elm.cangdu.org/v2/index_entry").then((res) => {
            let alls = Object.keys(res.data);
            let age = [];
            let later = [];
            for (let e = 0; e < alls.length / 2; e++) {
                age.push(res.data[alls[e]])
            }
            for (let f = alls.length / 2; f < alls.length; f++) {
                later.push(res.data[alls[f]])
            }
            this.setState({
                listA: age,
                listF: later
            },
                () => {
                    new Swiper('.swiper-container', {
                        loop: true,
                        // autoplay: {
                        //     disableOnInteraction: false,
                        // },
                        pagination: {
                            el: '.swiper-pagination'
                        }
                    })
                }
            )
            // console.log(this.state.list);
        })
        // console.log(this.props.history.location.state.latitude);
        // console.log(this.props.history.location.state.longitude);
        axios.get("https://elm.cangdu.org/shopping/restaurants?latitude=" + this.props.history.location.state.latitude + "&longitude=" + this.props.history.location.state.longitude).then((res) => {
            // console.log(res.data);
            this.setState({
                shop: res.data,
            });
            // console.log(this.state.shop);
        });

    }
    componentDidMount() {
        this.adress();
    }
}

export default Home;