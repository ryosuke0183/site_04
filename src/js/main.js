import hamburger from './_hamburger.js';
import slider from './_slider.js';

// デザインパターンとしてdomcontent...をmain.jsで呼び出していいのか。
// 引数にNODEを渡す方法で良いのか。セレクタじゃだめなのか。

window.addEventListener('DOMContentLoaded', function () {
    const HAMBURGER = document.querySelector('#hamburger');
    const TARGET = document.querySelector('.nav');
    hamburger(HAMBURGER, TARGET);
});

window.addEventListener('DOMContentLoaded', function () {
    slider();
});
