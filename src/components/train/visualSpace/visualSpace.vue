<template>
  <div class="visualSpace">
    <span class="surplusTime">{{surplusTime}}</span>
    <div :class="{'incorrectbg':isCorrect===false,'correctbg':isCorrect===true}" style="position: absolute;left: 33.4%;top:25%;width:36.5%;height:57%;">
      <div style="width: 50%;height:100%;">
        <div :class="{'moveLeft':ismove}"style="position: absolute;top:25%;left:20%;">
          <img  :src="currentWord.img" style="width: 41%;height: 100%;" />
        </div>

      </div>
      <!-- <div style="width: 50%;height: 100%;float: left;">
        <img :src="fontColor.img" style="width: 41%;height: 100%;" />
      </div> -->
      <!-- <img v-if="isCorrect===true" src="../../../assets/correct.png" style="position:absolute;left: 43%;top:11%;z-index: 9999 ;" />
      <img v-if="isCorrect===false" src="../../../assets/incorrect.png" style="position:absolute;left: 42%;top:11%;z-index: 9999 ;" /> -->
    </div>
    <div v-if="isStart===false" style="position: absolute;left: 28%;bottom:5%;width:40%;height:20%;">
      <div><img src="@/assets/visualSpace/tip.png" style="width: 60%;height: 60%;" /></div>
      <div style="margin-top: 4%;width: 100%;height: 50%;">
        <img @click="nexStep" src="@/assets/visualSpace/start.png" style="width: 30%;height:90%;" />
        </div>
    </div>
    <div v-else style="position: absolute;left: 20%;bottom:5%;width:60%;height:20%;">
      <div><img src="@/assets/visualSpace/currentTip.png" style="width: 50%;height: 50%;" /></div>
      <div style="width:50%;height: 80%;float: left;">
        <img :src="equalimg" style="width: 52.5%;height: 100%;" @mouseover="changeOver('equal')" @mouseout="changeOut('equal')" @click="checkItem(true)" />
      </div>
      <div style="width: 50%;height: 80%;float: left;">
        <img :src="unequalimg" style="width: 52.5%;height: 100%;" @mouseover="changeOver('unequal')" @mouseout="changeOut('unequal')" @click="checkItem(false)" />
      </div>
    </div>
    <div class="divResult" v-show="isFinish">
      <span style="position: absolute;left: 53%;top: 35%;color: #357dd3;font-size: 30px;">{{Math.round(totalUseTime/totalAnswerNumber)}}毫秒</span>
      <span style="position: absolute;left: 53%;top: 43%;color:#357dd3;font-size: 30px;">{{accuracy}}%</span>
      <span style="position: absolute;left: 53%;top: 51%;color:#357dd3;font-size:30px;">{{correctNumber}}</span>
      <span style="position: absolute;left: 47%;top: 60%;color:#d7112f;font-size:50px;font-weight:700;">{{Math.round(correctNumber*10.5)}}</span>
      <img style="position: absolute;left: 44%;bottom:3.5%;width: 12.5%;height: 10%;" src="@/assets/btnContinu.png"
       @click="continu" />
    </div>
  </div>
</template>

<script>
  import equalImg from '../../../assets/visualSpace/identical.png';
  import equalHoverImg from '../../../assets/visualSpace/identicalHover.png';
  import unequalImg from '../../../assets/visualSpace/different.png';
  import unequalHoverImg from '../../../assets/visualSpace/differentHover.png';
  import {
    randonArr,
    randomLimit,
    getRandomArr,
    randomNumBoth,
  } from '../../../utils/common.js'
  export default {
    data() {
      return {
        totalDuration: 120, //计时器总时长(秒)
        surplusTime: 120, //当前剩余时长
        isTimeout: false, //是否时间已到
        isFinish: false, //是否答题结束
        isStart:false,
        ismove:false,
        nextQuestionTime:500, //隔多久进入下一题
        intervalTime: null,
        equalimg: equalImg,
        unequalimg: unequalImg,
        itemArray:[{name:'0',img:require("@/assets/visualSpace/0.png")},
        {name:'1',img:require("@/assets/visualSpace/1.png")},
        {name:'2',img:require("@/assets/visualSpace/2.png")},
        {name:'3',img:require("@/assets/visualSpace/3.png")},],
        currentWord:{},//本题随机的字体名称对象
        prevWord:{},//本题随机的字体颜色对象
        isCorrect:null,
        totalAnswerNumber: 0, //总答题数
        correctNumber: 0, //答对数量
        totalUseTime:0,//毫秒
        beginTime: null, //本题的开始时间
        endTime: null, //本题结束时间
      }
    },
    computed:{
      accuracy: function() {
        return (this.correctNumber / this.totalAnswerNumber).toFixed(2) * 100;
      }
    },
    mounted(){
      this.continu();
    },
    methods: {
      intervalTimer() {
        this.totalAnswerNumber0;
        this.correctNumber=0;
        this.totalUseTime=0;
        this.isTimeout=false;
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
      changeOver(val) {
        if (val === 'equal')
          this.equalimg = equalHoverImg;
        else
          this.unequalimg = unequalHoverImg;
      },
      changeOut(val) {
        if (val === 'equal')
          this.equalimg = equalImg;
        else
          this.unequalimg = unequalImg;
      },
      initData(){
        this.isCorrect=null;
        this.prevWord=this.currentWord!=null?this.currentWord:this.prevWord;
        this.currentWord=getRandomArr(this.itemArray, 1)[0];
        this.beginTime = new Date(); //答题开始计时
      },
      checkItem(val){
        if(this.isCorrect!=null)return;
        this.totalAnswerNumber+=1;
        this.endTime = new Date();
        var isEqual=this.currentWord.name===this.prevWord.name;
        this.playAudio(isEqual===val)
        var duration = this.endTime.getTime() - this.beginTime.getTime();
        this.totalUseTime+=duration;
         if(isEqual==val){
           this.correctNumber+=1;
           this.isCorrect=true;
         }else{
           this.isCorrect=false;
         }
         setTimeout(()=>{
           this.nexStep();
         },this.nextQuestionTime);
      },
      nexStep(){
        this.isStart=true;
        this.ismove=true;
        if(this.isTimeout){
          this.isFinish=true;
        }else{
          this.initData();
        }
      },
      continu(){
        this.isStart=false;
        this.surplusTime=this.totalDuration;
        this.isFinish=false;
        this.intervalTimer();
        this.initData();
      },
    },
  }
</script>

<style scoped="scoped">
  .visualSpace {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: url(../../../assets/visualSpace/bg.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    -moz-background-size: 100% 100%;
  }
  .visualSpace .surplusTime {
    position: absolute;
    right:10%;
    top:0%;
    color:#f50c38;
    font-weight: bolder;
    font-size: 30px;
  }
  .divResult {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-image: url(../../../assets/visualSpace/result.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center, center;
    z-index: 9999;
  }
  .correctbg{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-image: url(../../../assets/visualSpace/correctbg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
   /* background-position: center, center; */
    /* z-index: 9999; */
  }
  .incorrectbg{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-image: url(../../../assets/visualSpace/inCorrectbg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
   /* background-position: center, center; */
    /* z-index: 9999; */
  }
  .moveLeft {
    animation: leftAD 0.5s infinite;
    -webkit-animation: leftAD 0.5s infinite;
    animation-iteration-count: 1;
  }
  @keyframes leftAD {
    from {
      left: 10%;
    }

    to {
      left: -20%;
    }
  }

  @-webkit-keyframes leftAD {
    from {
      left: 10%;
    }

    to {
      left: -20%;
    }
  }
</style>
