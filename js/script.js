var slide = document.querySelector('#slide');
var title = document.querySelectorAll('.title')[0];
var slideImg = document.querySelectorAll('.slideImg')[0];
var thumbImg = document.querySelectorAll('.thumbImg')[0];
var prevBtn = document.querySelectorAll('.prev')[0];
var nextBtn = document.querySelectorAll('.next')[0];
var dotsView = document.querySelectorAll('.dots')[0];
var arrowView = document.querySelector('.arrow');

// 圖片標號陣列 imgArry.length = 5
var imgArry = ['page-1.jpg', 'page-2.jpg', 'page-3.jpg', 'page-4.jpg', 'page-5.jpg'];

// 自定義屬性 序號
var index = 1;

// 預設顯示 因陣列起始為 1，但index 起始為 0，故需-1
slideImg.src = 'images/' + imgArry[index - 1];
title.innerHTML = imgArry[index - 1];

// 上一張 偵聽事件
prevBtn.addEventListener('click', function() {
  // index -=1
  index--;
  // 若 index 小於1 回到最後一張，imgArry.length = 5
  if (index < 1) {
    index = imgArry.length;
  }
  changeView();
  // console.log('上一張:' + index);
});

nextBtn.addEventListener(
  'click',
  function() {
    // index +=1
    index++;
    // 若 index 大於 imgArry.length = 5 要回到第一張
    if (index > imgArry.length) {
      index = 1;
    }
    changeView();
    // console.log('下一張:' + index);
  },
  false
);
// false 事件氣泡 - 指定元素往外找，預設可不寫

// 產生 dots 狀態，預設空字串
var dots = '';
for (var i = 1; i <= imgArry.length; i++) {
  // 預設起始為 1，替換 dotsHtml 動態生成 class="active"
  if (i == 1) {
    dots = dots + '<a href="javascript:;" class="active">' + i + '</a>';
  } else {
    dots = dots + '<a href="javascript:;">' + i + '</a>';
  }
}
dotsView.innerHTML = dots;

// 獲取 pageView 動態產出 a 當前狀態
var dotsCurrent = dotsView.querySelectorAll('a');

// 增加按鈕點擊事件，每個按鈕都要做，用for()每個跑一次
for (var i = 0; i < dotsCurrent.length; i++) {
  // 自定義屬性 序號
  dotsCurrent[i].index = i;
  // console.log(i);
  dotsCurrent[i].addEventListener(
    'click',
    function() {
      // 因為 dotsCurrent.length 從0開始，故需+1
      index = this.index + 1;
      changeView();
    },
    false
  );

  dotsCurrent[i].addEventListener(
    'mouseover',
    function() {
      thumbImg.style.display = 'block';
      arrowView.style.display = 'block';
      // this.index 重要!! 在for()裡，指定 this 對象
      thumbImg.src = 'images/' + imgArry[this.index];
    },
    false
  );
  dotsCurrent[i].addEventListener(
    'mouseout',
    function() {
      thumbImg.style.display = 'none';
      arrowView.style.display = 'none';
    },
    false
  );
}

// 變更圖片
function changeView() {
  slideImg.src = 'images/' + imgArry[index - 1];
  title.innerHTML = imgArry[index - 1];
  // 改變 dots 當前效果 active
  for (var i = 0; i < dotsCurrent.length; i++) {
    dotsCurrent[i].className = '';
  }
  // dotsCurrent 當前 index 加上 active
  dotsCurrent[index - 1].className = 'active';
  console.log(dotsCurrent[index]);
}
