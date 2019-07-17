const defaultState = {
    location:"",
    cityData: [],
    cityGroup:[],
    cityLoId:"",
}
function render(state = defaultState, action) {
    switch (action.type) {
        case "city_list_location":
            var tempState = JSON.parse(JSON.stringify(state));
            tempState.location = action.loc;
            //返回修改后的状态
            return tempState;
        case "city_list_action":
           tempState = JSON.parse(JSON.stringify(state));
            tempState.cityData = action.data;
            //返回修改后的状态
            return tempState;
        case "city_list":
            tempState = JSON.parse(JSON.stringify(state));
            tempState.cityGroup = action.value;
            //返回修改后的状态
            return tempState;
        default:
            return state;
    }

}
export default render;