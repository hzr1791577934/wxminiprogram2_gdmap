<template>
  <div class="container">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="account">
        <Input type="text" v-model="formInline.NewsTitle" placeholder="新闻名称">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">查找</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="modal1 = true">新添新闻</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="modal3 = true">编辑新闻</Button>
      </FormItem>
    </Form>
    <Table border :columns="columns7" :data="data6"></Table>
    <Page :total="total" :page-size="10" @on-change="changePage"></Page>

    <Modal
      v-model="modal1"
      title="新添新闻"
      width="800"
      scrollable="true"
      ok-text="添加"
      @on-ok="ok('formItem2')"
    >
      <Form ref="formItem2" :model="formItem2" :rules="ruleItem2" :label-width="80">
        <FormItem label="新闻图片" prop="NewsImage">
          <Input v-model="formItem2.NewsImage" placeholder=""></Input>
        </FormItem>
        <FormItem label="新闻编号" prop="NewsID">
          <Input v-model="formItem2.NewsID" placeholder=""></Input>
        </FormItem>
        <FormItem label="新闻名称" prop="NewsTitle">
          <Input v-model="formItem2.NewsTitle" placeholder=""></Input>
        </FormItem>
        <FormItem label="新闻作者" prop="NewsAuthorName">
          <Input v-model="formItem2.NewsAuthorName" placeholder=""></Input>
        </FormItem>
        <FormItem label="新闻作者图片链接" prop="NewsAuthorImage">
          <Input v-model="formItem2.NewsAuthorImage" placeholder=""></Input>
        </FormItem>
        <FormItem label="阅读次数" prop="ReadCount">
          <Input v-model="formItem2.ReadCount" placeholder=""></Input>
        </FormItem>
        <FormItem label="新闻内容" prop="NewsContent">
          <quill-editor v-model="formItem2.NewsContent" ref="VueQuillEditor"
                        :content="content"
                        @change="onEditorChange($event)">
          </quill-editor>
        </FormItem>
      </Form>
    </Modal>

    <Modal
      v-model="modal3"
      title="编辑新闻"
      width="800"
      scrollable="true"
      ok-text="完成"
      @on-ok="updatenews('formItem2')"
    >
      <Form ref="formItem4" :model="formItem4" :rules="ruleItem4" :label-width="80">
        <FormItem label="新闻编号" prop="NewsID">
          <Input v-model="formItem4.NewsID" placeholder=""></Input>
        </FormItem>
        <FormItem label="新闻名称" prop="NewsTitle">
          <Input v-model="formItem4.NewsTitle" placeholder=""></Input>
        </FormItem>
        <FormItem label="新闻作者" prop="NewsAuthorName">
          <Input v-model="formItem4.NewsAuthorName" placeholder=""></Input>
        </FormItem>
        <FormItem label="阅读次数" prop="ReadCount">
          <Input v-model="formItem4.ReadCount" placeholder=""></Input>
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
          NewsTitle: ''
        },
        formItem2: {
          NewsImage:'',
          NewsID:'',
          NewsTitle: '',
          NewsContent:'',
          ReadCount: '',
          NewsAuthorName: '',
          NewsAuthorImage: '',
        },
        ruleItem2: {
          NewsID: [{
            required: true,
            message: '请填写编号！',
            trigger: 'blur'
          }],
          NewsTitle: [{
            required: true,
            message: '请填写新闻名！',
            trigger: 'blur'
          }],
          NewsAuthorName: [{
            required: true,
            message: '请填写新闻作者！',
            trigger: 'blur'
          }],
          NewsImage: [{
            required: true,
            message: '请填写图片链接！',
            trigger: 'blur'
          }],
          NewsAuthorImage: [{
            required: true,
            message: '请填写作者图片链接！'
          }],
          ReadCount: [{
            required: true,
            message: '请填写阅读次数！'
          }],
          NewsContent: [{
            required: true,
            message: '请填新闻内容！',
            trigger: 'blur'
          }]
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
          NewsID:'',
          NewsTitle: '',
          NewsAuthorName: '',
          ReadCount: '',
        },
        ruleItem4: {
          NewsID: [{
            required: true,
            message: '请填写编号！',
            trigger: 'blur'
          }],
          NewsTitle: [{
            // required: true,
            message: '请填写新闻名！',
            trigger: 'blur'
          }],
          NewsAuthorName: [{
            // required: true,
            message: '请填写新闻作者！',
            trigger: 'blur'
          }],
          ReadCount: [{
            // required: true,
            message: '请填写阅读次数！'
          }],
        },
        columns7: [
          {
            title: '编号',
            key: 'newsID',
          },
          {
            title: '新闻名',
            key: 'newsTitle'
          },
          {
            title: '新闻图片',
            key: 'newsImage'
          },
          {
            title: '作者',
            key: 'newsAuthorName'
          },
          {
            title: '作者链接',
            key: 'newsAuthorImage'
          },
          {
            title: '阅读次数',
            key: 'readCount'
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
          title: '新闻信息',
          width: '1100',
          content: `新闻编号：${this.data6[index].newsID}<br>新闻名：${this.data6[index].newsTitle}<br>新闻作者：${this.data6[index].newsAuthorName}<br>阅读次数：${this.data6[index].readCount}<br>新闻图片：${this.data6[index].newsImage}<br>新闻内容：${this.data6[index].newsContent}`
        })
      },
      updatenews (index) {
        var that=this
        that.$http.post(that.GLOBAL.serverPath + '/superadmin/updatenews',
          {
            newsID: that.formItem4.NewsID,
            newsTitle: that.formItem4.NewsTitle,
            newsAuthorName: that.formItem4.NewsAuthorName,
            readCount: that.formItem4.ReadCount
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
              desc: '编辑新闻成功!'
            })
            that.formInline.account=''
            that.formItem4.NewsID=''
            that.formItem4.NewsTitle=''
            that.formItem4.NewsAuthorName=''
            that.formItem4.ReadCount=''
            that.request(1)
          }

        }).catch((e) => {
          that.$Message.fail('网络有误！')
        })
      },
      remove (index) {
        var that=this
            that.$http.post(that.GLOBAL.serverPath + '/superadmin/deletenews',
              {
                newsID: this.data6[index].newsID,
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
                  desc: '更新新闻成功!'
                })

                that.request(1)
              }

            }).catch((e) => {
              that.$Message.fail('网络有误！')
            })
          },
      request (currentPage){
        var that=this
        this.$http.post(that.GLOBAL.serverPath + '/superadmin/getAllNews',
          {
            title: that.formInline.NewsTitle,
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
            that.$http.post(that.GLOBAL.serverPath + '/superadmin/addnews',
              {
                newsID: that.formItem2.NewsID,
                newsTitle: that.formItem2.NewsTitle,
                newsImage: that.formItem2.NewsImage,
                newsContent: that.formItem2.NewsContent,
                readCount: that.formItem2.ReadCount,
                newsAuthorName: that.formItem2.NewsAuthorName,
                newsAuthorImage: that.formItem2.NewsAuthorImage
              },
              {
                emulateJSON: true
              }
            ).then(function (res) {
              console.log(res.data.status)
              if(res.data.status=='ok'){
                //that.$Message.success('新增成功')
                that.$Notice.config({
                  top: 50,
                  duration: 3,
                  title: '通知',
                  desc: '新添新闻成功!'
                })
                that.formInline.account=''
                that.formItem2.NewsID=''
                that.formItem2.NewsTitle=''
                that.formItem2.NewsContent=''
                that.formItem2.NewsImage=''
                that.formItem2.NewsAuthorImage=''
                that.formItem2.NewsAuthorName=''
                that.formItem2.ReadCount=''
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

