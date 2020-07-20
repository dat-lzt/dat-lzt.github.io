import './stysle.css'


var filters = {
    all: function(todos) {
        return todos;
    },
    ongoing: function(todos) {
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
var STORAGE_KEY = 'vue2.x-todo-tutorial';
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
let id = 0;
var app = new Vue({
    el: '#todo-app',
    data: function() {
        return {
            todos: todoStorage.fetch(),
            newTodoTitle: '',
            checkEmpty: false,
            editedTodo: null, //处于暂存状态前
            intention: 'all', //默认为全部
            // leftTodosCount: 0,
        }
    },
    methods: {
        addTodo: function() {
            if (this.newTodoTitle === '') {
                this.checkEmpty = true
                return
            }
            this.todos.push({
                id: todoStorage.uid++,
                title: this.newTodoTitle,
                completed: false,
            });
            //神奇的东西
            // this.arr.push('')
            // this.arr.pop()
            // this.arr[9]=9
            // this.$next(()=>{
            //     8
            // })

            this.leftTodosCount = this.todos.length;
            this.completedCount = this.todos.length;
            this.newTodoTitle = ''
            this.checkEmpty = false

        },
        //全部标记为已完成
        markAllAsCompleted: function() {
            this.todos.map(function(todo) {
                if (!todo.completed) {
                    todo.completed = true
                }
            })
        },
        markAllAsUnCompleted: function() {
            this.todos.map(function(todo) {
                if (todo.completed) {
                    todo.completed = false
                }
            })
        },
        //已完成标记
        markAsCompleted: function(todo) {
            todo.completed = true
        },
        //未完成标记
        markAsUnCompleted: function(todo) {
            todo.completed = false
        },
        //删除按钮方法
        removeTodo: function(todo) {
            // if (!confirm('确认删除')) {
            //     return
            // }
            //this.todos.indexOf(todo)定位元素的位置，用splice方法删除
            //1表示只删除一个，即当前位置的元素
            this.todos.splice(this.todos.indexOf(todo), 1)
        },
        //编辑
        editTodo: function(todo) {
            this.editedTodo = {
                id: todo.id,
                title: todo.title,
                completed: todo.completed
            }
        },
        //修改确认
        editDone: function(todo) {
            // const value = e.target.value
            // console.log(e.target.value)
            // todo.title = value
            if (todo.title === "") {
                this.removeTodo(todo)
            }
            this.editedTodo = null

        },
        //按住esc取消编辑
        cancelEdit: function(todo) {
            todo.title = this.editedTodo.title;
            this.editedTodo = null
        },
        clearCompleted: function() {
            this.todos = this.todos.filter(todo => !todo.completed)
        },
        clearAll: function() {
            this.todos = []
        },

    },
    //监测todos列表的变化，将变化存储到localstorage
    watch: {
        // todos: {
        //     handler: function(todos) {
        //         todoStorage.save(todos)
        //     },
        //     deep: true
        // },
        todos: function(todos) {
            todoStorage.save(todos)
        }
    },
    computed: {
        emptyChecked: function() {
            return this.newTodoTitle.length === 0
        },
        leftTodos: function() {
            return this.todos.filter(function(todo) {
                    return !todo.completed
                })
                // return this.todos.filter(todo => !todo.completed)

        },
        leftTodosCount: function() {
            // return this.todos.filter(todo => !todo.completed).length
            // return this.leftTodos.length  
            // this.push(this.leftTodos)
            return this.leftTodos.length

        },
        completedCount: function() {
            return this.todos.filter(todo => todo.completed).length
        },
        filteredTodos: function() {
            // if (this.flag === 'ongoing') {
            //     return !todo.completed
            // } else if (this.flag === 'completed') {
            //     return this.todos.filter(function(todo) {
            //         return todo.completed
            //     })
            // } else {
            //     return this.todos
            // }
            return filters[this.intention](this.todos);
        }
    },
    //输入框自动聚焦
    directives: {
        focus: {
            inserted: function(el) {
                el.focus()
            }
        }
    }
})