<template>
  <div class="hello">
    <!-- <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#3387EE"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">唐山市二次供水监控调度平台</el-menu-item>
    </el-menu> -->
    <div class="container" v-loading.fullscreen.lock="loading" element-loading-text="数据加载中">
      <!-- <div class="left">
        <div class="leftTop">
          <el-input size="mini" placeholder="模糊查询" v-model="searchData">
            <el-button size="mini" slot="prepend" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <el-tree :data="treeData" default-expand-all :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div> -->
      <div class="content" v-if="basicData != null && selectPlace != null">
        <div class="name">
          <h1>{{selectPlace}}</h1>
        </div>
        <div class="prop1">
          <h4>进线柜监控参数</h4>
          <h5>市电接入模式：主电源</h5>
          <div>
            <div class="block1" v-for="item in prop1Title">
              <!-- <div v-for="itemInfo in item"> -->
                <div>{{item[0]}}</div>
                <div class="blo1data">&nbsp;{{parseFloat(basicData[item[1]]).toFixed(2)}}&nbsp;</div><div style="display:inline-block">{{item[2]}}</div>
              <!-- </div> -->
            </div>
          </div>
        </div>
        <div class="prop2">
          <div class="prop2-1">
            <h4>进水参数</h4>
            <div class="block1" v-for="item in prop2Title">
              <!-- <div v-for="key,value in item"> -->
                <div>{{item[0]}}</div>
                <div class="blo1data">&nbsp;{{parseFloat(basicData[item[1]]).toFixed(2)}}&nbsp;</div><div style="display:inline-block">{{item[2]}}</div>
              </div>
            <!-- </div> -->
          </div>
          <div class="prop2-2">
            <h4>水箱液位</h4>
            <div class="block1" v-for="item in prop3Title">
                <div>{{item[0]}}</div>
                <div class="blo1data">&nbsp;{{parseFloat(basicData[item[1]]).toFixed(2)}}&nbsp;</div><div style="display:inline-block">{{item[2]}}</div>
            </div>
          </div>
        </div>
        <canvas id="myCanvas" width="1300" height="850" @click="clickCanvas">
        </canvas>
        <div class="video">
          <div class="video-top">
            <h3>视频区</h3>
            <!-- <div v-if="appname == 0">
              <video width="320" height="240" controls="controls" autoplay="autoplay" v-for="item in videos">
                <source :src="'http://111.61.241.172:10083/mag/hls/'+item+'/1/live.m3u8'" type="video/mp4">
              </video>
            </div>
            <div v-if="appname == 1"> -->
              <!-- <div class="videos" :id="item" v-for="item in videos"></div> -->

              <iframe name="videoFrame" class="blocktop" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes" src="/static/video.html" :id="videoSelected" ></iframe>
              <el-select v-model="videoSelected" placeholder="请选择" @change="videoChange">
                <el-option
                  v-for="item,index in videos"
                  :key="item"
                  :label="'通道'+videoLabel[index]"
                  :value="item">
                </el-option>
              </el-select>
            <!-- </div> -->
          </div>
          <div class="video-bottom">
            <h3>报警区</h3>
            <div style="width:388px">
              <el-table
                :data="alertOwnData"
                style="color:red;width:100%;background:#CCDDFF !important;"
                :row-class-name="selectTableRow"
                border
                height="320">
                <el-table-column
                  prop="day"
                  label="报警日期"
                  width="90">
                </el-table-column>
                <el-table-column
                  prop="time"
                  label="报警时间"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="params"
                  label="变量名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="value"
                  label="报警值"
                  width="70">
                </el-table-column>
                <!-- <el-table-column
                  prop="exvalue"
                  label="限值"
                  width="120">
                </el-table-column> -->
                <el-table-column
                  prop="text"
                  label="报警文本"
                  width="100">
                </el-table-column>
                <!-- <el-table-column
                  prop="type"
                  label="报警类型"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="case"
                  label="事件类型"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="reason"
                  label="操作备注"
                  width="120">
                </el-table-column> -->
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div style="width:1920px">
      <el-table
        :data="alertData"
        style="color:red;width:100%"
        border
        height="250">
        <el-table-column
          prop="day"
          label="报警日期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="time"
          label="报警时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="place"
          label="区块"
          width="120">
        </el-table-column>
        <el-table-column
          prop="room"
          label="泵房名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="params"
          label="变量名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="alertG"
          label="报警组"
          width="120">
        </el-table-column>
        <el-table-column
          prop="value"
          label="报警值"
          width="120">
        </el-table-column>
        <el-table-column
          prop="exvalue"
          label="限值"
          width="120">
        </el-table-column>
        <el-table-column
          prop="text"
          label="报警文本"
          width="120">
        </el-table-column>
        <el-table-column
          prop="type"
          label="报警类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="case"
          label="事件类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="reason"
          label="操作备注"
          width="120">
        </el-table-column>
      </el-table>
    </div> -->
    <el-dialog
      :title="selectNum+'#控制柜参数监控'"
      :visible.sync="showParams"
      width="320px"
      :before-close="paramClose">
      <div style="height:400px;" class="prop4" v-if="selectData.length > 0">
        <div class="block1" v-for="item in selectData">
          <!-- <div v-for="key,value in item"> -->
            <div>{{item[0]}}</div>
            <div class="blo1data">&nbsp;{{parseFloat(basicData[item[1]]).toFixed(2)}}&nbsp;</div>
            <div style="display:inline-block;">{{item[2]}}</div>
        </div>
        <el-row v-for="n in basicData.data[selectNum].num">
          <div class="block1">
            <!-- <div v-for="key,value in item"> -->
              <div>{{n}}#泵功率因数</div>
              <div class="blo1data">&nbsp;{{parseFloat(basicData["泵组"+selectNum+"区"+n+"#泵变频器运行功率因数"]).toFixed(2)}}&nbsp;</div>
              <div style="display:inline-block;">%</div>
          </div>
          <div class="block1">
            <!-- <div v-for="key,value in item"> -->
              <div>累计运行天数</div>
              <div class="blo1data">&nbsp;{{basicData["泵组"+selectNum+"区"+n+"#泵变频器累计运行天数"]}}&nbsp;</div>
              <div style="display:inline-block;">天</div>
          </div>
        </el-row>
        <el-row v-if="basicData.data[selectNum]['isFu'] == true">
          <div class="block1">
            <!-- <div v-for="key,value in item"> -->
              <div>辅泵功率因数</div>
              <div class="blo1data">&nbsp;{{parseFloat(basicData["泵组"+selectNum+"区辅泵变频器运行功率因数"]).toFixed(2)}}&nbsp;</div>
              <div style="display:inline-block;">%</div>
          </div>
          <div class="block1">
            <!-- <div v-for="key,value in item"> -->
              <div>累计运行天数</div>
              <div class="blo1data">&nbsp;{{basicData["泵组"+selectNum+"区辅泵变频器累计运行天数"]}}&nbsp;</div>
              <div style="display:inline-block;">天</div>
          </div>
        </el-row>
      </div>

    </el-dialog>
  </div>
</template>

<script>

import global from './global'
import axios from 'axios'
// import
// axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'

export default {
  name: 'HelloWorld',
  data () {
    return {
      appname:null,
      basicData:null,
      searchData:null,
      selectPlace:null,
      loading:false,
      ctx:null,
      alertData:[],
      alertOwnData:[],
      showParams:false,
      selectNum:-1,
      selectData:[],
      baseTreeData:[],
      videos:[],
      players:[],
      allvideos:[],
      videoSelected:null,
      videoLabel:["一","二","三","四","五","六","七","八"],
      image:[{src:"static/bengzu.png"},{src:"static/beng.png"},{src:"static/ra.png"}
    ,{src:"static/al.png"},{src:"static/b_y.png"},{src:"static/b_r.png"},{src:"static/b_g.png"},{src:"static/beng_s.png"}],
      treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        prop1Title:[['线电压Uab','进线柜线电压Uab','V'],['线电压Ubc','进线柜线电压Ubc','V'],['线电压Uca','进线柜线电压Uca','V'],['相电压Ua','进线柜相电压Ua','V'],['相电压Ub','进线柜相电压Ub','V'],['相电压Uc','进线柜相电压Uc','V'],
        ['线电流IA','进线柜线电流IA','A'],['线电流IAB','进线柜线电流IB','A'],['线电流IC','进线柜线电流IC','A'],['有功功率','进线柜有功功率','KW'],['功率因数','进线柜功率因数','%'],['累计电能','进线柜累计电能','KWh']],
        prop2Title:[['1#进水压力','进水压力1','Mpa'],['2#进水压力','进水压力2','Mpa'],['1#进水流量','进水瞬时流量1','t/h'],['2#进水流量','进水瞬时流量1','t/h'],['1#进水流量累计','进水累计流量1','t'],['2#进水流量累计','进水累计流量2','t']],
        prop3Title:[['1#水箱液位','水箱液位1','m'],['2#水箱液位','水箱液位2','m'],['3#水箱液位','水箱液位3','m'],['4#水箱液位','水箱液位4','m']],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  //二组六泵 学警路
  created(){
    this.selectPlace = this.$route.params.id
    this.getJson()
    this.getVideoJson()

    // console.log(this.$route.params.id)
    // console.log(navigator.appName)
    // console.log(navigator.userAgent)
    // this.appname = navigator.userAgent.indexOf('Edge') != "-1" ? 0:1 //1 chrome firefox 0 ie
    // if(this.selectPlace) {
    //   this.loading = true;
    // }
  },
  mounted(){
    // this.promiseLoadImage()
    this.loading = true;
    this.promiseLoadImage()
  },
  watch: {
    // '$route' (to, from) {
    //   // react to route changes...
    //   this.selectPlace = to.params.id
    //   this.videos = this.allvideos[this.selectPlace]
    //   this.loading = true;
    //   this.promiseLoadImage()
    // },
    searchData(cul,old){
      console.log(cul,old)

      if(cul == "" || cul == null) {
        this.treeData = this.baseTreeData
      } else {
        var temp = []
        this.baseTreeData.forEach(function(item){
          if(item.label.indexOf(cul)==-1){// 一级不存在该子串
            var tempChildren = []
            item.children.forEach(function(item2){
              if(item2.label.indexOf(cul) != -1) {
                tempChildren.push(item2)
              }
            })
            temp.push({label:item.label,children:tempChildren})
          } else {
            temp.push(item)
          }
        })
        this.treeData = temp;
      }
    }
  },
  methods: {
    handleNodeClick(data) {
        if(data.children == null) {
          this.$router.push({name:"HelloWorld",params:{id:data.label}})
        }
    },
    videoChange(val){
      console.log(val)
      this.$nextTick(function () {
        document.getElementById(val).src="/static/video.html";
      })
    },
    clickCanvas(item){
      var cvs = document.getElementById("myCanvas");
      var x = item.offsetX;
      var y = item.offsetY;
      var i = 1;
      if(x>= 1025 && x<=1090){
        while(this.basicData.data[i] != null) {
          if(y>=(170+(i-1)*195) && y<=(170+i*195)){
            this.showParamTable(i)
          }
          i++;
        }
      }
    },
    selectTableRow(){
      return "tablerow"
    },
    paramClose(){
      this.showParams = !this.showParams;
    },
    showParamTable(num){
      this.selectNum = num;
      this.selectData = [['相电压Ua','泵组'+num+'区控制柜相电压Ua','V'],['相电压Ub','泵组'+num+'区控制柜相电压Ub','V'],['相电压Uc','泵组'+num+'区控制柜相电压Uc','V'],
      ['相电流IA','泵组'+num+'区控制柜相电流IA','A'],['相电流IAB','泵组'+num+'区控制柜相电流IB','A'],['相电流IC','泵组'+num+'区控制柜相电流IC','A']]
        this.showParams = !this.showParams;
    },
    promiseLoadImage(){
      var self = this
      let arrPromise = []
      for(let i = 0; i < this.image.length; i++){
        var p = new Promise((resolve, reject) => {
          self.image[i].data = new Image()
          self.image[i].data.src = self.image[i].src
          self.image[i].data.onload = function(){
            resolve()
          }
        });
        arrPromise.push(p)
      }
      Promise.all(arrPromise).then(() => {
        this.getRegionInfo(self.selectPlace)
      });

    },
    getJson(){
      var self = this
      axios.get("../static/place.json").then((res)=>{
        self.treeData = self.analyseRegion(res.data)
        self.baseTreeData = self.treeData
        self.getAlertInfo()
      })
    },
    getVideoJson(){
      var self = this
      axios.get("../static/video.json").then((res)=>{
        console.log(res)
        self.allvideos = res.data
        self.videos = self.allvideos[self.selectPlace]
        if(self.videos){
          self.videoSelected = self.videos[0]
        }
      })
    },
    analyseRegion(data){
      var res = [];
      var temp = data.split(';')
      temp.forEach(function(item){
        var areaname = item.split(':')
        var temp1 = areaname[1].split(',')
        var temp2 = []
        temp1.forEach(function(item1){
          temp2.push({label:item1})
        })
        res.push({label:areaname[0],children:temp2})
      })
      return res
    },
    timeAdd(data){
      // console.log(data,data.length)
      return data > 9 ? data : "0"+data
    },
    getAlertInfo(){
      var self = this
      global.apiGet(this,"getAlert",null).then(function(res){
        var returnDate = []
        Object.keys(res).forEach(function(key){
          var tempEntity = {}
          var temp = new Date(parseInt(res[key]))
          var tempKey = key.split(".")
          tempEntity.day = temp.getFullYear()+"/"+(temp.getMonth()+1)+"/"+temp.getDate()
          tempEntity.time = self.timeAdd(temp.getHours())+":"+self.timeAdd(temp.getMinutes())+":"+self.timeAdd(temp.getSeconds())
          self.treeData.forEach(function(item){
            item.children.forEach(function(item2){
              // console.log(item2.label)
              if(item2.label == tempKey[1]) {
                tempEntity.place = item.label
              }
            })
          })
          tempEntity.room = tempKey[1]
          tempEntity.params = tempKey[2]
          tempEntity.alertG = "RootNode"
          tempEntity.value = "true"
          tempEntity.exvalue = "0"
          tempEntity.text = tempKey[2]
          tempEntity.type = "离散开"
          tempEntity.case = "报警"
          tempEntity.reason = ""
          returnDate.push(tempEntity)
        })
        self.alertData = returnDate
        self.alertOwnData = []
        self.alertData.forEach(function(item){
          if(item.room == "self.selectPlace"){
            self.alertOwnData.push(item)
          }
        })
      })
    },
    getRegionInfo(item){
      var self = this
      global.apiGet(this,"getRegionInfo?region="+item,null).then(function(res){
        self.basicData = res
        self.analyseData(res)
        var p = setTimeout(()=>{
          var cvs = document.getElementById("myCanvas");
          self.ctx = cvs.getContext('2d');
          self.ctx.clearRect(0,0,cvs.width,cvs.height);
          self.draw()
          setTimeout(()=>{
            self.getRegionInfo(self.selectPlace)
          },30000)
        }, 3000);
        // self.draw()
        console.log(self.basicData)
      }).catch((item)=>{
        console.log(item)
      })
    },
    analyseData(data){
      var temp={};
      temp.data = {};
      Object.keys(data).forEach(function(key){
        var temp2 = key.split('.')
        temp[temp2[2]] = data[key]
        //泵房数据
        if(temp2[2].substring(0,2) == "泵组" && temp2[2].substring(3,4)=="区"){
          var bengqu = parseInt(temp2[2].substring(2,3))
          var beng = temp2[2].substring(4,5)
          if(beng == "辅") {
            if(temp.data[bengqu] == null) {
              temp.data[bengqu] = {num:0,isFu:true}
            } else {
              temp.data[bengqu].isFu = true
            }
          } else if(parseInt(beng) && temp2[2].substring(5,6) == "#"){
            if(temp.data[bengqu] == null){
              temp.data[bengqu] = {num:parseInt(beng),isFu:false}
            } else if( temp.data[bengqu].num < parseInt(beng)) {
              temp.data[bengqu].num = parseInt(beng)
            }
          }
        }

      })
      this.basicData = temp
    },
    draw(){
      var i=1;
      while(this.basicData.data[i] != null) {
        this.drawGroup(i,this.basicData.data[i]);
        i++;
      }
      this.drawBlock()
      this.drawWaterPull()
      this.drawWaterBox()
      this.drawWaterTap()
      this.drawAlarm()
      this.loading = false;
    },
    drawGroup(num,item){
      this.groupClick = []
      var temp = ["一区","二区","三区","四区"]
      this.ctx.drawImage(this.image[0].data,419,55+(num-1)*195)
      //几区
      this.drawText(temp[num-1],1040,145+(num-1)*195,"black","18px")
      this.drawText(parseFloat(this.basicData["泵组"+num+"区泵组出口压力"]).toFixed(2),1035,85+(num-1)*195)
      //TODO 控制模式
      if(this.basicData["泵组"+num+"区泵组运行"] == "true" || this.basicData["泵组"+num+"区泵组运行模式"] == "true"){
          this.drawText("控制模式 自动",1020,165+(num-1)*195,"black","14px")
      } else {
          this.drawText("控制模式 手动",1020,165+(num-1)*195,"black","14px")
      }
      this.drawText("参数监控",1030,190+(num-1)*195,"black","14px")
      this.drawStrokeRect(1025,175+(num-1)*195,65,20,{color:"gray"})
      //超压报警
      if(this.basicData["泵组"+num+"区泵组出口超压告警"] == "true"){
        this.drawText("超压报警",1055,110+(num-1)*195,"red","14px")
      }
      //变线器断线
      if(this.basicData["泵组"+num+"区压力变送器断线"] == "true"){
        this.drawText("变线器断线",890,90+(num-1)*195,"red","14px")
      }
      //泵信息
      for(var i=0;i<parseInt(item.num);i++){
        this.drawSingle(num,i+1,419+85*i,118+(num-1)*195)
      }
      if(item.isFu) {
        console.log("辅泵")
        this.drawSmSingle(num,419+85*item.num,118+(num-1)*195)
      }
    },
    //单个泵信息
    drawSingle(groupN,singleNum,x,y){
      console.log("变频器运行："+this.basicData["泵组"+groupN+"区"+singleNum+"#泵变频器运行"])
      this.ctx.drawImage(this.image[1].data,x,y)
      this.drawText(parseFloat(this.basicData["泵组"+groupN+"区"+singleNum+"#泵变频器运行频率"]?this.basicData["泵组"+groupN+"区"+singleNum+"#泵变频器运行频率"]:"0.0").toFixed(2),x+31,y+129)
      this.drawText(parseFloat(this.basicData["泵组"+groupN+"区"+singleNum+"#泵变频器运行电流"]?this.basicData["泵组"+groupN+"区"+singleNum+"#泵变频器运行电流"]:"0.0").toFixed(2),x+31,y+154)
      if(this.basicData["泵组"+groupN+"区"+singleNum+"#泵变频器运行"] == "true"){
        this.ctx.drawImage(this.image[6].data,x+26,y+26)
      } else {
        this.ctx.drawImage(this.image[5].data,x+26,y+26)
      }
    },
    //通讯报警
    drawAlarm(){
      if(this.basicData.CommStatus == "true") {
        this.drawAlarmSingle(0,"泵房")
      }
      var temp = 1;
      var i = 1;
      var temp2 = ["一区","二区","三区","四区"]
      while(this.basicData.data[i] != null) {
        if(this.basicData["泵组"+i+"区PLC通讯故障"] == "true"){
          this.drawAlarmSingle(temp,temp2[i-1]+"泵组")
          temp++
        }
        i++;
      }
    },
    drawAlarmSingle(num,text){
      this.ctx.drawImage(this.image[2].data,320+num*170,5)
      this.drawText(text+"通讯失败",370+num*170,27,"red","15px")
    },
    //辅泵信息
    drawSmSingle(groupN,x,y){
      console.log("变频器运行："+this.basicData["泵组"+groupN+"区辅泵变频器运行"])
      this.ctx.drawImage(this.image[7].data,x,y)
      this.drawText(parseFloat(this.basicData["泵组"+groupN+"区辅泵变频器运行频率"]?this.basicData["泵组"+groupN+"区辅泵变频器运行频率"]:"0.0").toFixed(2),x+31,y+129)
      this.drawText(parseFloat(this.basicData["泵组"+groupN+"区辅泵变频器运行电流"]?this.basicData["泵组"+groupN+"区辅泵变频器运行电流"]:"0.0").toFixed(2),x+31,y+154)
      if(this.basicData["泵组"+groupN+"区辅泵变频器运行"] == "true"){
        this.ctx.drawImage(this.image[6].data,x+29,y+42,16,16)
      } else {
        this.ctx.drawImage(this.image[5].data,x+29,y+42,16,16)
      }
    },
    //烟雾报警 地面积水 电动阀1故障
    drawBlock(){
      console.log("烟雾:"+this.basicData["烟雾告警1"]+",水浸:"+this.basicData["水浸告警"])
      if(this.basicData["烟雾告警1"] == "true") {
        this.ctx.drawImage(this.image[3].data,21,495)
      }
      if(this.basicData["水浸告警"] == "true"){
        this.ctx.drawImage(this.image[3].data,21,535)
      }
      var temp = this.basicData["电动阀1故障"] == "true" ? "电动阀1":""
      var temp1 = this.basicData["电动阀2故障"] == "true" ? "电动阀2":""
      temp = (temp1 != "" && temp != "")?temp+"、"+temp1:temp+temp1
      if(temp != ""){
        this.drawText(temp+"故障",85,485,"red","13px")
      }
    },
    //污水泵
    drawWaterPull(){
      console.log("污水泵:"+this.basicData["污水泵1运行"]+","+this.basicData["污水泵2运行"]+",状态:"+this.basicData["污水泵控制模式"])
      console.log("集水坑高、超高液位:"+this.basicData["集水坑高液位"]+","+this.basicData["集水坑超高液位"])
      if(this.basicData["污水泵1运行"] == "true") {
        this.ctx.drawImage(this.image[6].data,10,717)
      }else {
        this.ctx.drawImage(this.image[5].data,10,717)
      }
      if(this.basicData["污水泵2运行"] == "true"){
        this.ctx.drawImage(this.image[6].data,43,717)
      }else {
        this.ctx.drawImage(this.image[5].data,43,717)
      }

      this.drawText("集水坑状态",9,695,"black","14px")
      var temp = this.basicData["污水泵控制模式"] == "true" ? "自动":"手动"
      this.drawText("状态 "+temp,10,713,"black","12px")

      if(this.basicData["集水坑超高液位"] == "true") {
        this.drawText("超高液位",10,815,"red","13px")
      }
      if(this.basicData["集水坑高液位"] == "true"){
        this.drawText("高液位",10,800,"red","13px")
      }
    },
    //水箱液位
    drawWaterBox(){
      console.log("水箱液位1:"+this.basicData["水箱液位1"]+","+"水箱超低、超高水位告警:"+this.basicData["水箱超低水位告警"]+","+this.basicData["水箱超高水位告警"])
      this.drawText("------水箱液位:"+parseFloat(this.basicData["水箱液位1"]).toFixed(2)+"------",190,650,"black","16px")
      if(this.basicData["水箱超低水位告警"] == "true") {
        this.drawText("超低液位",320,700,"red","13px")
      }
      if(this.basicData["水箱超高水位告警"] == "true"){
        this.drawText("超高液位",320,595,"red","13px")
      }
    },
    //进水开关阀
    drawWaterTap(){
      //电动阀1
      this.drawText("进水电动阀1",210,440,"black","14px")
      this.drawText("状态:"+(this.basicData["电动阀1操作模式"] == "true"?"自动":"手动"),220,455,"black","12px")
      this.drawText("开到位",210,470,"black","12px")
      var tempCol = this.basicData["电动阀1开到位"] == "true" ? "green":"gray";
      this.drawFillRect(250,460,24,12,{color:tempCol})
      this.drawText("关到位",210,485,"black","12px")
      tempCol = this.basicData["电动阀1关到位"] == "true" ? "green":"gray";
      this.drawFillRect(250,475,24,12,{color:tempCol})
      this.drawStrokeRect(208,427,85,62,{color:"#00CCFF"})
      //电动阀2
      this.drawText("进水电动阀2",320,440,"black","14px")
      this.drawText("状态:"+(this.basicData["电动阀2操作模式"] == "true"?"自动":"手动"),330,450,"black","12px")
      this.drawText("开到位",320,470,"black","12px")
      var tempCol = this.basicData["电动阀2开到位"] == "true" ? "green":"gray";
      this.drawFillRect(360,460,24,12,{color:tempCol})
      this.drawText("关到位",320,485,"black","12px")
      tempCol = this.basicData["电动阀2关到位"] == "true" ? "green":"gray";
      this.drawFillRect(360,475,24,12,{color:tempCol})
      this.drawStrokeRect(318,427,85,62,{color:"#00CCFF"})
    },
    drawText(content,x,y,color,size){
      this.ctx.font= (size?size:"12px") + " Helvetica";
      this.ctx.fillStyle = color?color:"#09EE03";
      this.ctx.fillText(content,x,y);
    },
    drawStrokeRect(x,y,width,height,params){
      this.ctx.beginPath();
      this.ctx.lineWidth=params.line ? params.line:"1";
      this.ctx.strokeStyle=params.color? params.color:"gray";
      this.ctx.rect(x,y,width,height);
      this.ctx.stroke();
    },
    drawFillRect(x,y,width,height,params){
      this.ctx.beginPath();
      this.ctx.fillStyle=params.color? params.color:"gray";
      this.ctx.rect(x,y,width,height);
      this.ctx.fill();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-menu-demo {
  padding-left: 200px;
  width: 1720px;
}
.container {
  width: 1730px;
  height: 870px;
}
.leftTop {
  background-color: white
}
.left{
  width: 170px;
  float:left;
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
  /* border: 1px solid #cccccc; */
  height: 850px;
  overflow-y: scroll;
  /* background-color: #3387EE; */
  /* background-color: #CCDDFF; */

  -ms-scroll-chaining: chained;
    -ms-overflow-style: none;
    -ms-content-zooming: zoom;
    -ms-scroll-rails: none;
    -ms-content-zoom-limit-min: 100%;
    -ms-content-zoom-limit-max: 500%;
    -ms-scroll-snap-type: proximity;
    -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
    -ms-overflow-style: none;
}
.left::-webkit-scrollbar {
    width:0px;
    height:0px;
}
.left::-webkit-scrollbar-button    {
    background-color:rgba(0,0,0,0);
}
.left::-webkit-scrollbar-track     {
    background-color:rgba(0,0,0,0);
}
.left::-webkit-scrollbar-track-piece {
    background-color:rgba(0,0,0,0);
}
.left::-webkit-scrollbar-thumb{
    background-color:rgba(0,0,0,0);
}
.left::-webkit-scrollbar-corner {
    background-color:rgba(0,0,0,0);
}
.left::-webkit-scrollbar-resizer  {
    background-color:rgba(0,0,0,0);
}
.left::-webkit-scrollbar {
    width:10px;
    height:10px;
}
.content{
  width: 1720px;
  float: left;
  padding: 5px;
  /* background-color: #CCDDFF; */
  height: 850px;
  background: url('/static/all.jpg') no-repeat;
}
.name {
  text-align: center;
  width: 310px;
  background-color:#DDEEFE;
}
.name h1 {
  margin-bottom: 0px;
}
.prop1 {
  text-align: center;
  width: 280px;
  border: 1px solid #333333;
  height: 210px;
  padding-left: 15px;
  padding-right: 15px;
}
.prop4{
  text-align: center;
  height: 210px;
}
h4 {
  margin: 5px;
}
.prop1 h5 {
  margin: 0px;
}
.block1 {
  float: left;
  border: 1px solid #97BAE5;
  background-color:#DDEEFE;
  width: 90px;
  font-size: 12px;
}
/* .block1 span {
  font-size: 12px;
} */
.blo1data {
  background-color:#000000;
  color: #09BE03;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 2px;
}
.prop2{
  width: 390px;
  border: 1px solid #333333;
  padding-left: 5px;
  padding-right: 5px;
  height:140px;
  text-align: center;
  font-size: 12px;
  z-index:99999 ;
}
.prop2-1 {
  width: 195px;
  float: left;
}
.prop2-2 {
  width: 195px;
    float: left;
}
.video {
  /* position: fixed; */
  /* top: 0; */
  float: right;
  margin-top: -425px;
  width: 390px;
  height:865px;
}
.video-top {
  text-align: center;
  height: 460px;
  border: 1px solid #333333;
}
.video-bottom {
  text-align: center;
  /* height: 335px; */
  border: 1px solid #333333;
  margin-top: -1px;
}
#myCanvas{
  margin-top:-420px;
  z-index:-1;
  /* background-color: #eeeeee; */
}
iframe {
  /* border: 1px solid #333333; */
  width: 100%;
  height: 340px;
}
.blocktop{

    /* margin-left: 10px; */

    overflow-x: none;
    -ms-scroll-chaining: chained;
    -ms-overflow-style: none;
    -ms-content-zooming: zoom;
    -ms-scroll-rails: none;
    -ms-content-zoom-limit-min: 100%;
    -ms-content-zoom-limit-max: 500%;
    -ms-scroll-snap-type: proximity;
    -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
    -ms-overflow-style: none;
  }
  .blocktop::-webkit-scrollbar {
  width:0px;
  height:0px;
  }
  .blocktop::-webkit-scrollbar-button    {
      background-color:rgba(0,0,0,0);
  }
  .blocktop::-webkit-scrollbar-track     {
      background-color:rgba(0,0,0,0);
  }
  .blocktop::-webkit-scrollbar-track-piece {
      background-color:rgba(0,0,0,0);
  }
  .blocktop::-webkit-scrollbar-thumb{
      background-color:rgba(0,0,0,0);
  }
  .blocktop::-webkit-scrollbar-corner {
      background-color:rgba(0,0,0,0);
  }
  .blocktop::-webkit-scrollbar-resizer  {
      background-color:rgba(0,0,0,0);
  }
  .el-table .tablerow {
    background:#CCDDFF;
  }
  .el-table {
    background:#CCDDFF;
  }
  h3 {
    margin:0;
    padding:15px 0px;
    background:#DDEEFE;
  }
  thead {
    color:#2c3e50 !important;
  }
  .el-table th,tr {
    background:#CCDDFF !important;
  }
  th,td {
    border-right:1px solid #333333 !important;
    border-bottom:1px solid #333333 !important;
  }
  .el-table--border {
    border:1px solid #333333 !important;
  }
</style>
