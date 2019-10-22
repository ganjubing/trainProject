<template>
  <div class="digital">
    <!-- <span class="surplusTime">{{surplusTime}}</span> -->
    <img style="position:absolute;right:20%;top:0%;width: 12.5%;height: 10%;" src="../../assets/star.png"  />
    <div v-show="surplusTime!=totalDuration&&!isFinish" style="width: 12.5%;height:10%;background-color: #808080;
    opacity:.7;border-radius:7px;position:absolute;right:20%;top:0%;z-index: 999;"></div>
    <!-- <div v-show="isShowTipInfo">
      <img src="../../assets/text/tipInfo.png" style="width: 100%;height: 100%;z-index: 9999;position: absolute;left: 0;top:0;" />
      <div style="position: absolute;width: 30%;height: 10%;left: 25%;top:50%;z-index: 9999;">
        <div style="height:100%;width: 60%;float: left;display: table;">
          <span style="font-size: 20px;font-weight: bolder;display: table-cell;vertical-align: middle;">本次练习第{{ruleItem.index}}个位置固定为</span></div>
        <div style="float: left;height:100%;width:15%;border:1px solid #dad9da;font-size: 14px;">
          <div style="display: table;text-align: center;width: 100%;height: 100%;">
            <span style="display:table-cell;vertical-align: middle;font-size:25px;font-weight: bold;">{{ruleItem.text}}</span>
          </div>
        </div>
      </div>
      <img @click="start" src="../../assets/text/btnBegin.png" style="width:9%;height: 17%;position: absolute;top:47%;right:28%;z-index: 9999;" />
    </div> -->
    <div class="rightDiv">
      <img class="progress" :style="{height:surplusProglength+'%',marginTop:topHight*2+'%'}" src="../../assets/digital4/progranbar.png" />
    </div>
    <div class="container">
      <div class="list" v-for="(arr,index) in selectArry">
        <div style="font-size:0;height: 100%;width: 100%;">
          <div v-for="(item,i) in arr.data" style="float:left;height:99%;width:24%;border:1px solid #dad9da;display: inline-block;font-size: 14px;">
            <div style="display: table;text-align: center;width: 100%;height: 100%;">
              <span style="display:table-cell;vertical-align: middle;font-size:25px;font-weight: bold;">{{item.text}}</span>
            </div>
          </div>
          <img v-if="arr.showCorrectImg" src="../../assets/correct.png" style="width:27%;height:113%;position:relative;right:-38%;top:-55%;">
          <img v-if="arr.showIncorrectImg" src="../../assets/incorrect.png" style="width:27%;height:113%;position:relative;right:-38%;top:-55%;">
        </div>
        <img v-if="arr.num===currentNumber&&isStart" src="../../assets/text/overUnderLine.png" style="height:3%;width: 100%;" />
        <img v-else src="../../assets/text/underLine.png" style="height:3%;width: 100%;" />
      </div>
    </div>
<!--    <div v-show="isRestart" style="position: absolute;left: 0;top:0;width: 100%;height: 100%;">
      <img src="../../assets/text/restartip.png" style="height:100%;width: 100%;position: absolute;left:0;top:0;z-index: 9999;" />
      <span style="color: #fb7b06;font-size: 25px;font-weight: bolder;position: relative;top:38%;left: 5%;z-index: 9999;">错误过多！请重新开始！</span><br />
      <img @click="restart()" src="../../assets/text/btnRestart.png" style="width:10%;height: 10%;position: relative;top:43%;left:4.5%;z-index: 9999;" />
    </div> -->
    <div class="divResult" v-show="isFinish">
      <span style="position: absolute;left: 53%;top: 38%;color: #357dd3;font-size: 40px;font-weight: bolder;"></span>
      <span style="position: absolute;left: 53%;top: 45%;color:#357dd3;font-size: 40px;font-weight: bolder;"></span>
      <span style="position: absolute;left: 45%;top: 55%;color:#d7112f;font-size:50px;font-weight:900;"></span>
      <img style="position: absolute;left: 44%;bottom:10%;width: 12.5%;height: 10%;" src="../../assets/visual2/btnContinu.png"
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
  } from '../../utils/common.js'
  export default {
    data() {
      return {
        totalDuration: 200, //计时器总时长(秒)
        totalProgLength: 38.5, //进度条总长度
        surplusTime: 200, //当前剩余时长
        isTimeout: false, //是否时间已到
        isFinish: false, //是否答题结束
        surplusProglength:100,
        progressSpan: 1000, //进度条多久减一次（毫秒）
        progressStep:0.001,
        intervalProgress:null,
        topHight:0,
        bottomM:0,
      }
    },
    mounted() {
      this.intervalPro();
    },
    methods:{
      intervalPro() {
        if (this.intervalProgress != null) return
        this.intervalProgress = setInterval(() => {
          if (this.surplusProglength > 0) {
            var span = this.surplusProglength - this.progressStep;
            this.surplusProglength = span < 0 ? 0 : span;
            this.topHight+=this.progressStep;
            
          } else {
            clearInterval(this.intervalProgress);
            this.intervalProgress = null;
          }
        }, this.progressSpan);
      },
    }
  }
</script>

<style scoped="scoped">
  .digital {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: url(../../assets/digital4/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    -moz-background-size: 100% 100%;
  }

  .digital .surplusTime {
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

  .rightDiv {
    height: 61%;
    position: absolute;
    right: 6.3%;
    top: 15.5%;
    width: 6%;
    overflow: hidden;
    /* margin: 0.5% 2%; */
  }
  .rightDiv img{
    width: 25%;
    position: relative;
    bottom: 0;
    left: 0;
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
    background-image: url(../../assets/digital4/result.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center,center;
    z-index: 9999;
  }
</style>
