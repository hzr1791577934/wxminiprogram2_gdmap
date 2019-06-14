<template>
  <div class="container">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="account">
        <Input type="text" v-model="formInline.id" placeholder="收藏名称">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">查找</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="modal1 = true">新添收藏</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="modal3 = true">编辑收藏</Button>
      </FormItem>
    </Form>
    <Table border :columns="columns7" :data="data6"></Table>
    <Page :total="total" :page-size="10" @on-change="changePage"></Page>

    <Modal
      v-model="modal1"
      title="新添收藏"
      width="800"
      scrollable="true"
      ok-text="添加"
      @on-ok="ok('formItem2')"
    >
      <Form ref="formItem2" :model="formItem2" :rules="ruleItem2" :label-width="80">
        <FormItem label="经度" prop="clan">
          <Input v-model="formItem2.clan" placeholder=""></Input>
        </FormItem>
        <FormItem label="纬度" prop="clat">
          <Input v-model="formItem2.clat" placeholder=""></Input>
        </FormItem>
        <FormItem label="地址名" prop="cplace">
          <Input v-model="formItem2.cplace" placeholder=""></Input>
        </FormItem>
        <FormItem label="具体地址" prop="cdescr">
          <Input v-model="formItem2.cdescr" placeholder=""></Input>
        </FormItem>

      </Form>
    </Modal>

    <Modal
      v-model="modal3"
      title="编辑收藏"
      width="800"
      scrollable="true"
      ok-text="完成"
      @on-ok="updatenews('formItem2')"
    >
      <Form ref="formItem4" :model="formItem4" :rules="ruleItem4" :label-width="80">
        <FormItem label="轨迹编号" prop="id">
          <Input v-model="formItem4.id" placeholder=""></Input>
        </FormItem>
        <FormItem label="地址名" prop="cplace">
          <Input v-model="formItem4.cplace" placeholder=""></Input>
        </FormItem>
        <FormItem label="具体地址" prop="cdescr">
          <Input v-model="formItem4.cdescr" placeholder=""></Input>
        </FormItem>
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
          clan:'',
          clat: '',
          place: '',
          descr: '',
        },
        ruleItem2: {
          clan: [{
            required: true,
            message: '请填写地址经度！',
            trigger: 'blur'
          }],
          clat: [{
            required: true,
            message: '请填写地址纬度！'
          }],
          cplace: [{
            required: true,
            message: '请填写地址名！',
            trigger: 'blur'
          }],
          cdescr: [{
            required: true,
            message: '请填写具体地址！'
          }],
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
          cplace: '',
          cdescr: '',
        },
        ruleItem4: {
          id: [{
            required: true,
            message: '请填写轨迹编号！',
            trigger: 'blur'
          }],
          cplace: [{
            // required: true,
            message: '请填写地址名！',
            trigger: 'blur'
          }],
          cdescr: [{
            // required: true,
            message: '请填写具体地址！',
            trigger: 'blur'
          }],
        },
        columns7: [
          {
            title: '编号',
            key: 'id',
          },
          {
            title: '经度',
            key: 'clan'
          },
          {
            title: '纬度',
            key: 'clat'
          },
          {
            title: '地址名',
            key: 'cplace'
          },
          {
            title: '具体地址',
            key: 'cdescr'
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
        this.$Modal.info({
          title: '收藏信息',
          width: '600',
          content: `收藏编号：${this.data6[index].id}<br>经度：${this.data6[index].clan}<br>
                    纬度：${this.data6[index].clat}<br>地址名：${this.data6[index].cplace}<br>具体地址：${this.data6[index].cdescr}}`
        })
      },
      updatenews (index) {
        var that=this
        that.$http.post(that.GLOBAL.serverPath + '/superadmin/updatecollection',
          {
            id: that.formItem4.id,
            cplace: that.formItem4.cplace,
            cdescr: that.formItem4.cdescr,
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
            that.formItem4.cplace=''
            that.formItem4.cdescr=''
            that.request(1)
          }

        }).catch((e) => {
          that.$Message.fail('网络有误！')
        })
      },
      remove (index) {
        var that=this
            that.$http.post(that.GLOBAL.serverPath + '/superadmin/deletecollection',
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
        this.$http.post(that.GLOBAL.serverPath + '/superadmin/webgetallcollection',
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
            that.$http.post(that.GLOBAL.serverPath + '/superadmin/addcollection',
              {
                clan: that.formItem2.clan,
                clat: that.formItem2.clat,
                cplace: that.formItem2.cplace,
                cdescr: that.formItem2.cdescr
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
                that.formInline.clan=''
                that.formItem2.clat=''
                that.formItem2.cplace=''
                that.formItem2.cdescr=''
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

