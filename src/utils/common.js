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
//打乱数组
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

export const spanTime=(begintime,endtime)=>{
  var date1=new Date(begintime); //开始时间
  var date2=new Date(endtime);  //结束时间
  var date3=date2.getTime()-date1.getTime() //时间差的毫秒数
  //计算出相差天数
  var days=Math.floor(date3/(24*3600*1000))
  //计算出小时数
  var leave1=date3%(24*3600*1000)  //计算天数后剩余的毫秒数
  var hours=Math.floor(leave1/(3600*1000))
  //计算相差分钟数
  var leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
  var minutes=Math.floor(leave2/(60*1000))
  //计算相差秒数
  var leave3=leave2%(60*1000)   //计算分钟数后剩余的毫秒数
  var seconds=Math.round(leave3/1000)

  return "相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒"+date3+" 豪秒"

}
