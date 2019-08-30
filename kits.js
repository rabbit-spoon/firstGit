
var kits = {};
// 补零
kits.dispatchZero = function (num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}

// 把方法都放到对象的身上
kits.formatDate = function () {
  var date = new Date();
  // 把年月日时分秒获取
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  month = this.dispatchZero(month);
  var day = date.getDate();
  day = this.dispatchZero(day);
  var hour = date.getHours();
  hour = this.dispatchZero(hour);
  var minute = this.dispatchZero(date.getMinutes());
  var second = this.dispatchZero(date.getSeconds());
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

kits.randomInt = function(n,m){
  return Math.floor(Math.random() * (m-n+1) + n);
}

// 常见的给id的方式
// 当前时间戳 + 大的随机数
kits.getId = function(){
  // 返回一个不容易重复的id
  let date = new Date();
  let time = date.getTime();// 得到的是从1970年1月1日到现在为止的毫秒总数
  // 然后在得到一个足够大的随机数，把毫秒和随机数相连，作为新的id
  let r = this.randomInt(100000,999999);
  // 把两个数字连起来
  let id = time + '' + r;
  return id;
}


// 封装一个随机颜色
kits.randomcolor=function (){
  var r = randomInt (0,255);
  var g = randomInt (0,255);
  var b = randomInt (0,255);
  return 'rgb(' + r + ',' + g + ',' + b + ')'; 
}

// 封装一个十六进制的随机颜色
kits.randomHexColor =function(){
  //定义字符串变量colorValue存放可以构成十六进制颜色值的值
  var colorValue="0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
  //以","为分隔符，将colorValue字符串分割为字符数组["0","1",...,"f"]
  var colorArray = colorValue.split(",");
   var color="#";//定义一个存放十六进制颜色值的字符串变量，先将#存放进去
    //使用for循环语句生成剩余的六位十六进制值
   for(var i=0;i<6;i++){
        //colorArray[Math.floor(Math.random()*16)]随机取出
       // 由16个元素组成的colorArray的某一个值，然后将其加在color中，
       //字符串相加后，得出的仍是字符串
        color += colorArray[Math.floor(Math.random()*16)];
   }
   return color;
}

/** 
getLocalDataArray(key)  从localStorage里面根据指定的键(key)获取一个数组参数
key：localStorage里面根据根据key存储的数据
@param {string} key 存储在localStorage里面数据对应的键
@returns {Array} 以数组形式返回 key里面储存的数据
*/
kits.getLocalDataArray =function(key){
  var json = localStorage.getItem(key);
  var arr = JSON.parse(json);
  return arr;
}

/**
 saveLocalDataArray(key,arr)   将一个数组(arr)以指定的键(key)存储到localStorage里面参数
key：localStorage里面根据根据key存储的数据
arr: 要存入localStorage的key里面的数据
 */
kits.saveLocalDataArray = function(key,arr){
  let json = JSON.stringify(arr);
  localStorage.setItem(key, json);
}
/**
 * 向localStorage里面指定键(key)的数组数据追加一个数据对象（data）参数
 */
kits.appendDataIntoArray = function (key, obj) {
  let oldArr = tool.getLocalDataArray(key);
  oldArr.push(obj);
  arr = JSON.stringify(oldArr);
  localStorage.setItem(key, arr);
}
/**
 * 根据对应的id从localStorage中指定键(key)的数组中删除一条数据参数
 */
kits.deleteLocalDataById = function (key, id) {
  // let oldArr = tool.getLocalDataArray(key);
  let oldArr = this.getLocalDataArray(key);
  oldArr.forEach((e, i) => {
      if (e.id === id) {
          oldArr.splice(i, 1);
          return;
      }
  })
  // tool.saveLocalDataArray(key, oldArr);
  this.saveLocalDataArray(key, oldArr);
}

/**
* 根据id修改localStorage里面的指定键(key)的数组数据参数
*/
kits.modifyLocalDataById = function (key, id,data) {
  // let oldArr = tool.getLocalDataArray(key);
  let oldArr = this.getLocalDataArray(key);
  let flag = false;
  oldArr.forEach((e, i) => {
      if (e.id === id) {
          oldArr[i] = data;
          flag = true;
          return;
      }
  })
  this.saveLocalDataArray(key, oldArr);
  return flag;
}