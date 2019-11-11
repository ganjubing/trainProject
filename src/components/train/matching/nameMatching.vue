<template>
  <div class="matching">
    <span class="surplusTime">{{surplusTime}}</span>
    <div v-if="ready" style="z-index: 9999;position:absolute">
      <img src="@/assets/matching/personInfo.png" style="width: 100%;height: 100%;" />
      <div style="width: 20.5%;height: 20%;position: absolute;top:32%;left: 41.5%;">
        <div style="width: 50%;float: left;height: 100%;position: relative;">
          <img :src="currentPerson.img" style="width: 60%;height: 60%;position: absolute;top:50%;left: 50%;margin-left: -30%;margin-top: -30%;border-radius:5px;" />
        </div>
        <div style="width: 50%;float: left;height: 100%;">
          <span style="font-size: 30px;color: white;text-align:center;display:block;position: relative;top:50%;transform:translateY(-50%);">{{currentPerson.nameCN}}</span>
        </div>
      </div>
      <img src='@/assets/btnContinu.png' style="position: absolute;left: 45%;bottom: 35%;width: 15%;height: 10%;"
        @click="continu" />
    </div>
    <div style="width: 73%;height:68.5%;position: absolute;left: 14.4%;top:14%;">
      <div class="divItem" v-for="item in cellNumber" style="">
        <div v-if="cellImagIndex.indexOf(item)>-1&&arrImg.cellIndex===item" v-for="(arrImg,inex) in headers" @click="checkImg(arrImg)" style="position: relative;">
          <img v-if="arrImg.isChecked" :src="arrImg.img" style="width: 100%;height: 100%;border-radius:10px;" />
          <img v-if="arrImg.isChecked===false" src="@/assets/matching/person.png" style="width: 100%;height: 100%;border-radius:10px;" />
          <!-- <img v-if="arrImg.isChecked" src="@/assets/correct.png" style="position: absolute;left:50%;top:45%;width:50%;height: 50%;" /> -->
        </div>

        <div @click="checkName(arrName)" style="background-color: white;border-radius:10px;width: 100%;height: 100%;"
          v-for="(arrName,inex) in names" v-if="cellNameIndex.indexOf(item)>-1&&arrName.cellIndex===item">
          <span v-if="arrName.isChecked" style="display:block;position: relative;top:50%;transform:translateY(-50%);font-size: 20px;">
            {{arrName.nameCN}}</span>
          <img v-if="!arrName.isChecked" src="@/assets/matching/nameCover.png" style="width: 100%;height: 100%;border-radius:10px;" />
        </div>
      </div>
    </div>
    <div v-if="isNex&&!isCurrentAllCorrent" class="nexInfo" style="">
      <span style="position: absolute;bottom:42%;left:65%;font-size: 50px;font-weight: bolder;color: #e8262b;">{{personList.length+1}}人</span>
      <img src="@/assets/btnContinu.png" style="width:35%;height: 25%;position: absolute;bottom:10%;left:40%;" @click="doNext" />
    </div>
    <div v-if="isNex&&isCurrentAllCorrent" class="nexInfo1" style="">
      <span style="position: absolute;bottom:42%;left:65%;font-size: 50px;font-weight: bolder;color: #e8262b;">{{personList.length+1}}人</span>
      <img src="@/assets/btnContinu.png" style="width:35%;height: 25%;position: absolute;bottom:10%;left:40%;" @click="doNext" />
    </div>
    <div class="divResult" v-show="isTimeout">
      <span style="position: absolute;left: 52%;top: 53.5%;color: #357dd3;font-size: 30px;font-weight: bolder;">{{personNumber}}对</span>
      <span style="position: absolute;left: 52%;top: 59%;color:#357dd3;font-size: 30px;font-weight: bolder;">{{accuracy}}%</span>
      <span style="position: absolute;left: 47%;top: 65%;color:#d7112f;font-size:50px;font-weight:700;">{{Math.round(correctNumber*10.5)}}</span>
      <img style="position: absolute;left: 44%;bottom:8%;width: 12.5%;height: 10%;" src="@/assets/btnContinu.png"
        @click="start" />
    </div>
    <img v-if="isFinish" src="@/assets/matching/completeTip.png" style="width:100%;height: 100%;z-index:9999;position: absolute;top:0;left: 0;" />
  </div>
</template>

<script>
  import {
    userList
  } from '@/data/matching_users.js'
  import {
    randonArr,
    randomLimit,
    getRandomArr,
    randomNumBoth,
  } from '@/utils/common.js'
  export default {
    data() {
      return {
        totalDuration: 299, //计时器总时长(秒)
        surplusTime: 299,//剩余时间
        intervalTime: null,//计时器
        isTimeout: false, //是否时间已到
        ready: false,//是否准备
        isFinish: false, //是否已经全部答完
        users: [],//数据列表
        currentIndex: 0,//当前数据列表索引值
        currentPersonList: [],//当前新增人列表
        currentPerson: {},//新增人
        personList: [], //累计人数列表
        isStart: false,//是否一开始
        cellNumber: 32, //界面总共生成方块数
        cellImagIndex: [], //当前哪个方格存放头像
        cellNameIndex: [], //当前哪个方格存放名字
        names: [],//名字选项
        headers: [],//头像选项
        selectName: null,//当前选择的名字
        selectPerson: null,//当前选择的头像
        selectNameIndex: null,//选择名字的索引
        selectPersonIndex: null,//选择头像的索引
        currentCorretNum: 0,//本题答对个数
        isNex: false,//是否进入下一题
        isCurrentAllCorrent: true,//是否小题全对
        totalAnswerNumber: 0, //总答题次数
        correctNumber: 0, //答对数量
        personNumber: 0, //完成配对人数
      }
    },
    computed: {
      accuracy: function() {
        return Math.round((this.correctNumber / this.totalAnswerNumber).toFixed(2) * 100);
      }
    },
    mounted() {
      this.start()
    },
    methods: {
      intervalTimer() {
        //this.surplusMemory=this.memoryDuration;

        // 计时器为空，操作
        if (this.intervalTime != null) return;
        this.intervalTime = setInterval(() => {
          if (this.surplusTime > 0) {
            this.surplusTime = this.surplusTime - 1;
          } else {
            this.isTimeout = true;
            clearInterval(this.intervalTime);
          }
        }, 1000)
      },
      getCurrentPerson(isFirst) {
        this.isNex = false;
        this.currentPerson = this.users[this.currentIndex];
        this.currentPersonList.push(this.currentPerson);
        this.personList.push(this.currentPerson)
        this.ready = true;
        if (isFirst) {
          this.currentIndex++;
          this.currentPersonList.push(this.users[this.currentIndex]);
          this.personList.push(this.users[this.currentIndex])
        }
      },
      continu() {
        if (this.isStart) {
          this.ready = false;
          this.initData();
        } else {
          if (this.currentPersonList.length == 2) { //显示下一个人
            this.currentPerson = this.currentPersonList[1];
            this.isStart = true;
          } else if (this.currentPersonList.length == 1) { //开始
            this.ready = false;
            this.initData();
          }
        }

      },
      initData() {
        this.cellImagIndex = [];
        this.cellNameIndex = [];
        this.names = [];
        this.headers = [];
        var that = this;
        var count = this.personList.length * 2;
        var indexs = randomNumBoth(1, this.cellNumber, count);
        this.cellImagIndex = getRandomArr(indexs, this.personList.length);
        this.cellNameIndex = indexs.filter(function(v) {
          return that.cellImagIndex.indexOf(v) === -1
        });
        /* console.log(indexs)
        console.log(this.cellImagIndex)
        console.log(this.cellNameIndex) */
        for (var i = 0; i < this.personList.length; i++) {
          this.names.push({
            isName: true,
            cellIndex: that.cellNameIndex[i],
            nameCN: this.personList[i].nameCN,
            nameEN: this.personList[i].nameEN,
            isChecked: false
          })
          this.headers.push({
            isName: false,
            cellIndex: that.cellImagIndex[i],
            img: this.personList[i].img,
            nameEN: this.personList[i].nameEN,
            isChecked: false
          })
        }
      },
      checkName(obj) {
        if (this.selectName != null || obj.isChecked) {
          return;
        } else {
          this.selectName = obj;
          obj.isChecked = true;
        }
        if (this.selectPerson != null) {
          this.totalAnswerNumber += 1;
          if (this.selectPerson.nameEN === this.selectName.nameEN) {
            this.playAudio(true);
            this.selectName = null;
            this.selectPerson = null;
            this.currentCorretNum++;
            this.correctNumber++;

            if (this.currentCorretNum === this.currentPersonList.length) {
              this.personNumber = this.personList.length;
              this.currentIndex++;
              this.isNex = true;
              this.isFinish = this.personList.length == this.users.length; //全部答完
            }
          } else {
            this.playAudio(false);
            this.isCurrentAllCorrent = false;
            setTimeout(() => {
              obj.isChecked = false;
              this.selectPerson.isChecked = false;
              this.selectName = null;
              this.selectPerson = null;
            }, 500)
          }

        }
      },
      checkImg(person) {
        if (this.selectPerson != null || person.isChecked) {
          return;
        } else {
          this.selectPerson = person;
          person.isChecked = true;
        }
        if (this.selectName != null) {
          this.totalAnswerNumber += 1;
          if (this.selectName.nameEN === this.selectPerson.nameEN) {
            this.playAudio(true);
            this.selectPerson = null;
            this.selectName = null;
            this.currentCorretNum++;
            if (this.currentCorretNum === this.currentPersonList.length) {
              this.personNumber = this.personList.length;
              this.currentIndex++;
              this.isNex = true;
              this.isFinish = this.personList.length == this.users.length; //全部答完
            }
          } else {
            this.playAudio(false);
            this.isCurrentAllCorrent = false;
            setTimeout(() => {
              person.isChecked = false;
              this.selectName.isChecked = false;
              this.selectName = null;
              this.selectPerson = null;
            }, 500)
          }

        }
      },
      next() {
        this.currentCorretNum = 0;
        this.getCurrentPerson();
        //this.initData();
      },
      doNext() {
        this.isNex = false;
        this.isCurrentAllCorrent = true;
        this.names = [];
        this.headers = [];
        setTimeout(() => {
          this.next()
        }, 500)

      },
      start() {
        this.surplusTime = this.totalDuration;
        this.currentPersonList = [];
        this.currentCorretNum = 0;
        this.totalAnswerNumber = 0;
        this.correctNumber = 0;
        this.isTimeout = false;
        this.personNumber = false;
        this.cellImagIndex = []; //当前哪个方格存放头像
        this.cellNameIndex = []; //当前哪个方格存放名字
        this.names = [];
        this.headers = [];
        this.selectName = null;
        this.selectPerson = null;
        this.currentIndex = 0;
        this.personList = [];
        this.isNex = false;
        this.isStart = false;
        this.ready = false;
        this.isCurrentAllCorrent=true;
        this.users = userList();
        randonArr(this.users);
        if(this.users.length*2>this.cellNumber){
          this.users=this.users.slice(0,Math.floor(this.cellNumber/2));
        }
        this.intervalTimer();
        this.getCurrentPerson(true);
      },

    },
    watch: {
      isFinish: {
        deep: true,
        handler(newVal) {
          this.isNex = false;
          setTimeout(() => {
            this.isFinish = false;
            this.isTimeout = true;
          }, 2000)
          clearInterval(this.intervalTime);
        },
      }
    }
  }
</script>

<style scoped="scoped">
  .matching {
    width: 100%;
    height: 100vh;
    position: relative;
    background-image: url(../../../assets/matching/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    -moz-background-size: 100% 100%;
  }

  .matching .surplusTime {
    position: absolute;
    right: 18%;
    top: 1%;
    font-weight: bolder;
    font-size: 30px;
    color: white;
  }

  .divItem {
    /*    border: 1px solid #00FF00; */
    margin: 2.5% 0 0 3.2%;
    float: left;
    height: 18.5%;
    width: 9%;
    border-radius: 10px;
    overflow: hidden;
    /* background-image: url(../../../assets/matching/person.png);
    background-repeat: no-repeat;
    background-size: 100% 100%; */
  }

  .nexInfo {
    height: 40%;
    position: absolute;
    top: 20%;
    width: 30%;
    left: 30%;
    background-image: url(../../../assets/matching/nextInfo.png);
    background-size: 100% 100%;
  }

  .nexInfo1 {
    height: 50%;
    position: absolute;
    top: 20%;
    width: 40%;
    left: 30%;
    background-image: url(../../../assets/matching/nextInfo1.png);
    background-size: 100% 100%;
  }

  .divResult {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(../../../assets/matching/result.png);
    /* background-position: center 0; */
    background-repeat: no-repeat;
    /* background-attachment:fixed; */
    background-size: 100% 100%;
    /*随着原始比例缩放*/
    /* -webkit-background-size: cover;
    -o-background-size: cover;*/
    zoom: 1;
    z-index: 9999;
  }
</style>
