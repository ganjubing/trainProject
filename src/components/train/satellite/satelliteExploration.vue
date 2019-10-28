<template>
  <div class="satellite">
    <span class="surplusTime">{{surplusTime}}</span>
    <div style="width:75%;height: 60%;margin:7% auto;">
      <!-- border: #0040D0 solid 1px; -->
      <div v-for="n in cellNumber" style="width: 10%;height: 20%;float: left;">
        <!-- border: #000000 solid 1px; -->
        <img v-if="showIndexs.indexOf(n)>-1&&isWaiting" src="../../../assets/satellite/ufo.png" :style="{'width':'90%','height':'90%','transform':'rotate('+n*3+'deg)'}" />
      </div>
      <div v-if="isReady&&readyImg!=null" style="position: absolute;top:35%;left:45%;">
        <img :src="readyImg" style="width:100%;height: 100%;" />
      </div>
    </div>
    <div style="position: absolute;left:36.4%;bottom:3.5%;width:24%;height:14%;">
      <!-- border: #00FFFF solid 1px; -->
      <div v-for="(item,index) in options" @mouseover="indexCurrent=index" @mouseout="indexCurrent=null" @click="checkItem(item,index)"
        style="position: relative;width: 25%;height: 100%;float: left;display: table-cell;vertical-align: middle;text-align:center">
        <img :src="index===indexCurrent&&(!isReady&&!isWaiting)?btnover:btnimg" style="width: 100%;height: 100%;" />
        <span v-if="(!isReady&&!isWaiting)||isCorrect!=null" style="position: absolute;top:35%;left:45%;font-size:25px;font-weight: bold;">{{item}}</span>
        <img v-if="isCorrect===true&&index===checkIndex" src="@/assets/correct.png" style="position: absolute;left:10%;top:40%;width:80%;height: 80%;" />
        <img v-if="isCorrect===false&&index===checkIndex" src="@/assets/incorrect.png" style="position: absolute;left:10%;top:40%;width:80%;height: 80%;" />
      </div>
    </div>
    <div class="divResult" v-show="isFinish">
      <span style="position: absolute;left: 55%;top: 40%;color: #357dd3;font-size: 30px;font-weight: bolder;">{{spanTimeLength}}毫秒</span>
      <span style="position: absolute;left: 55%;top: 48%;color:#357dd3;font-size: 30px;font-weight: bolder;">{{accuracy}}%</span>
      <span style="position: absolute;left: 47%;top: 60%;color:#d7112f;font-size:50px;font-weight:700;">{{Math.round(correctNumber*10.5)}}</span>
      <img style="position: absolute;left: 44%;bottom:10%;width: 12.5%;height: 10%;" src="@/assets/btnContinu.png"
       @click="continu" />
  </div>
  </div>
</template>

<script>
  import {
    randonArr,
    randomLimit,
    getRandomArr,
    randomNumBoth,
  } from '../../../utils/common.js'
  import btnImgHover from '@/assets/satellite/btnHover.png';
  import btnImg from '@/assets/satellite/btn.png';
  export default {
    data() {
      return {
        totalDuration: 50, //计时器总时长(秒)
        surplusTime: 50, //当前剩余时长
        isTimeout: false, //是否时间已到
        isFinish: false, //是否答题结束
        nextQuestionTime: 1000, //隔多久进入下一题
        memoryDuration: 2000, //题目记忆时长
        surplusMemory: 2000, //当前题的记忆时长
        minMemoryDuration: 200, //最低允许记忆时长
        memoryStep: 100, //每答对一道题，记题时长减少数（毫秒）
        spanTimeLength: 0, //答一道题所用时间（毫秒）
        beginTime: null, //本题的开始时间
        endTime: null, //本题结束时间
        totalAnswerNumber: 0, //总答题数
        correctNumber: 0, //答对数量
        intervalTime: null,//计时器
        isCorrect: null,//本题是否答对
        isReady:false,//是否准备答题中
        isWaiting: false,//是否记题目时间
        readyImg:null,//准备倒计时图片
        cellNumber: 50,//画布生成单元格个数
        indexCurrent: null,//答题选项索引
        showMin: 3,//生成目标最小个数
        showMax: 10,//生成目标最大个数
        randomNum: 0,//当前题展示目标个数
        showIndexs: [],//需要展示的目标个数在画布单元格（cellNumber）的索引位置
        options: [],//根据randomNum需要展示的个数，生成包括答案在内（randomNum）的四个混淆选项
        btnimg: btnImg,//选项图标mouseout
        btnover: btnImgHover,//选项图标鼠标mouseover图标
        checkIndex: null,//当前答题选择选项（options）的索引
      }
    },
    computed: {
      accuracy: function() {
        return (this.correctNumber / this.totalAnswerNumber).toFixed(2) * 100;
      }
    },
    mounted() {
      this.continu();
    },
    methods: {
      intervalTimer() {
        this.surplusMemory=this.memoryDuration;
        this.surplusTime = this.totalDuration;
        this.isFinish = false;
        this.totalAnswerNumber=0;
        this.correctNumber = 0;
        this.isTimeout = false;
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
        this.isCorrect = null;
        this.indexCurrent = null;
        this.checkIndex = null;
        this.randomNum = randomNumBoth(this.showMin, this.showMax, 1)[0];
        this.showIndexs = randomNumBoth(0, this.cellNumber - 1, this.randomNum);
        if (this.randomNum % 2 == 0) {
          this.options = this.generateArray(this.randomNum - 1, this.randomNum + 2);
        } else {
          this.options = this.generateArray(this.randomNum - 2, this.randomNum + 1);
        }
        randonArr(this.options);
      },
      generateArray(start, end) {
        return Array.from(new Array(end + 1).keys()).slice(start)
      },
      checkItem(val, index) {
        if(val==""||this.isWaiting||this.isReady)return;
        this.totalAnswerNumber++;
        this.checkIndex = index;
        this.playAudio(val === this.randomNum);
        if (val === this.randomNum) {
          this.surplusMemory = this.surplusMemory > this.minMemoryDuration ? this.surplusMemory - this.memoryStep :
            this.surplusMemory;//答对，减少题目记忆时间
          this.isCorrect = true;
          this.correctNumber++;
          this.endTime = new Date();
          var duration = this.endTime.getTime() - this.beginTime.getTime();
          if (this.spanTimeLength <= 0 || duration < this.spanTimeLength) {
            this.spanTimeLength = duration;
          }
        } else {
          this.isCorrect = false;
        }
        this.isWaiting=true;
        setTimeout(() => {
          this.nexStep();
        }, this.nextQuestionTime);
      },
      nexStep() {
        if (this.isTimeout) {
          this.isFinish = true;
        } else {
          this.readyGo();

        }
      },
      readyGo(){
        var i=3;
        this.isWaiting=false;
        this.isCorrect = null;
        this.indexCurrent = null;
        this.checkIndex = null;
        this.randomNum = 0;
        this.showIndexs =[];
        this.initData();
        this.isReady=true;
        this.readyImg=null;
        var readyInterval=setInterval(()=>{
          if(i>0){
            this.readyImg=require("@/assets/satellite/ready"+i+".png");
            i--;
          }else{
            this.waitingSecond();
             this.isReady=false;
            clearInterval(readyInterval);
          }
        },1000);
      },
      continu() {
        this.intervalTimer();
        this.readyGo();
      },
      waitingSecond() {
        this.beginTime = new Date(); //答题开始计时
        this.isWaiting = true;
        setTimeout(() => {
          //遮挡图片
          this.isWaiting = false;
          //this.beginTime = new Date(); //答题开始计时
        }, this.surplusMemory);
      },
    },
  }
</script>

<style scoped="scoped">
  .satellite {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: url(../../../assets/satellite/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    -moz-background-size: 100% 100%;
  }

  .satellite .surplusTime {
    position: absolute;
    right: 13.5%;
    top: -1%;
    color: white;
    font-weight: bolder;
    font-size: 30px;
  }

  .divResult {
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    background-image: url(../../../assets/satellite/result.png);
    /* background-position: center 0; */
    background-repeat: no-repeat;
    /* background-attachment:fixed; */
    background-size:100% 100%; /*随着原始比例缩放*/
   /* -webkit-background-size: cover;
    -o-background-size: cover;*/
    zoom: 1;
    z-index: 9999;
  }
</style>
