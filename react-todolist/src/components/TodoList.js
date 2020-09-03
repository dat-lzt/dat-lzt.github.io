import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd';
import store from '../store'
import { CHANGE_INPUT , ADD_ITEM , DELETE_ITEM } from '../actions/index';

//假数据
// const data = [

// ]

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = store.getState();
        // console.log(this.state)
        this.storeChange = this.storeChange.bind(this);
        //更新组件
        store.subscribe( this.storeChange);
    }
    storeChange() {
        this.setState(store.getState());
    }
    onChange(e) {
        const action = {
            type: CHANGE_INPUT,
            value: e.target.value
        }
        store.dispatch(action);
        // console.log(e.target.value)
    }
    onClick() {
        const action = {
            type: ADD_ITEM,
        }
        store.dispatch(action);
    }
    onDeleteItem(index) {
        console.log(index)
        const action = {
            type: DELETE_ITEM,
            index
        }
        store.dispatch(action);
    }
   
    render() {
        return (
            <div>
                <div>
                    <Input style={{ width: '250px', margin: '20px 0' }} value={this.state.inputValue}
                        placeholder={this.state.inputValue} onChange={e => this.onChange(e)}></Input>
                    <Button style={{ marginLeft: '5px' }} type="primary"
                        onClick={()=>this.onClick()}>Add</Button>
                </div>
                <div style={{ margin: '2px', width: '300px' }}>
                    <List
                        bordered
                        dataSource={this.state.list}
                        renderItem={(item,index) => (<List.Item onClick={() => this.onDeleteItem(index)}>{item}</List.Item>)}
                    />
                </div>
            </div>
        )
    }
}
export default TodoList;