# 简易版资金账户管理-DEMO

## DEMO功能
1. 项目使用纯JS原生开发
2. 添加随机资金账户
3. 账户资金翻倍--Button
4. 查询百万富翁
5. 财富榜⬇️
6. 计算总金额

## DEMO开发过程
### 1⃣️添加账户
本项目使用Fetch API中的fetch()方法进行跨网络异步获取用户数据(https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch);<br/>
```javascript 
//fetch()使用
function getRandomUser(){
    fetch("https://randomuser.me/api")
    .then(res=>res.json)//通过网络获取JSON文件
    .then(data=>{
        //获取到results数组的第一项
        const user = data.results[0];
        const newUser = {
            name: `${uesr.name.first} ${uesr.name.last}`,
            money: Math.floor(Math.random() * 1000000)
        };
        //添加随机生成对象到data数组
        addData(newUser);
    });   
}
```
<br/>
用户数据:Randomuser API(https://randomuser.me/)他是个免费的开源的随机用户生成器(比较是适合自己制作demo时，获取数据使用)<br/>
----(注意⚠️:资金量显示时可以转换为货币格式，如下toMoney()方法)<br/>

```javascript
//转换为货币格式
// parseFloat()方法可以把一个字符串解析成浮点数
function toMoney(num) {
    num = num.toFixed(2); //将数字转化成带有2位小数的字符串
    num = parseFloat(num); //将带有2位小数的字符串转化成带有小数的数字
    num = num.toLocaleString(); //将带有2位小数的数字转换成金额格式
    return "$" + num; //返回的是字符串23,245.12保留2位小数
}
```

### 2⃣️资金翻倍
该功能很简单，使用map()方法去获取添加操作后的数组中的每个值，再进行倍数处理(https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)。
```javascript
//资金翻倍
Double.addEventListener('click', doubleMoney);

function doubleMoney() {
    data = data.map(user => {
        //展开运算符
        return {...user, money: user.money * 2 }
    });
    updataDOM();
}
```

### 3⃣️财富排行榜⬇️
使用sort()，该方法使用原地算法对数组的元素进行排序(demo中为降序)，并返回数组(https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort);
```javascript
Sort.addEventListener('click', sortBtn);

function sortBtn() {
    // 降序排列
    data.sort((a, b) => b.money - a.money);
    updataDOM();
}
```

### 4⃣️查询百万富翁
运用filter()方法，返回一个过滤条件值的新数组，但并不改变原数组(https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)<br/>
```javascript
//查询百万富翁
Search.addEventListener('click', searchBtn);

function searchBtn() {
    data = data.filter(user => user.money > 1000000);
    updataDOM();
}
```

### 5⃣️计算总金额
reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值(https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)。<br/>
```javascript
//总金额
Total.addEventListener('click', totalCount);

function totalCount() {
    const wealth = data.reduce((acc, user) => (acc + user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${toMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}
```



