// import './assets/css/base.css'
// import './assets/css/index.css'

var $ = function(sel) {
    return document.querySelector(sel);
};
var $All = function(sel) {
    return document.querySelectorAll(sel);
};
var uid = 0;
var CL_COMPLETED = 'completed'; //完成
var CL_EDITING = 'editing'; //编辑
var CL_SELECTED = 'selected';

function addTodo(todoText) {
    var todoList = $('.todo-list');
    //创建一个新的li元素
    var item = document.createElement('li');
    var id = 'item' + uid++;
    console.log(id);
    // console.log(uid);
    //相当于id=“id”
    item.setAttribute('id', id);
    item.innerHTML = [
        '<div class="view">',
        '  <input class="toggle" type="checkbox">',
        '  <label class="todo-label">' + todoText + '</label>',
        '  <button class="destroy"></button>',
        '</div>'
    ].join('');
    console.log(todoText);
    //在列表子元素之前插入新的子节点
    todoList.insertBefore(item, todoList.firstChild);
    //将单个todo标为完成
    item.querySelector('.toggle').addEventListener('change', function() {
        updateTodo(id, this.checked);
    });
    //删除单个todo
    item.querySelector('.destroy').addEventListener('click', function() {
        removeTodo(id);
    });

    //双击lable进行编辑，增加按esc键取消编辑内容不变
    //
    var label = item.querySelector('.todo-label');
    label.addEventListener('dblclick', function() {
        item.classList.add(CL_EDITING); //编辑框样式

        var edit = document.createElement('input');
        var finshed = false;
        edit.setAttribute('type', 'text');
        edit.setAttribute('class', 'edit');
        edit.setAttribute('value', label.innerHTML);

        function finish() {
            if (finshed) {
                return;
            }
            finshed = true;
            item.removeChild(edit);
            item.classList.remove(CL_EDITING);

        }
        //当edit失去焦点是执行（‘blur’）
        edit.addEventListener('blur', function() {
            finish();
        });
        edit.addEventListener('keyup', function(ev) {
            if (ev.keyCode == 27) { //ESC
                finish();
            } else if (ev.keyCode == 13) { //enter
                if (!this.value.length) {
                    removeTodo(id);
                }
                label.innerHTML = this.value;
                finish();
            }
        });
        item.appendChild(edit);
        edit.focus();
    }, false);
    update();
}
//将单个todo标为完成
function updateTodo(itemId, completed) {
    //相当于document.querySelector(‘.toggle’);
    var item = $('#' + itemId);
    if (completed) {
        item.classList.add(CL_COMPLETED);
    } else {
        item.classList.remove(CL_COMPLETED);
    }
    update();
}
//删除单个todo
function removeTodo(itemId) {
    var todoList = $('.todo-list');
    var item = $('#' + itemId);
    //DOM操作，删除列表中的一个项目
    todoList.removeChild(item);
    update();
}
//清除已完成事件
function ClearCompleted() {
    var todoList = $('.todo-list');
    var items = todoList.querySelectorAll('li');
    for (var i = items.length - 1; i >= 0; --i) {
        var item = items[i];
        if (item.classList.contains(CL_COMPLETED)) {
            todoList.removeChild(item);
        }
    }
    update();
}

function ClearAll() {
    var todoList = $('.todo-list');
    var items = todoList.querySelectorAll('li');
    for (var i = items.length - 1; i >= 0; --i) {
        var item = items[i];
        todoList.removeChild(item);
    }
    update();
}

function ClearActive() {
    var todoList = $('.todo-list');
    var items = todoList.querySelectorAll('li');
    for (var i = items.length - 1; i >= 0; --i) {
        var item = items[i];
        if (!item.classList.contains(CL_COMPLETED)) {
            todoList.removeChild(item);
        }
    }
    update();

}
//全部标记为完成
function toggleAllTodoList() {
    var items = $All('.todo-list li');
    var toggleAll = $('.toggle-all');
    var checked = toggleAll.checked;
    for (var i = 0; i < items.length; ++i) {
        var item = items[i];
        var toggle = item.querySelector('.toggle');
        if (toggle.checked != checked) {
            toggle.checked = checked;
            if (checked) item.classList.add(CL_COMPLETED);
            else item.classList.remove(CL_COMPLETED);
        }
    }
    update();
}

function update() {
    //计数：未完成个数
    var items = $All('.todo-list li');
    var filter = $('.filters li a.selected').innerHTML;
    var leftNum = 0;
    for (var i = 0; i < items.length; ++i) {
        var item = items[i];
        //contains用做判断返回值是ture还是false
        if (!item.classList.contains(CL_COMPLETED))
            leftNum++;

        var display = 'none';
        if (filter == 'All') {
            display = 'block';
        } else if (filter == 'Active' && !item.classList.contains(CL_COMPLETED)) {
            display = 'block';
        }
        if (filter == 'Completed' && item.classList.contains(CL_COMPLETED)) {
            display = 'block';
        }
        item.style.display = display;
        // console.log(item.style.display);
    }
    var count = $('.todo-count');
    count.innerHTML = (leftNum || 'No') + (leftNum > 1 ? ' items' : ' item') + ' left';
}

//点击filters元素中的a元素时更改相应button的切换
function bttonChange() {
    var filters = $All('.filters li ');
    //获得下面内容div的数组
    var Btn = document.getElementsByClassName('clear-completed');
    for (var i = 0; i < filters.length; ++i) {
        filters[i].num = i; //赋值用于标记
        filters[i].addEventListener('click', function() {
            //先全部隐藏
            for (var j = 0; j < Btn.length; j++) {
                Btn[j].style.display = 'none';
            }
            Btn[this.num].style.display = 'block';
            console.log('btn' + Btn[this.num]);
            // update();
        });
    }
}

window.onload = function init() {
    var newTodo = $('.new-todo'); // todo
    newTodo.addEventListener('keyup', function(ev) {
        // Enter
        if (ev.keyCode != 13) return;
        var todoText = newTodo.value;
        if (!todoText.length) {
            console.log('todoText is empty');
            return;
        }
        addTodo(todoText);
        newTodo.value = '';
    }, newTodo.focus());
    //清除全部事件
    var clearAll = document.getElementById('clear-all');
    clearAll.addEventListener('click', function() {
        ClearAll();
        update();
    });

    //清除已完成事件
    var clearCompleted = document.getElementById('clear-completed');
    clearCompleted.addEventListener('click', function() {
        ClearCompleted();
        update();
    });
    //清除未完成事件
    var clearActive = document.getElementById('clear-active');
    clearActive.addEventListener('click', function() {
        ClearActive();
        update();
    });

    //全部标记为完成
    var toggleAll = $('.toggle-all');
    toggleAll.addEventListener('change', function() {
        toggleAllTodoList();
    });

    //判断点击了哪个按钮并给出点击样式
    var filters = $All('.filters li a');
    for (var i = 0; i < filters.length; ++i) {
        (function(filter) {
            filter.addEventListener('click', function() {
                for (var j = 0; j < filters.length; ++j) {
                    filters[j].classList.remove(CL_SELECTED);
                }
                filter.classList.add(CL_SELECTED);
                bttonChange();
                update();
            });
        })(filters[i])
    };
    update();
};