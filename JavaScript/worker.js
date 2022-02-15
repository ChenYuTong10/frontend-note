var onmessage = function(event) {
    console.log(event);
    // 分线程中的"this"
    console.log("分线程中的\"this\"", this);
    // 向主线程返回数据
    postMessage("hello, main thread!");
}