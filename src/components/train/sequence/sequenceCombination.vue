<template>
  <div class="sequence">
    <span class="surplusTime">{{surplusTime}}</span>
    <!-- <img style="position:absolute;right:20%;top:0%;width: 12.5%;height: 10%;" src="@/assets/star.png" @click="timerStar" />
    <div v-show="surplusTime!=totalDuration&&!isFinish" style="width: 12.5%;height:10%;background-color: #808080;
    opacity:.7;border-radius:7px;position:absolute;right:20%;top:0%;z-index: 999;"></div> -->
    <div v-show="isShowTipInfo">
      <img src="@/assets/text/tipInfo.png" style="width: 100%;height: 100%;z-index: 9999;position: absolute;left: 0;top:0;" />
      <div style="position: absolute;width: 30%;height: 10%;left: 25%;top:50%;z-index: 9999;">
        <div style="height:100%;width: 60%;float: left;display: table;">
          <span style="font-size: 20px;font-weight: bolder;display: table-cell;vertical-align: middle;">本次练习第{{ruleItem.index}}个位置固定为</span></div>
        <div style="float: left;height:100%;width:15%;border:1px solid #dad9da;font-size: 14px;">
          <div style="display: table;text-align: center;width: 100%;height: 100%;">
            <span style="display:table-cell;vertical-align: middle;font-size:25px;font-weight: bold;">{{ruleItem.text}}</span>
          </div>
        </div>
      </div>
      <img @click="start" src="@/assets/text/btnBegin.png" style="width:9%;height: 17%;position: absolute;top:47%;right:28%;z-index: 9999;" />
    </div>
    <div class="lefDiv">
      <div v-if="isStart" :style="{visibility:option.selected?'hidden':'visible'}" @click="selectItem(option,index)" v-for="(option,index) in randomArray"
        :key="index">
        <span>{{option.text}}</span>
      </div>
    </div>
    <div class="container">
      <div class="list" v-for="(arr,index) in selectArry">
        <div style="font-size:0;height: 100%;width: 100%;">
          <div v-for="(item,i) in arr.data" style="float:left;height:99%;width:24%;border:1px solid #dad9da;display: inline-block;font-size: 14px;">
            <div style="display: table;text-align: center;width: 100%;height: 100%;">
              <span style="display:table-cell;vertical-align: middle;font-size:25px;font-weight: bold;">{{item.text}}</span>
            </div>
          </div>
          <img v-if="arr.showCorrectImg" src="@/assets/correct.png" style="width:27%;height:113%;position:relative;right:-38%;top:-55%;">
          <img v-if="arr.showIncorrectImg" src="@/assets/incorrect.png" style="width:27%;height:113%;position:relative;right:-38%;top:-55%;">
        </div>
        <img v-if="arr.num===currentNumber&&isStart" src="@/assets/text/overUnderLine.png" style="height:3%;width: 100%;" />
        <img v-else src="@/assets/text/underLine.png" style="height:3%;width: 100%;" />
      </div>
    </div>
    <div v-show="isRestart" style="position: absolute;left: 0;top:0;width: 100%;height: 100%;">
      <img src="@/assets/text/restartip.png" style="height:100%;width: 100%;position: absolute;left:0;top:0;z-index: 9999;" />
      <span style="color: #fb7b06;font-size: 25px;font-weight: bolder;position: relative;top:38%;left: 5%;z-index: 9999;">错误过多！请重新开始！</span><br />
      <img @click="restart()" src="@/assets/text/btnRestart.png" style="width:10%;height: 10%;position: relative;top:43%;left:4.5%;z-index: 9999;" />
    </div>
    <div class="divResult" v-show="isFinish">
      <span style="position: absolute;left: 53%;top: 38%;color: #357dd3;font-size: 40px;font-weight: bolder;">{{totalAnswerNumber}}</span>
      <span style="position: absolute;left: 53%;top: 45%;color:#357dd3;font-size: 40px;font-weight: bolder;">{{accuracy}}%</span>
      <span style="position: absolute;left: 45%;top: 55%;color:#d7112f;font-size:50px;font-weight:900;">{{Math.round(correctNumber*10.5)}}</span>
      <img style="position: absolute;left: 44%;bottom:10%;width: 12.5%;height: 10%;" src="@/assets/visual2/btnContinu.png"
        @click="continu()" />
    </div>
  </div>
</template>

<script>
  import {
    randonArr,
    randomLimit,
    getRandomArr,
    randomNumBoth,
  } from '@/utils/common.js'
  export default {
    data() {
      return {
        totalDuration: 200, //计时器总时长(秒)
        surplusTime: 200, //当前剩余时长
        isTimeout: false, //是否时间已到
        isFinish: false, //是否答题结束
        isRestart: false, //是否重新开始
        intervalTime: null, //计时器
        errorNumber: 0, //打错次数
        maxErrorNumber: 5, //大于等于5次，重新计算重新开始
        totalAnswerNumber: 0, //总答题数
        correctNumber: 0, //答对数量
        ruleItem: {}, //本题答题规则
        randomArray: [{
          text: '一',
          selected: false
        }, {
          text: '二',
          selected: false
        }, {
          text: '三',
          selected: false
        }, {
          text: '四',
          selected: false
        }],
        isStart:false,//是否已开始
        isShowTipInfo: false,
        subjectNumber: 6, //小题数
        selectArry: [],
        currentNumber: 0, //一题分为6小题，当前第几小题
      }
    },
    computed:{
      accuracy:function(){
       return (this.correctNumber/this.totalAnswerNumber).toFixed(2)*100;
      }
    },
    mounted() {
      this.timerStar();
      this.initData();
    },
    methods: {
      timerStar() {
        this.isStart=true;
        this.isShowTipInfo = true;
        this.intervalTimer();
      },
      start() {
        this.currentNumber = 0;
        this.isShowTipInfo = false;
        this.randomArray.map(m => m.selected = false);
      },
      selectItem(item, index) {
        //if(!this.isStart)return;
        this.totalAnswerNumber += 1;
        var currentItem = this.selectArry[this.currentNumber];
        if (currentItem.data.length < 4) {
          currentItem.data.push({
            text: item.text,
            value: ''
          });
          item.selected = true;
          if (currentItem.data.length == 4) {
            if (this.ruleItem.text === currentItem.data[this.ruleItem.index - 1].text && !this.isHasSameArray(this.selectArry)) { //符合规则
            this.correctNumber+=1;
              currentItem.status = true,
                this.showCorrectImgMoment(currentItem);
              this.playAudio(true)
              if(!this.isTimeout){
                var listStatus = this.selectArry.map(m => m.status);
                var correct = this.getSameNum(true, listStatus);
                if (correct === this.subjectNumber) { //本次6小题全答对，进入下一轮
                  this.initData();
                  this.isShowTipInfo = true;
                } else {
                  this.currentNumber += 1;
                  this.randomArray.map(m => m.selected = false);
                }
              }else{
                this.doFinish();
              }

            } else {
              this.playAudio(false);
              this.showInCorrectImgMoment(currentItem);
              currentItem.status = false;
              if(!this.isTimeout){
                if (this.errorNumber >= this.maxErrorNumber) {
                  this.isRestart = true;
                } else {
                  this.errorNumber += 1;
                  currentItem.data = [];
                  this.randomArray.map(m => m.selected = false);
                }
              }else{
                this.doFinish()
              }
            }

          }
        } else {}


      },
      intervalTimer() {
        // 计时器为空，操作
        if (this.intervalTime != null) return;
        this.intervalTime = setInterval(() => {
          if (this.surplusTime > 0) {
            this.surplusTime = this.surplusTime - 1;
          } else {
            this.isTimeout = true;
          }
        }, 1000)
      },
      initData() {
        this.selectArry = [];
        var itemIndex = randomNumBoth(1, 4, 1);
        var itemText = getRandomArr(this.randomArray, 1);
        /* this.ruleItem["index"]=itemIndex[0];
        this.ruleItem["text"]=itemText[0].text; */
        this.ruleItem.index = itemIndex[0];
        this.ruleItem.text = itemText[0].text;
        randonArr(this.randomArray); //随机打乱数组
        for (let i = 0; i < this.subjectNumber; i++) {
          this.selectArry.push({
            num: i,
            status: null,
            showCorrectImg: null,
            showIncorrectImg: null,
            data: []
          });
          /* for (let j = 0; j < this.randomArray.length; j++) {
            this.selectArry[i].data.push({
              text: '',
              value: ''
            });
          } */
        }
      },
      showCorrectImgMoment(item) {
        item.showCorrectImg = true;
        setTimeout(() => {
          item.showCorrectImg = false;
        }, 1000);
      },
      showInCorrectImgMoment(item) {
        item.showIncorrectImg = true;
        setTimeout(() => {
          item.showIncorrectImg = false;
        }, 1000);
      },
      isHasSameArray(arr) {
        for (var i = 0; i < arr.length; i++) {
          for (var j = i + 1; j < arr.length; j++) {
            var item1 = arr[i].data.map(m => m.text).toString();
            var item2 = arr[j].data.map(m => m.text).toString();
            if (item1 === item2 && item1 != "" && item2 != "") {
              return true;
            }
          }
        }
        return false;
      },
      restart() {
        this.errorNumber = 0;
        this.totalAnswerNumber = 0;
        this.correctNumber = 0;
        this.currentNumber = 0;
        this.isRestart = false;
        this.randomArray.map(m => m.selected = false);
        this.isShowTipInfo = true;
        this.initData();
      },
      getSameNum(val, arr) {
        var processArr = arr.filter(function(value) {
          return value == val;
        })
        return processArr.length;
      },
      doFinish(){
        this.isStart=false;
        this.isFinish = true;
        clearInterval(this.intervalTime);
        this.intervalTime = null;
      },
      continu(){
        this.errorNumber = 0;
        this.surplusTime = this.totalDuration;
        this.totalAnswerNumber = 0;
        this.correctNumber = 0;
        this.isFinish = false;
        this.isTimeout=false;
        this.initData();
      }
    }
  }
</script>

<style scoped="scoped">
  .sequence {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: url(../../../assets/text/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    -moz-background-size: 100% 100%;
  }

  .sequence .surplusTime {
    position: absolute;
    right: 11.5%;
    top: 0.7%;
    font-weight: bolder;
    font-size: 30px;
    color: crimson;
  }

  .container {
    position: absolute;
    left: 30%;
    top: 17.5%;
    width: 50%;
    height: 65%;
  }

  .container .list {
    width: 41%;
    height: 17%;
    display: inline-block;
    font-size: 0;
    margin: 5% 3%;
    /* border: 1px solid #42B983; */
    /* background-image: url(../../assets/text/underLine.png);
    background-repeat: no-repeat; */
  }

  .lefDiv {
    height: 75%;
    position: absolute;
    left: 5%;
    top: 11.5%;
    width: 6%;
    margin: 0.5% 2%;
  }

  .lefDiv div {
    display: table;
    text-align: center;
    background-color: #f8f6f8;
    width: 100%;
    height: 18.1%;
    margin: 35% 0px;
    box-shadow: 5px 5px 5px #484a3b
  }

  .lefDiv div span {
    display: table-cell;
    vertical-align: middle;
    font-size: 30px;
    font-weight: bold;
  }
  .divResult{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-image: url(../../../assets/text/result.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center,center;
    z-index: 9999;
  }
</style>
