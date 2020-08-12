const addUser = document.getElementById('add-user');
const Doubled = document.getElementById('doubled');
const Search = document.getElementById('search');
const Sort = document.getElementById('sort');
const Total = document.getElementById('total');
const Main = document.getElementById('main');


let data = [];
getRandomUser();
//添加账户
//方式一:
// async function getRandomUser() {
//     const res = await fetch("https://randomuser.me/api");
//     const data = await res.json();
//     const user = data.results[0];
//     const newUser = {
//         name: `${user.name.first} ${user.name.last}`,
//         money: Math.floor(Math.random() * 1000000)
//     };
//     addData(newUser);
// }
//方式二:
function getRandomUser() {
    fetch("https://randomuser.me/api").then(res => res.json()).then(data => {
        const user = data.results[0];
        const newUser = {
            name: `${user.name.first} ${user.name.last}`,
            money: Math.floor(Math.random() * 1000000)
        };
        addData(newUser);
    });
}

function addData(obj) {
    data.push(obj);
    updataDOM();
}

function updataDOM(providedData = data) {
    Main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>
    `;
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${toMoney(item.money)}</h2>`;
        Main.appendChild(element);
    });
}

function toMoney(num) {
    num = num.toFixed(2);
    num = parseFloat(num);
    num = num.toLocaleString();
    return "$" + num;
}

addUser.addEventListener('click', getRandomUser);

//资金翻倍
Doubled.addEventListener('click', doubleMoney);

function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2 }
    });
    updataDOM();
}

//财富排行榜⬇️  
Sort.addEventListener('click', sortBtn);

function sortBtn() {
    data.sort((a, b) => b.money - a.money);
    updataDOM();
}

//查询百万富翁
Search.addEventListener('click', searchBtn);

function searchBtn() {
    data = data.filter(user => user.money > 1000000);
    data.sort((a, b) => b.money - a.money);
    updataDOM();
}

//计算总金额
Total.addEventListener('click', totalCount);

function totalCount() {
    const wealth = data.reduce((acc, user) => (acc + user.money), 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${toMoney(wealth)}</strong></h3>`;
    Main.appendChild(wealthEl);
}