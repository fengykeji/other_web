import Vue from 'vue'
import Router from 'vue-router'
import projectView from '../views/projectView'
import EstateDetail from '../components/EstateDetail'
import PropertyInformation from '../components/PropertyInformation.vue'
import NewMessage from '../components/NewMessage.vue'
import MessageDetail from '../components/MessageDetail.vue'
import BuildingPic from '../components/BuildingPic.vue'
import UnitDetail from '../components/UnitDetail.vue'
import MockGallery from '../components/MockGallery.vue'
Vue.use(Router)



function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let projectId = getParameterByName('project_id')
// console.log(projectId)


const router =  new Router({
  routes: [
    // {
    //   path: '/projectView/:id',
    // 	name: 'projectView',
    //   component: projectView
    // },
    {
      path: '/projectView',
    	name: 'projectView',
      component: projectView
    },
    {
      path:'/estatedetail',
      name:'estatedetail',
      component:EstateDetail
    },{
      path:'/propertyInformation',
      name:'propertyInformation',
      component:PropertyInformation
    },{
      path:'/newMessage',
      name:'newMessage',
      component:NewMessage
    },{
      path:'/messageDetail/:id',
      name:'messageDetail',
      component:MessageDetail
    },{
      path:'/buildingPic/:projectId/:pic',
      name:'buildingPic',
      component:BuildingPic
    },{
      path:'/unitDetail',
      name:'unitDetail',
      component:UnitDetail
    },{
      path:'/gallery',
      name:'gallery',
      component:MockGallery
    }
  ],
  scrollBehavior(to,from,savedPosition){
    if(savedPosition){
      return savedPosition
    }else{
      return {x:0,y:0}
    }
  }
})

router.push({name:'projectView',query:{id:projectId}})
export default router