const defaultState = {
    recordArr: [],
}

function render(state = defaultState, action) {
    switch (action.type) {
        case "city_list":
            var tempState = JSON.parse(JSON.stringify(state));
            if(tempState.recordArr.length==0){
                tempState.recordArr.push(action.value);
            }else{
                for(var i=0;i<tempState.recordArr.length;i++){
                    if(tempState.recordArr[i].name!=action.value.name){
                        tempState.recordArr.push(action.value);
                    }
                }
            }
            //返回修改后的状态
            return tempState;
        case "city":
             tempState = JSON.parse(JSON.stringify(state));
            tempState.recordArr = [];
            //返回修改后的状态
            return tempState;
        default:
            return state;
    }

}
export default render;