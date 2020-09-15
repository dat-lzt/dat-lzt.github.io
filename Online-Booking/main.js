const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.nochoose)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const moviceSelect = document.getElementById('movice');
let ticketPrice = Number(moviceSelect.value);
// console.log(typeof ticketPrice);

//获取本地数据并渲染样式
populateUI();

//更新座位数以及总票价
function undateSeletedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // let ticketPrice = Number(moviceSelect.value);

    //给数组中增加一个index
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    //座位数
    const selectedSeatsCount = selectedSeats.length;
    count.innerHTML = selectedSeatsCount;
    //票价
    total.innerHTML = selectedSeatsCount * ticketPrice;
}

//保存电影索引值和票价
function setMoviceData(moviceIndex, movicePrice) {
    localStorage.setItem('selectedMoviceIndex', moviceIndex);
    localStorage.setItem('selectedMovicePrice', movicePrice);

    console.log(typeof movicePrice);

}

function populateUI() {
    //渲染已选座位的ui
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    //渲染选择影片
    const selectedMoviceIndex = localStorage.getItem('selectedMoviceIndex');
    if (selectedMoviceIndex !== null) {
        moviceSelect.selectedIndex = selectedMoviceIndex;
    }

    const selectedMovicePrice = JSON.parse(localStorage.getItem('selectedMovicePrice'));
    if (selectedMovicePrice !== null) {
        ticketPrice = selectedMovicePrice;
    }
    console.log(selectedMovicePrice)
};
//电影下拉框事件监听
moviceSelect.addEventListener('change', e => {
    ticketPrice = Number(e.target.value);
    setMoviceData(e.target.selectedIndex, e.target.value);
    undateSeletedCount();
});

//座位点击事件
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('nochoose')) {
        e.target.classList.toggle("selected");
    }
    undateSeletedCount();
});

//设置初始座位和总票价
undateSeletedCount();