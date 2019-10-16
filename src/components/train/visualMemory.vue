<template>
  <div class="visual">
    <span>{{timeLength}}</span>
    <ul>
      <li v-for="n in 24">{{n}}</li>
      <!-- <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li> -->
    </ul>
    <img class="progress" :style="{width:progLength+'%'}" src="../../assets/visual2/progranbar.png"  />
    <img src="../../assets/visual2/ready.png" style="width:100%;height:100%;z-index:99999;position:absolute;top:0%;left:0%;" v-if="isReady" />
    <img style="position:absolute;right:4%;top:10%;" src="../../assets/star.png" @click="timerStar" />
    <img style="position:absolute;right:35%;top:5%;" src="../../assets/visual2/title.png" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        timeLength: 299,
        progLength: 38.5,
        intervalProgress:null,
        intervalTime:null,
        isReady:false,
      }
    },
    mounted() {
      //this.intervalPro();
    },
    methods:{
      timerStar(){
        this.isReady=true;
        this.intervalTimer();
        setTimeout(()=>{
          this.isReady=false;
          this.intervalPro();
        },2000)

      },
      intervalPro(){
        if (this.intervalProgress != null) return
        this.intervalProgress = setInterval(() => {
          if(this.progLength>0){
            var span=this.progLength-3;
            this.progLength=span<0?0:span;
            console.log(this.progLength);
          }else{
            clearInterval(this.intervalProgress);
            this.intervalProgress=null;
          }
        }, 1000);
      },
      intervalTimer(){
        // 计时器为空，操作
        this.intervalTime = setInterval(() => {
          if (this.timeLength > 0) {
            this.timeLength = this.timeLength - 1;
          } else {
            clearInterval(this.intervalTime) //清除计时器
            this.intervalTime = null; //设置为null
            //this.intervalList = null;
            this.timeLength = 299;
          }
        }, 1000)
      },
    }
  }
</script>

<style scoped="scoped">
  .visual {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: url(../../assets/visual2/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 0px -5px;
    -moz-background-size: 100% 100%;
  }

  .visual span {
    position: absolute;
    right: 7%;
    top: 0.1%;
    font-weight: bolder;
    font-size: 30px;
  }

  ul {
    padding: 0px;
    margin: 0px;
    position: absolute;
    top: 18%;
    left: 27.5%;
    width: 45%;
  }

  ul li {
    list-style-type: none;
    display: inline-block;
    border: 1px dashed #808080;
    width: 90px;
    height: 90px;
    text-align: center;
    line-height: 90px;
    border-radius: 25px;
    margin: 0.2% 0.2%;
    background-color: #FFFFFF;
    background-image: url(../../assets/visual2/container.png);
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }

  .progress {
    position: absolute;
    left: 34.5%;
    bottom: 4.8%;
    height: 16px;
  }
</style>
