<template>
  <div class="speed">
    <span class="surplusTime">{{surplusTime}}</span>
    <!-- <img style="position:absolute;right:4%;top:10%;width: 12.5%;height: 10%;" src="@/assets/star.png" @click="timerStar" />
    <div v-show="surplusTime!=totalDuration&&!isFinish" style="width: 12.5%;height:10%;background-color: #808080;
    opacity:.7;border-radius:7px;position:absolute;right:4%;top:10%;z-index: 999;"></div>-->
    <img src="@/assets/speed1/ready.png" style="width:18.5%;height:32%;position:absolute;top:35%;left:41%;" v-if="isReady" />

    <div class="container">
      <div class="list" @click="checkItem(item,index)" v-if="itemList.length>0" v-for="(item,index) in itemList" :key="index">
        <div style="position: relative;width: 100%;height: 100%;left: 0%;top:0%;">
          <img v-if="(!isWaiting&&item.checkStatus!=true)&&(!isWaiting&&item.checkStatus!=false&&item.value!=answerRightItem.value)||(!isWaiting&&item.checkStatus===null&&isAnswerRight===null)"
            style="width:93%;height:93%;margin:3% 3%;" src="@/assets/speed1/unknow.png" />
          <img v-if="isWaiting||item.checkStatus!=null||(answerRightItem.value===item.value&&isAnswerRight!=null)"
            style="width:90%;height:90%;margin:3% 3%;border:1px dashed #808080;border-radius: 10px;" :src="item.img" />
          <img v-if="item.checkStatus===true" style="width:90%;height:90%;position: absolute;left:42%;opacity:.8;top: 32%;"
            src="@/assets/speed1/right.png" />
          <img v-if="item.checkStatus===false" style="width:90%;height:90%;position: absolute;left: 42%;opacity:.8;top:32%;"
            src="@/assets/speed1/error.png" />
        </div>

      </div>
    </div>
    <span style="position: absolute;right:49%;bottom:7%;font-weight: bolder;font-size: 30px;color: #F0F0F0;">{{answerItem.typeName}}</span>
    <div class="divResult" v-show="isFinish">
      <span style="position: absolute;left: 53%;top: 42.5%;color: #357dd3;font-size: 20px;font-weight: bolder;">{{spanTimeLength}}毫秒</span>
      <span style="position: absolute;left: 53%;top: 53%;color:#357dd3;font-size: 20px;font-weight: bolder;">{{accuracy}}%</span>
      <span style="position: absolute;left: 45%;top: 65%;color:#d7112f;font-size:50px;font-weight:900;">{{Math.round(correctNumber*10.5)}}</span>
      <img style="position: absolute;left: 44%;bottom: 4%;width: 12.5%;height: 10%;" src="@/assets/visual2/btnContinu.png"
        @click="continu()" />
    </div>

  </div>
</template>

<script>
  import {
    Timer,
    randonArr,
    randomLimit,
    getRandomArr,
    spanTime
  } from '@/utils/common.js'
  import unkow from '@/assets/speed1/unknow.png'
  export default {
    name: 'SpeedMathching',
    data() {
      return {
        totalDuration: 200, //计时器总时长(秒)
        surplusTime: 200, //当前剩余时长
        isTimeout: false, //是否时间已到
        isFinish: false, //是否答题结束
        intervalTime: null,
        isReady: false,
        readyTime: 1000, //准备时长，即从显示准备开始图标到隐藏图标的时间（毫秒）
        showCheckedTime: 1000, //答题后显示答题情况时长
        nextQuestionTime: 1000, //隔多久进入下一题
        memoryDuration: 2000, //题目记忆时长
        surplusMemory: 2000, //当前题的记忆时长
        minMemoryDuration: 200, //最低允许记忆时长
        memoryStep: 100, //每答对一道题，记题时长减少数（毫秒）
        beginTime: null, //本题的开始时间
        endTime: null, //本题结束时间
        spanTimeLength: 0, //答一道题所用时间（毫秒）
        isWaiting: false,
        isAnswerRight: null,
        totalAnswerNumber: 0, //总答题数
        correctNumber: 0, //答对数量
        answerItem: {
          typeName: '水果',
          value: 1
        },
        answerRightItem: null, //正确项
        selectedItem: null, //用户选着项
        rightItems: [{
          name: '苹果',
          img: require("@/assets/speed1/images/apple.jpg"),
          value: 1,
        }, {
          name: '香蕉',
          img: require("@/assets/speed1/images/banana.jpg"),
          value: 1
        }, {
          name: '桃子',
          img: require("@/assets/speed1/images/peach.jpg"),
          value: 1
        }, {
          name: '葡萄',
          img: require("@/assets/speed1/images/grape.jpg"),
          value: 1
        }, {
          name: '橘子',
          img: require("@/assets/speed1/images/orange.jpg"),
          value: 1
        }, {
          name: '西瓜',
          img: require("@/assets/speed1/images/watermelon.jpg"),
          value: 1
        }, ],
        otherItems: [{
          name: '白菜',
          img: require("@/assets/speed1/images/cabbage.jpg"),
          value: 2
        }, {
          name: '番茄',
          img: require("@/assets/speed1/images/tomato.jpg"),
          value: 3
        }, {
          name: '茄子',
          img: require("@/assets/speed1/images/eggplant.jpg"),
          value: 4
        }, {
          name: '黄瓜',
          img: require("@/assets/speed1/images/cucumber.jpg"),
          value: 5
        }, {
          name: '大蒜',
          img: require("@/assets/speed1/images/garlic.jpg"),
          value: 6
        }, {
          name: '辣椒',
          img: require("@/assets/speed1/images/chili.jpg"),
          value: 7
        }, ],
        itemList: [],
      }
    },
    computed: {
      accuracy: function() {
        return (this.correctNumber / this.totalAnswerNumber).toFixed(2) * 100;
      }
    },
    mounted() {
      this.timerStar();
    },
    methods: {
      timerStar() {
        this.intervalTimer();
        this.readyGo();
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
      loadData() {
        var otherArr = getRandomArr(this.otherItems, 3);
        var rightItem = getRandomArr(this.rightItems, 1);
        this.answerRightItem = rightItem[0];
        this.itemList = [];
        otherArr.map(n => this.itemList.push(n));
        rightItem.map(n => this.itemList.push(n));
        this.itemList.map(m => m.checkStatus = null);
        randonArr(this.itemList);
      },
      waitingSecond() {
        this.isWaiting = true;
        setTimeout(() => {
          //遮挡图片
          this.isWaiting = false;
          this.beginTime = new Date(); //答题开始计时
        }, this.surplusMemory);
      },
      checkItem(obj, index) {
        if (this.isWaiting||obj.checkStatus!=null) return;
        this.totalAnswerNumber += 1; //答题数自增1
        var state = this.answerItem.value === obj.value;
        this.selectedItem = obj;
        this.playAudio(state)
        if (state) {
          this.surplusMemory = this.surplusMemory > this.minMemoryDuration ? this.surplusMemory - this.memoryStep :
            this.surplusMemory;
          this.correctNumber += 1;
          this.endTime = new Date();
          obj.checkStatus = true;
          this.isAnswerRight = true;
          var duration = this.endTime.getTime() - this.beginTime.getTime();
          if (this.spanTimeLength <= 0 || duration < this.spanTimeLength) {
            this.spanTimeLength = duration;
          }
        } else {
          this.isAnswerRight = false;
          obj.checkStatus = false;
        }

        setTimeout(() => {
          this.nextQuestion();
        }, this.showCheckedTime)

      },
      nextQuestion() {
        this.itemList = [];
        setTimeout(() => {
          this.isAnswerRight = null;
          if (this.isTimeout)
            this.doFinish();
          else
            this.readyGo();
        }, this.nextQuestionTime)

      },
      readyGo() {
        this.isReady = true;
        setTimeout(() => {
          this.isReady = false;
          this.loadData();
          this.waitingSecond();
        }, this.readyTime);
      },
      doFinish() {
        this.isFinish = true;
        clearInterval(this.intervalTime);
        this.intervalTime = null;
      },
      continu() {
        this.surplusTime = this.totalDuration;
        this.surplusMemory = this.memoryDuration;
        this.totalAnswerNumber = 0;
        this.correctNumber = 0;
        this.isFinish = false;
        this.isTimeout=false;
      }
    },
    watch: {}
  }
</script>

<style scoped="scoped">
  .speed {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: url(../../../assets/speed1/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    -moz-background-size: 100% 100%;
  }

  .speed .surplusTime {
    position: absolute;
    right: 8%;
    top: 1%;
    font-weight: bolder;
    font-size: 30px;
  }

  .container {
    position: absolute;
    left: 35%;
    top: 29.5%;
    width: 30%;
    height: 40%;
  }

  .container .list {
    width: 24%;
    height: 40.8%;
    display: inline-block;
    margin: 2.5% 10% 5% 10%;
    border-radius: 15px;
    background-color: #FFFFFF;
    border-radius: 10px;
  }

  .statusImg {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 60%;
    right: -15%;
  }

  .divResult {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-image: url(../../../assets/speed1/result.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center, center;
    z-index: 9999;
  }
</style>
