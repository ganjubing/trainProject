<template>
  <div class="stroop">
    <span class="surplusTime">{{surplusTime}}</span>
    <div style="border: 1px solid #0040D0;position: absolute;left: 26.5%;top:32.5%;width:48.5%;height: 23%;">
      <div style="width: 50%;height:100%;border: #008000 solid 1px;float: left;">
        <img src="../../../assets/stroop/redR.png" style="width: 41%;height: 100%;" />
      </div>
      <div style="width: 50%;height: 100%;border: #008000 solid 1px;float: left;">
        <img src="../../../assets/stroop/redY.png" style="width: 41%;height: 100%;" />
      </div>
      <img src="../../../assets/correct.png" style="position:absolute;left: 43%;top:11%;z-index: 9999 ;" />
      <img src="../../../assets/incorrect.png" style="position:absolute;left: 42%;top:11%;z-index: 9999 ;" />
    </div>
    <div style="border: 1px solid #0040D0;position: absolute;left: 26.5%;bottom:0%;width:48.5%;height:30%;">
      <div style="width: 50%;height: 100%;border: #000080 solid 1px;float: left;">
        <img :src="equalimg" style="width: 52.5%;height: 100%;" @mouseover="changeOver('equal')" @mouseout="changeOut('equal')" />
      </div>
      <div style="width: 50%;height: 100%;border: #000080 solid 1px;float: left;">
        <img :src="unequalimg" style="width: 52.5%;height: 100%;" @mouseover="changeOver('unequal')" @mouseout="changeOut('unequal')" />
      </div>
    </div>
  </div>
</template>

<script>
  import equalImg from '../../../assets/stroop/equal.png';
  import equalHoverImg from '../../../assets/stroop/equalHover.png';
  import unequalImg from '../../../assets/stroop/unequal.png';
  import unequalHoverImg from '../../../assets/stroop/unequalHover.png';
  export default {
    data() {
      return {
        totalDuration: 200, //计时器总时长(秒)
        surplusTime: 200, //当前剩余时长
        isTimeout: false, //是否时间已到
        isFinish: false, //是否答题结束
        intervalTime: null,
        equalimg: equalImg,
        unequalimg: unequalImg,
      }
    },
    mounted(){
      this.intervalTimer();
    },
    methods: {
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
    },
  }
</script>

<style>
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
    right:5.5%;
    top: 3%;
    color:#f50c38;
    font-weight: bolder;
    font-size: 30px;
  }
</style>
