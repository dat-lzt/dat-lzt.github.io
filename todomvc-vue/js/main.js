import '../common/base.css'
import '../common/index.css'
var filterse = {
    all: function(todos) {
        return todos;
    },
    active: function(todos) {
        return todos.filter(function(todo) {
            return !todo.completed;
        });
    },
    completed: function(todos) {
        return todos.filter(function(todo) {
            return todo.completed;
        });
    }
};
var STORAGE_KEY = 'div-todomvcs';
var todoStorage = {
    fetch: function() {
        //获取
        var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
            // console.log(todos)
        todos.forEach(function(todo, index) {
            todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function(todos) {
        //存入
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
};
(function() {
    window.app = new Vue({
        // el: "#app",
        data: {
            message: 'todos_lzt',
            todos: todoStorage.fetch(),
            // todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
            todoText: '',
            currentEditting: null, //用于暂存编辑前的todo状态
            filterText: 'all',
        },
        methods: {
            handleNewTodo() {
                //const todoText = this.todoText.trim()
                //const todos = this.todos;
                if (!this.todoText.length) {
                    return
                }
                this.todos.push({
                    id: todoStorage.uid++,
                    title: this.todoText,
                    completed: false,
                });
                this.todoText = '' //添加完后清空
                this.leftTodosCount = this.todos.length;
            },
            handleRemoveTodo(index) {
                //index定位元素位置，1表示只删除一个，即删除当前位置元素
                this.todos.splice(index, 1);
            },
            handleGetEdittingDblclick(todo) {
                this.currentEditting = todo;
            },
            handleSaveEdit(todo, index, e) {
                //获取文本框数据
                const value = e.target.value;
                if (!value.length) {
                    this.todos.splice(index, 1);
                } else {
                    todo.title = value
                    this.currentEditting = null
                }
            },
            handleCanceEditEsc() {
                //取消样式即可
                this.currentEditting = null;
            },
            handleClearCompleted() { //点击clear completed清除已完成的选项
                //注意不要在foreach中删除元素，可以使用for循环，每删一个可以手动的改变索引
                for (var i = 0; i < this.todos.length; i++) {
                    if (this.todos[i].completed) {
                        this.todos.splice(i, 1)
                        i--
                    }
                }
            },
            clearAll() {
                return this.todos = []
            }
        },
        computed: {

            leftTodos() {
                return this.todos.filter(todo => !todo.completed)
            },
            leftTodosCount() {
                return this.leftTodos.length
                    // get() {
                    //     return this.todos.filter(t => !t.completed).length
                    // }
            },
            toggleAllStat: {
                get() {
                    //计算属性知道他依赖todos
                    //当 todos 发生改变的时候，计算属性也会发生变化
                    return this.todos.every(t => t.completed)
                },
                set() {
                    //在自己的方法中调用自己就是访问自己的 get 方法
                    const checked = !this.toggleAllStat
                    this.todos.forEach(item => {
                        item.completed = checked
                    })
                }
            },
            filterTodos() {
                return filterse[this.filterText](this.todos);
                // switch (this.filterText) {
                //     case 'active':
                //         return this.todos.filter(t => !t.completed)
                //         break
                //     case 'completed':
                //         return this.todos.filter(t => t.completed)
                //         break
                //     default:
                //         return this.todos
                //         break
                // }
            }
        },
        watch: {
            todos: {
                handler: function(todos) {
                    todoStorage.save(todos)
                },
                deep: true
            },
            // todos: function(todos) {
            //     todoStorage.save(todos)
            // }
        },
        //自定义指令，输入框自动聚焦
        directives: {
            focus: {
                inserted: function(el) {
                    el.focus()
                }
            }
        }
    }).$mount('#app')
})()