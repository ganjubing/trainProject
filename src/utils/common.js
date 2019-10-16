export function Timer(val) {
  let interval = null;
  if (interval != null)
    return;
  // 计时器为空，操作
  interval = setInterval(() => {
    if (val > 0) {
      val = val - 1
    } else {
      clearInterval(interval) //清除计时器
      interval = null; //设置为null

    }

  }, 1000)
  return val;
}

export function randonArr(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    var index = parseInt(Math.random() * (len - i));
    var temp = arr[index];
    arr[index] = arr[len - i - 1];
    arr[len - i - 1] = temp;
  }
  return arr;
}

export function randomLimit(arr, count) {
  //console.log(arr.length);
  var result = [];
  var ranNum = count;
  for (var i = 0; i < ranNum; i++) {
    var ran = Math.floor(Math.random() * (arr.length - i));
    result.push(arr[ran]);
    arr[ran] = arr[arr.length - i - 1];

  }
  return result;
}

export const getRandomArr = (arr=[],num=3) => {
  var len = arr.length;
      for (var i = len - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemIndex = arr[randomIndex];
        arr[randomIndex] = arr[i];
        arr[i] = itemIndex;
      }
  
    const tmpArr =arr;
    let arrList = [];
    for (let i = 0; i < num; i++) {
      arrList.push(tmpArr[i]);
    };
    return arrList;
  }
