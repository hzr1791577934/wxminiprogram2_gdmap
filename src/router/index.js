import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import iView from 'iview'
import 'iView/dist/styles/iview.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import HelloWorld from '@/components/HelloWorld'
// import Index from '@/components/Index'
// import Reader from '@/components/Reader'
import Manager from '@/components/Manager'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(iView)
// Vue.use(VueQuillEditor,{default global options})
Vue.use(VueQuillEditor)

export default new Router({
  routes: [

    // {
    //   path: '/index',
    //   component: Index
    // },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'manager',
      component: Manager
    }
    // {
    //   path: 'HelloWorld',
    //   component: HelloWorld
    // },
    // {
    //   path: '/Index',
    //   component: Index
    // },
    // {
    //   path: '/Reader',
    //   component: Reader
    // }
  ]
})
