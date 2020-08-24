const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

//创建一个虚拟的交易数组
// const testData = [
//     { id: 1, text: "鲜花", amount: -20 },
//     { id: 2, text: "薪酬", amount: 1000 },
//     { id: 3, text: "外单", amount: 1000 },
//     { id: 4, text: "相机", amount: -200 },
//     { id: 5, text: "相机", amount: -200 }

// ];
//读取
const localStorageDatas = JSON.parse(localStorage.getItem("datas"));

let datas = localStorage.getItem("datas") !==
    null ? localStorageDatas : [];

//更新本地存储数据(插入)
function updataLocalStorage() {
    localStorage.setItem("datas", JSON.stringify(datas));
}

//添加datas交易到DOM list中
function addDatasDOM(data) {
    //获得金额前面的符号
    const sign = data.amount < 0 ? '-' : '+';

    //创建li标签
    const item = document.createElement('li');

    //添加收入/支出的颜色样式
    item.classList.add(data.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
    ${data.text} <span>¥ ${sign}${(Math.abs(data.amount)).toFixed(2)}</span>
    <button class="delete" onclick="removeData(${data.id})">x</button>
    `;

    //将item插入父节点list中
    list.appendChild(item);
}

//删除
function removeData(id) {
    datas = datas.filter(data => data.id !== id);
    updataLocalStorage();
    init();
}

//更新余额、收入、支出
function updataMoney() {
    //通过map()函数获取datas中金额的数组
    const amounts = datas.map(data => data.amount);

    //使用reduce()函数得到余额
    const total = (amounts.reduce((acc, item) => (acc += item), 0)).toFixed(2);

    //收入
    const inc = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const exp = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    //渲染进html
    balance.innerHTML = `¥ ${total}`;
    money_plus.innerHTML = `¥ ${inc}`;
    money_minus.innerHTML = `¥ ${exp}`;

}

form.addEventListener('submit', addData);
//添加新交易按钮
function addData(e) {
    //阻止表单默认事件
    e.preventDefault();

    //验证输入框是否为空
    if (text.value.length == "" || amount.value.length == "") {
        alert("请输入名称或者金额");
    }
    if (Number(amount.value) == 0) {
        amount.value = "";
    } else {
        const data = {
            id: generateId(),
            text: text.value,
            amount: Number(amount.value)
        }
        datas.push(data);
        addDatasDOM(data);
        updataMoney();
        updataLocalStorage();


        text.value = "";
        amount.value = "";
    }
}

function generateId(id) {
    return Math.floor(Math.random() * 10000000)
}


//初始化应用
function init() {
    list.innerHTML = '';
    datas.forEach(addDatasDOM);
    updataMoney();
}
init();