<template>
  <div class="stroop">
    <span class="surplusTime">{{surplusTime}}</span>
    <div style="position: absolute;left: 26.5%;top:32.5%;width:48.5%;height: 23%;">
      <div style="width: 50%;height:100%;float: left;">
        <img :src="fontName.img" style="width: 41%;height: 100%;" />
      </div>
      <div style="width: 50%;height: 100%;float: left;">
        <img :src="fontColor.img" style="width: 41%;height: 100%;" />
      </div>
      <img v-if="isCorrect===true" src="../../../assets/correct.png" style="position:absolute;left: 43%;top:11%;z-index: 9999 ;" />
      <img v-if="isCorrect===false" src="../../../assets/incorrect.png" style="position:absolute;left: 42%;top:11%;z-index: 9999 ;" />
    </div>
    <div style="position: absolute;left: 26.5%;bottom:5%;width:48.5%;height:30%;">
      <div style="width: 50%;height: 100%;float: left;">
        <img :src="equalimg" style="width: 52.5%;height: 100%;" @mouseover="changeOver('equal')" @mouseout="changeOut('equal')" @click="checkItem(true)" />
      </div>
      <div style="width: 50%;height: 100%;float: left;">
        <img :src="unequalimg" style="width: 52.5%;height: 100%;" @mouseover="changeOver('unequal')" @mouseout="changeOut('unequal')" @click="checkItem(false)" />
      </div>
    </div>
    <div class="divResult" v-show="isFinish">
      <span style="position: absolute;left: 53%;top: 37%;color: #357dd3;font-size: 30px;">{{Math.round(totalUseTime/totalAnswerNumber)}}毫秒</span>
      <span style="position: absolute;left: 53%;top: 45.5%;color:#357dd3;font-size: 30px;">{{accuracy}}%</span>
      <span style="position: absolute;left: 53%;top: 53.5%;color:#357dd3;font-size:30px;">{{correctNumber}}</span>
      <span style="position: absolute;left: 47%;top: 65%;color:#d7112f;font-size:50px;font-weight:700;">{{Math.round(correctNumber*10.5)}}</span>
      <img style="position: absolute;left: 44%;bottom:3.5%;width: 12.5%;height: 10%;" src="@/assets/btnContinu.png"
       @click="continu" />
    </div>
  </div>
</template>

<script>
  import equalImg from '../../../assets/stroop/equal.png';
  import equalHoverImg from '../../../assets/stroop/equalHover.png';
  import unequalImg from '../../../assets/stroop/unequal.png';
  import unequalHoverImg from '../../../assets/stroop/unequalHover.png';
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
        nextQuestionTime:500, //隔多久进入下一题
        intervalTime: null,
        equalimg: equalImg,
        unequalimg: unequalImg,
        itemArray:[{color:'yellow',name:'yellow',img:require("@/assets/stroop/yellowY.png")},
        {color:'yellow',name:'red',img:require("@/assets/stroop/yellowR.png")},
        {color:'red',name:'yellow',img:require("@/assets/stroop/redY.png")},
        {color:'red',name:'red',img:require("@/assets/stroop/redR.png")},],
        fontName:{},//本题随机的字体名称对象
        fontColor:{},//本题随机的字体颜色对象
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
        this.fontName=getRandomArr(this.itemArray, 1)[0];
        this.fontColor=getRandomArr(this.itemArray, 1)[0];
        this.beginTime = new Date(); //答题开始计时
      },
      checkItem(val){
        if(this.isCorrect!=null)return;
        this.totalAnswerNumber+=1;
        this.endTime = new Date();
        var isEqual=this.fontName.name===this.fontColor.color;
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
        if(this.isTimeout){
          this.isFinish=true;
        }else{
          this.initData();
        }
      },
      continu(){
        this.surplusTime=this.totalDuration;
        this.isFinish=false;
        this.intervalTimer();
        this.initData();
      },
    },
  }
</script>

<style scoped="scoped">
  .stroop {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: url(../../../assets/stroop/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    -moz-background-size: 100% 100%;
  }
  .stroop .surplusTime {
    position: absolute;
    right:7%;
    top:4%;
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
    background-image: url(../../../assets/stroop/result.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center, center;
    z-index: 9999;
  }
</style>
