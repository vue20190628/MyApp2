// 引入创建存储器的方法
import { createStore } from 'redux'
import reducer from './reducer';
//创建存储器:返回一个管理对象 
// store作用：获取状态修改状态
let store = createStore(reducer);
// createStore被执行后，reducer方法会执行一次为了获取到初始状态
export default store;