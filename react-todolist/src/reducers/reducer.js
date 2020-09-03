import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM } from '../actions/index';
import { message } from 'antd';

// 去除前后空格
function Trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
const defaultState = {
        inputValue: "Write Something",
        list: [

        ]
    } //默认数据
export default (state = defaultState, action) => { //就是一个方法函数
    if (action.type === CHANGE_INPUT) {
        let newState = JSON.parse(JSON.stringify(state)); //深拷贝，将js对象转成字符串，再反序列化还原
        newState.inputValue = action.value;
        return newState;
    }
    if (action.type === ADD_ITEM) {
        let newState = JSON.parse(JSON.stringify(state));
        if (Trim(newState.inputValue) === '') {
            message.error('输入表单内不能为空,请输入内容');
        } else {
            newState.list.push(newState.inputValue);
            newState.inputValue = '';
            console.log(newState)
            return newState;
        }
    }
    if (action.type === DELETE_ITEM) {
        let newState = JSON.parse(JSON.stringify(state)); //深拷贝，将js对象转成字符串，再反序列化还原
        newState.list.splice(action.index, 1);
        return newState;
    }
    // console.log("reducer" + state, action);
    return state;
}