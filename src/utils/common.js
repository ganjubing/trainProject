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

  //生成10个1-100不重复的随机数
 export const randomCount=(number=10,lastIndex=100)=>{
      var arr = [];　
      while(arr.length < number) {   //原数组长度为0，每次成功添加一个元素后长度加1，当数组添加最后一个数字之前长度为number即可
          var num = Math.floor(Math.random() * lastIndex);   //生成一个0-300的随机整数
          if(arr.length === 0){   //如果数组长度为0则直接添加到arr数组
              arr.push(num);
          }else {
              for (var i = 0; i < arr.length; i++) {   //当新生成的数字与数组中的元素不重合时则添加到arr数组
                  if (arr.join(',').indexOf(num) < 0) {
                      arr.push(num);
                  }
              }
          }
      }

      return arr;
  }
/**
 * 生成count个min到max随机数，其中包含min、max
*/
  export function randomNumBoth(min,max,count){
    var randoms=[];
    while(true){
      var isExists = false;
      var range=max-min;
      var rand=Math.random();
      var random=min+Math.round(rand*range);
      // 判断当前随机数是否已经存在
      for (var i = 0; i < randoms.length; i++) {
          if (random === randoms[i]) {
              isExists = true;
              break;
          }
      }
      // 如果不存在，则添加进去
      if (!isExists)
          randoms.push(random);
      // 如果有10位随机数了，就跳出
      if (randoms.length === count)
          break;
    }
    return randoms;
  }
