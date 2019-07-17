//最大的reducer整合来自各个组件的reducer
import cityReducer from '../common/cityHome/store/reducer'
import sea from '../common/seach/store/reducer'
// 用来合并reducer
import {combineReducers} from "redux";
 let reducer=combineReducers({
    cityReducer:cityReducer,
    sea:sea,
});
export default reducer;