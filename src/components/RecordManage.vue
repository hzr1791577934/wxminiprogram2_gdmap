<template>
  <div class="container">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="account">
        <Input type="text" v-model="formInline.id" placeholder="轨迹名称">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">查找</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="modal1 = true">新添轨迹点</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="modal3 = true">编辑轨迹点</Button>
      </FormItem>
    </Form>
    <Table border :columns="columns7" :data="data6"></Table>
    <Page :total="total" :page-size="10" @on-change="changePage"></Page>

    <Modal
      v-model="modal1"
      title="新添轨迹点"
      width="800"
      scrollable="true"
      ok-text="添加"
      @on-ok="ok('formItem2')"
    >
      <Form ref="formItem2" :model="formItem2" :rules="ruleItem2" :label-width="80">
        <FormItem label="经度" prop="longitude">
          <Input v-model="formItem2.longitude" placeholder=""></Input>
        </FormItem>
        <FormItem label="纬度" prop="latitude">
          <Input v-model="formItem2.latitude" placeholder=""></Input>
        </FormItem>
        <FormItem label="地址名" prop="place">
          <Input v-model="formItem2.place" placeholder=""></Input>
        </FormItem>
        <FormItem label="具体地址" prop="descr">
          <Input v-model="formItem2.descr" placeholder=""></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal
      v-model="modal3"
      title="编辑轨迹"
      width="800"
      scrollable="true"
      ok-text="完成"
      @on-ok="updatenews('formItem2')"
    >
      <Form ref="formItem4" :model="formItem4" :rules="ruleItem4" :label-width="80">
        <FormItem label="轨迹编号" prop="id">
          <Input v-model="formItem4.id" placeholder=""></Input>
        </FormItem>
        <FormItem label="地址名" prop="place">
          <Input v-model="formItem4.place" placeholder=""></Input>
        </FormItem>
        <FormItem label="具体地址" prop="descr">
          <Input v-model="formItem4.descr" placeholder=""></Input>
        </FormItem>
        <!--        <FormItem label="阅读次数" prop="ReadCount">-->
        <!--          <Input v-model="formItem4.ReadCount" placeholder=""></Input>-->
        <!--        </FormItem>-->
      </Form>
    </Modal>

    <!--添加书籍副本-->
    <Modal
      v-model="modal2"
      title="新添书籍副本"
      ok-text="添加副本"
      @on-ok="ok2('formItem3')"
    >
      <Form ref="formItem3" :model="formItem3" :rules="ruleItem3" :label-width="80">
        <FormItem label="编号" prop="num">
          <Input v-model="formItem3.num" placeholder=""></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script type="es6">
  export default {
    name: 'UserManage',
    // inject: ['reload'],
    data () {
      return {
        total: 0,
        condi: '',
        modal1: false,
        modal2: false,
        modal3: false,
        content:'',
        currIndex: 0,//最近被点击添加编号副本的图书编号
        formInline: {
          id: ''
        },
        formItem2: {
          // id:'',
          // userAccount:'',
          // ttime: '',
          longitude:'',
          latitude: '',
          place: '',
          descr: '',
          // tttime:''
        },
        ruleItem2: {
          // id: [{
          //   required: true,
          //   message: '请填写编号！',
          //   trigger: 'blur'
          // }],
          // userAccount: [{
          //   required: true,
          //   message: '请填写用户名！',
          //   trigger: 'blur'
          // }],
          // ttime: [{
          //   required: true,
          //   message: '请填写时间（年月日）！',
          //   trigger: 'blur'
          // }],
          longitude: [{
            required: true,
            message: '请填写地址经度！',
            trigger: 'blur'
          }],
          latitude: [{
            required: true,
            message: '请填写地址纬度！'
          }],
          place: [{
            required: true,
            message: '请填写地址名！',
            trigger: 'blur'
          }],
          descr: [{
            required: true,
            message: '请填写具体地址！'
          }],
          // tttime: [{
          //   required: true,
          //   message: '请填写时间（）！'
          // }]
          //
        },
        formItem3: {
          num: ''
        },
        ruleItem3: {
          num: [{
            required: true,
            message: '请填写书籍副本编号！',
            trigger: 'blur'
          }]
        },
        formItem4: {
          id:'',
          place: '',
          descr: '',
          // ReadCount: '',
        },
        ruleItem4: {
          id: [{
            required: true,
            message: '请填写轨迹编号！',
            trigger: 'blur'
          }],
          place: [{
            // required: true,
            message: '请填写地址名！',
            trigger: 'blur'
          }],
          descr: [{
            // required: true,
            message: '请填写具体地址！',
            trigger: 'blur'
          }],
          // ReadCount: [{
          //   // required: true,
          //   message: '请填写阅读次数！'
          // }],
        },
        columns7: [
          {
            title: '编号',
            key: 'id',
          },
          {
            title: '用户账号',
            key: 'userAccount'
          },
          {
            title: '经度',
            key: 'longitude'
          },
          {
            title: '纬度',
            key: 'latitude'
          },
          {
            title: '地址名',
            key: 'place'
          },
          {
            title: '具体地址',
            key: 'descr'
          },
          {
            title: '年月日',
            key: 'ttime'
          },
          {
            title: '时分秒',
            key: 'tttime'
          },
          {
            title: '操作',
            key: 'action',
            width: 300,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data6: [],
        data7: []
      }
    },
    mounted(){
      this.request(1);
    },
    methods: {
      handleSubmit(account) {
        this.request(1)
      },
      show (index) {
        // this.$router.push({ path:'/map.html'  })
        this.$Modal.info({
          title: '轨迹信息',
          width: '600',
          content: `轨迹编号：${this.data6[index].id}<br>用户账号：${this.data6[index].userAccount}<br>经度：${this.data6[index].longitude}<br>
                    纬度：${this.data6[index].latitude}<br>地址名：${this.data6[index].place}<br>具体地址：${this.data6[index].descr}<br>
                    年月日：${this.data6[index].ttime}<br>时分秒：${this.data6[index].tttime}`
        })
      },
      updatenews (index) {
        var that=this
        that.$http.post(that.GLOBAL.serverPath + '/superadmin/updatefootprint',
          {
            id: that.formItem4.id,
            place: that.formItem4.place,
            descr: that.formItem4.descr,
            // readCount: that.formItem4.ReadCount
          },
          {
            emulateJSON: true
          }
        ).then(function (res) {
          console.log(res.data.status)
          if(res.data.status=='ok'){
            that.$Notice.config({
              top: 50,
              duration: 3,
              title: '通知',
              desc: '编辑轨迹成功!'
            })
            that.formInline.id=''
            that.formItem4.place=''
            that.formItem4.descr=''
            // that.formItem4.NewsAuthorName=''
            // that.formItem4.ReadCount=''
            that.request(1)
          }

        }).catch((e) => {
          that.$Message.fail('网络有误！')
        })
      },
      remove (index) {
        var that=this
        that.$http.post(that.GLOBAL.serverPath + '/superadmin/deletefootprint',
          {
            id: this.data6[index].id,
          },
          {
            emulateJSON: true
          }
        ).then(function (res) {
          console.log(res.data.status)
          if(res.data.status=='ok'){
            that.$Notice.config({
              top: 50,
              duration: 3,
              title: '通知',
              desc: '更新轨迹成功!'
            })

            that.request(1)
          }

        }).catch((e) => {
          that.$Message.fail('网络有误！')
        })
      },
      request (currentPage){
        var that=this
        this.$http.post(that.GLOBAL.serverPath + '/superadmin/webgetallfootprint',
          {
            id: that.formInline.id,
            currentPage: currentPage
          },
          {
            emulateJSON: true
          }
        ).then(function (res) {
          that.total=res.data.pageInfo.total
          that.data6=[]
          that.data7=res.data.news
          that.data7.forEach((e) => {
            let obj={}
            obj = e
            var count=1
            var s=''
            obj.count = count
            obj.suba = s
            that.data6.push(obj)
            // console.log('data6',that.data6)
          })
        })
        // this.reload()
      },
      changePage: function(page){
        this.request(page)
      },
      ok (name) {
        var that=this
        this.$refs[name].validate((valid) => {
          if (valid) {
            that.$http.post(that.GLOBAL.serverPath + '/superadmin/addfootprint',
              {
                longitude: that.formItem2.longitude,
                latitude: that.formItem2.latitude,
                place: that.formItem2.place,
                descr: that.formItem2.descr
              },
              {
                emulateJSON: true
              }
            ).then(function (res) {
              console.log(res.data.status)
              if(res.data.status=='ok'){
                that.$Notice.config({
                  top: 50,
                  duration: 3,
                  title: '通知',
                  desc: '新添新闻成功!'
                })
                that.formInline.longitude=''
                that.formItem2.latitude=''
                that.formItem2.place=''
                that.formItem2.descr=''
                that.request(1)
              }

            }).catch((e) => {
              that.$Message.fail('网络有误！')
            })
          }
        })
      },
      ok2 (name) {
        var that=this
        this.$refs[name].validate((valid) => {
          if (valid) {
            that.$http.post(that.GLOBAL.serverPath + '/excise/addSubAlbum',
              {
                aid: that.currIndex,
                number: that.formItem3.num
              },
              {
                emulateJSON: true
              }
            ).then(function (res) {
              console.log(res.data.status)
              if(res.data.status=='ok'){
                that.$Message.success('新增成功')
                that.formItem3.num=''
                that.request(1)
              }else{
                that.$Message.error('新增失败！查看是否存在相同编号')
              }

            }).catch((e) => {
              that.$Message.fail('网络有误！')
            })
          }
        })
      },
      onEditorChange({editor,html,text}){
        // 富文本编辑器，文本改变时，设置字段值
        console.log(editor,html,text)
        this.content = html
      }
    }
  }
</script>

