<template>
  <div class="container">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="account">
        <Input type="text" v-model="formInline.NewsTitle" placeholder="视频名称">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">查找</Button>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="modal1 = true">新添视频</Button>
      </FormItem>
    </Form>
    <Table border :columns="columns7" :data="data6"></Table>
    <Page :total="total" :page-size="10" @on-change="changePage"></Page>

    <Modal
      v-model="modal1"
      title="新添视频"
      width="800"
      scrollable="true"
      ok-text="添加"
      @on-ok="ok('formItem2')"
    >
      <Form ref="formItem2" :model="formItem2" :rules="ruleItem2" :label-width="80">
        <FormItem label="视频编号" prop="VideoID">
          <Input v-model="formItem2.VideoID" placeholder=""></Input>
        </FormItem>
        <FormItem label="视频链接" prop="VideoLink">
          <Input v-model="formItem2.VideoLink" placeholder=""></Input>
        </FormItem>
        <FormItem label="视频名称" prop="VideoTitle">
          <Input v-model="formItem2.VideoTitle" placeholder=""></Input>
        </FormItem>
        <FormItem label="作者" prop="VideoAuthorName">
          <Input v-model="formItem2.VideoAuthorName" placeholder=""></Input>
        </FormItem>
        <FormItem label="视频类型" prop="VideoType">
          <Input v-model="formItem2.VideoType" placeholder=""></Input>
        </FormItem>
        <FormItem label="观看次数" prop="ViewCount">
          <Input v-model="formItem2.ViewCount" placeholder=""></Input>
        </FormItem>
        <FormItem label="收藏次数" prop="VideoLike">
          <Input v-model="formItem2.VideoLike" placeholder=""></Input>
        </FormItem>
        <FormItem label="评论次数" prop="VideoComments">
          <Input v-model="formItem2.VideoComments" placeholder=""></Input>
        </FormItem>
        <FormItem label="作者链接" prop="VideoAuthorImage">
          <Input v-model="formItem2.VideoAuthorImage" placeholder=""></Input>
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
        content:'',
        currIndex: 0,//最近被点击添加编号副本的图书编号
        formInline: {
          VideoTitle: ''
        },
        formItem2: {
          VideoID:'',
          VideoLink:'',
          VideoTitle: '',
          VideoAuthorName:'',
          VideoType: '',
          ViewCount: '',
          VideoLike: '',
          VideoComments: '',
          VideoAuthorImage: '',
        },
        ruleItem2: {
          VideoID: [{
            required: true,
            message: '请填写编号！',
            trigger: 'blur'
          }],
          VideoLink: [{
            required: true,
            message: '请填写视频链接！',
            trigger: 'blur'
          }],
          VideoTitle: [{
            required: true,
            message: '请填写视频名！',
            trigger: 'blur'
          }],
          VideoAuthorName: [{
            required: true,
            message: '请填视频作者！',
            trigger: 'blur'
          }],
          VideoType: [{
            required: true,
            message: '请填写视频类型！',
            trigger: 'blur'
          }],
          ViewCount: [{
            required: true,
            message: '请填写观看次数！'
          }],
          VideoLike: [{
            required: true,
            message: '请填写收藏次数！'
          }],
          VideoComments: [{
            required: true,
            message: '请填写评论数！',
            trigger: 'blur'
          }],
          VideoAuthorImage: [{
            required: true,
            message: '请填写作者图片链接！',
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
        columns7: [
          {
            title: '编号',
            key: 'videoID',
          },
          {
            title: '视频名',
            key: 'videoTitle'
          },
          {
            title: '视频类型',
            key: 'videoType'
          },
          // {
          //   title: '视频链接',
          //   key: 'videoLink'
          // },
          {
            title: '作者',
            key: 'videoAuthorName'
          },
          {
            title: '作者链接',
            key: 'videoAuthorImage'
          },
          {
            title: '观看次数',
            key: 'viewCount'
          },
          {
            title: '收藏次数',
            key: 'videoLike'
          },
          {
            title: '评论次数',
            key: 'videoComments'
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
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.modal2=true
                      this.currIndex = this.data6[params.index].aid
                    }
                  }
                }, '添加编号副本'),
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
          title: '视频信息',
          width: '1100',
          content: `视频编号：${this.data6[index].videoID}<br>视频名：${this.data6[index].videoTitle}<br>作者：${this.data6[index].videoAuthorName}<br>视频类型：${this.data6[index].videoType}<br>观看次数：${this.data6[index].viewCount}`
        })
      },
      remove (index) {
        this.data6.splice(index, 1);
      },
      request (currentPage){
        var that=this
        this.$http.post(that.GLOBAL.serverPath + '/superadmin/getAllVideo',
          {
            title: that.formInline.VideoTitle,
            currentPage: currentPage
          },
          {
            emulateJSON: true
          }
        ).then(function (res) {
          that.total=res.data.pageInfo.total
          that.data6=[]
          that.data7=res.data.video
          that.data7.forEach((e) => {
            let obj={}
            obj = e
            console.log(obj)
            var count=1
            var s=''
            obj.count = count
            obj.suba = s
            that.data6.push(obj)
          })
        })
      },
      changePage: function(page){
        this.request(page)
      },
      ok (name) {
        var that=this
        this.$refs[name].validate((valid) => {
          if (valid) {
            //没有编写的接口addvideo()
            console.log('videoid:',that.formItem2.VideoID)
            that.$http.post(that.GLOBAL.serverPath + '/superadmin/addvideo',
              {
                videoID: that.formItem2.VideoID,
                videoLink: that.formItem2.VideoLink,
                videoTitle: that.formItem2.VideoTitle,
                videoAuthorName: that.formItem2.VideoAuthorName,
                videoType: that.formItem2.VideoType,
                viewCount: that.formItem2.ViewCount,
                videoLike: that.formItem2.VideoLike,
                videoComments: that.formItem2.VideoComments,
                videoAuthorImage: that.formItem2.VideoAuthorImage,

              },
              {
                emulateJSON: true
              }
            ).then(function (res) {

              console.log('status:',res.data.status)

              if(res.data.status=='ok'){
                that.$Message.success('新增成功')
                that.$Notice.config({
                  top: 50,
                  duration: 3,
                  title: '通知',
                  desc: '新添视频成功!'
                })
                that.formInline.account=''
                that.formItem2.VideoID=''
                that.formItem2.VideoTitle=''
                that.formItem2.VideoLike=''
                that.formItem2.VideoAuthorImage=''
                that.formItem2.VideoAuthorName=''
                that.formItem2.VideoComments=''
                that.formItem2.ViewCount=''
                that.formItem2.VideoLink=''
                that.formItem2.VideoType=''
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

