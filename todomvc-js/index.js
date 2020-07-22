import './assets/css/base.css'
import './assets/css/index.css'


var $ = function(id) {
    return document.querySelector(id);
};

var uid = 0;

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

    // var label = item.querySelector('.todo-label');
    // label.addEventListener('dblclick', function() {
    //     item.classList.add(CL_EDITING);

    //     var edit = document.createElement('input');
    //     var finished = false;
    //     edit.setAttribute('type', 'text');
    //     edit.setAttribute('class', 'edit');
    //     edit.setAttribute('value', label.innerHTML);

    //     function finish() {
    //         if (finished) return;
    //         finished = true;
    //         item.removeChild(edit);
    //         item.classList.remove(CL_EDITING);
    //     }

    //     edit.addEventListener('blur', function() {
    //         finish();
    //     });

    //     edit.addEventListener('keyup', function(ev) {
    //         if (ev.keyCode == 27) { // Esc
    //             finish();
    //         } else if (ev.keyCode == 13) {
    //             label.innerHTML = this.value;
    //             finish();
    //         }
    //     });

    //     item.appendChild(edit);
    //     edit.focus();
    // }, false);

    //标记为已完成
    // item.querySelector('.toggle').addEventListener('change', function() {
    //     updateTodo(id, this.checked);
    // });

    //删除
    // item.querySelector('.destroy').addEventListener('click', function() {
    //     removeTodo(id);
    // });

    //在列表子元素之前插入新的子节点
    todoList.insertBefore(item, todoList.firstChild);
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
    });

};