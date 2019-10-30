<template>
  <div class="addition">
    <span class="surplusTime">{{surplusTime}}</span>
    <div id="divMain" ref="main" style="border: #000080 solid 1px;position: absolute;width:64%;height:88%;left:4%;top:5%;">
      <!-- <div v-if="!isSmash" ref="boat" :style="{'width':'8.4%','height':' 12.4%','display':'inline-block','margin-top':marginTopH+'px'}">
        <img :src="boatStatusImg" style="width: 100%;height: 100%;background-color: #00FFFF;" />

      </div> -->
      <!-- <div class="boat" style=""></div> -->
      <img ref="smashImg" v-show="isSmash" :src="boatSmashImg" :style="{'width':'20%','height':'7%','background-color':'#00FFFF','margin-top':'62%'}" />
    </div>
    <div class="calc" style="">
      <div style="width: 75%;height: 18.8%;margin: 16.5% 11% 2.5% 11%;">
        <span style="font-size:70px;font-weight: bolder;float: right;margin-right:2%;margin-top:0px;">{{result}}</span>
      </div>
      <div style="width: 75.5%;height: 56.5%;margin: 0% 10.5%;">
        <div style="width: 100%;height: 50%;">
          <div style="width:75%;height: 100%;float: left;">
            <div @click="inputNumber(7)" style="width: 31%;height: 45%;float: left;margin-right:3.5%;">
              <img src="../../../assets/addition/num7.png" style="height: 100%;width: 100%;" />
            </div>
            <div @click="inputNumber(8)" style="width: 31%;height: 45%;float: left;margin-right: 3.5%;">
              <img src="../../../assets/addition/num8.png" style="height: 100%;width: 100%;" />
            </div>
            <div @click="inputNumber(9)" style="width: 31%;height: 45%;float: left;margin-right: 0%">
              <img src="../../../assets/addition/num9.png" style="height: 100%;width: 100%;" />
            </div>
            <div @click="inputNumber(4)" style="width: 31%;height: 45%;float: left;margin:4% 3.5% 0% 0%">
              <img src="../../../assets/addition/num4.png" style="height: 100%;width: 100%;" />
            </div>
            <div @click="inputNumber(5)" style="width: 31%;height: 45%; solid;float: left;margin:4% 3.5% 0 0">
              <img src="../../../assets/addition/num5.png" style="height: 100%;width: 100%;" />
            </div>
            <div @click="inputNumber(6)" style="width: 31%;height: 45%; solid;float: left;margin-top: 4%">
              <img src="../../../assets/addition/num6.png" style="height: 100%;width: 100%;" />
            </div>
          </div>
          <div @click="doClear" style="width: 23%;height: 97%;float: left;margin-left:2% ;">
            <img src="../../../assets/addition/btnClear.png" style="height: 100%;width: 100%;" />
          </div>
        </div>
        <div style="width:100%;height:49%;margin-top:1% ;">
          <div style="width:75%;height: 100%;float: left;z-index: 9999;position: relative;">
            <div @click="inputNumber(1)" style="width: 31%;height: 45%;float: left;margin-right:3.5%;">
              <img src="../../../assets/addition/num1.png" style="height: 100%;width: 100%;" />
            </div>
            <div @click="inputNumber(2)" style="width: 31%;height: 45%;float: left;margin-right: 3.5%;">
              <img src="../../../assets/addition/num2.png" style="height: 100%;width: 100%;" />
            </div>
            <div @click="inputNumber(3)" style="width: 31%;height: 45%;float: left;margin-right: 0%;z-index: 9999;">
              <img src="../../../assets/addition/num3.png" style="height: 100%;width: 100%;z-index: 9999;" />
            </div>
            <div @click="inputNumber(0)" style="width:82%;height: 45%;float: left;margin:4% 3.5% 0% 0%">
              <img src="../../../assets/addition/num0.png" style="height: 100%;width: 100%;" />
            </div>
          </div>
          <div style="width: 26%;height: 100%;float: left;margin-left:2%;">
            <img src="../../../assets/addition/btnConfirm.png" style="height: 27%;width:28%; position: absolute;right:14%;bottom:11%;z-index: 1;" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import boatImg from "@/assets/addition/boat.png"
  import boatSmash from "@/assets/addition/boatSmash1.png"
  import {
    randonArr,
    randomLimit,
    getRandomArr,
    randomNumBoth,
  } from '../../../utils/common.js'
  export default {
    computed: {},
    mounted() {
      this.mainHeight = this.$refs.main.offsetHeight;
      /* this.boatHeight=this.$refs.boat[0].offsetHeight; */
      this.smashImgH = this.$refs.smashImg.height;
      /* console.log(this.smashImgH)
       this.mainHeight=parseInt(this.mainHeight)-parseInt(this.boatHeight); */
      //this.createBoat()
      this.startBoat();
      this.create();
      /* this.boatLeft=randomNumBoth(0,91.6,1);
      var dd=getRandomArr(this.boatColors,1);
      console.log(dd); */
    },
    data() {
      return {
        surplusTime: 99,
        result: '0',
        mainHeight: 0,
        boatHeight: 0,
        marginTopH: 0,
        smashImgH: 0,
        boatInterval: null,
        boatStatusImg: boatImg,
        boatSmashImg: boatSmash,
        isSmash: false,
        boatLeft: 0,
        boatColors: ['#32c333', '#ff7aab', '#f2582a', '#fd7bad'],
      }
    },
    methods: {
      inputNumber(val) {
        if (this.result.length > 6) return;
        if (parseInt(this.result) <= 0 && val === 0) {
          this.result = "0";
        } else {
          this.result = this.result == '0' ? val : this.result.toString() + val.toString();
        }
        console.log(this.result)
      },
      doClear() {
        this.result = this.result.substring(0, this.result.length - 1)
        if (this.result.length <= 0) {
          this.result = "0";
        }
      },
      createBoat() {
        var topH = 0;
        var left = randomNumBoth(0, 91.6, 1)[0];
        var bg = getRandomArr(this.boatColors, 1)[0];
        var div = document.createElement('div');
        div.className = "boat";
        div.style.left = left + '%';
        div.style.top = topH + '%';
        div.style.backgroundColor = bg;
        document.getElementById("divMain").appendChild(div);
        var interverBoat = setInterval(() => {
          var currentH = topH + 20;
          if (currentH < this.mainHeight) {
            topH = currentH;
          } else {
            this.isSmash = true;
            //this.boatStatusImg=boatSmash;
            clearInterval(interverBoat)
          }
        }, 500);
      },
      create() {
        var that = this;
        var left = randomNumBoth(0, 91.6, 1)[0];
        var bg = getRandomArr(this.boatColors, 1)[0];
        var MyComponent = Vue.extend({
          template: "<div class='boat' v-bind:style='[baseStyles]'></div>",
          methods: {
            selectResult: function() {
              var interverBoat = setInterval(() => {
                var currentH = that.marginTopH + 20;
                if (currentH < that.mainHeight) {
                  that.marginTopH = currentH;
                } else {
                  that.isSmash = true;
                  //this.boatStatusImg=boatSmash;
                  clearInterval(interverBoat)
                }
this.baseStyles = Object.assign({}, this.baseStyles, {marginTop:that.marginTopH})
              }, 500);

              
            }
          },
          mounted() {
            this.selectResult();

          },
          data() {
            return {
              baseStyles: {
                marginTop: that.marginTopH + '%',
                backgroundColor: bg,
                left: left + '%',
              },
            }
          },
          watch: {
            baseStyles: {
              deep: true,
              handler: function(val, oldval) {
                console.log(val)
              },
            }
          }
        });
        var component = new MyComponent().$mount();
        document.getElementById('divMain').appendChild(component.$el);

      },
      startBoat() {
        this.boatInterval = setInterval(() => {
          var currentH = this.marginTopH + 20;
          if (currentH < this.mainHeight) {
            this.marginTopH = currentH;
          } else {
            this.isSmash = true;
            //this.boatStatusImg=boatSmash;
            clearInterval(this.boatInterval)
          }
        }, 500);
      },
    },
  }
</script>

<style>
  .addition {
    width: 100%;
    height: 100vh;
    /* position: fixed; */
    position: relative;
    background-image: url(../../../assets/addition/bg.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    -moz-background-size: 100% 100%;
  }

  .addition .surplusTime {
    position: absolute;
    right: 15%;
    top: 0%;
    font-weight: bolder;
    font-size: 30px;
  }

  .calc {
    position: absolute;
    width: 20.4%;
    height: 55.9%;
    right: 6%;
    bottom: 22%;
    background-image: url(../../../assets/addition/calculator.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .boat {
    position: absolute;
    top: 0px;
    /* left:91.6%; */
    width: 8.4%;
    height: 12.4%;
    background-image: url(../../../assets/addition/boat.png);
    background-size: cover;
  }
</style>
