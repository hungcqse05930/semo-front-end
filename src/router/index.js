import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import RegisterPhoneNumber from '../views/RegisterPhoneNumber.vue'
import RegisterOTP from '../views/RegisterOTP.vue'
import CreatePassword from '../views/CreatePassword.vue'
import ConfirmCitizen from '../views/ConfirmCitizen.vue'
import ConfirmInformation from '../views/ConfirmInformation.vue'
import SelectPicture from '../views/SelectPicture.vue'
import SuccessRegister from '../views/SuccessRegister.vue'
import NameProduct from '../views/NameProduct.vue'
import UserInformationFile from '../views/UserInformationFile.vue'
import UserInformationResetPassword from '../views/UserInformationResetPassword.vue'
import UserInformationAddress from '../views/UserInformationAddress.vue'
import UserInformationAccuracy from '../views/UserInformationAccuracy.vue'
import Search from '../views/SearchPage.vue'
import CreateNewProduct from '../views/CreateNewProduct'
import CreateNewProductForTree from '../views/CreateNewProductForTree'
import MediationDashboardProduct from '../views/MediationDashboardProduct.vue'
import CencorProductMediation from '../views/CencorProductMediation.vue'
import MediationDashboardNameProduct from '../views/MediationDashboardNameProduct.vue'
import PlaceBid from '../views/PlaceBid.vue'
import MediationDashboardHome from '../views/MediationDashboardHome.vue'
// import { component } from 'vue/types/umd';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'RegisterPhoneNumber',
    component: RegisterPhoneNumber
  },
  {
    path: '/registerstep2',
    name: 'RegisterOTP',
    component: RegisterOTP
  },
  {
    path: '/registerstep3',
    name: 'CreatePassword',
    component: CreatePassword
  },
  {
    path: '/registerstep4',
    name: 'ConfirmInformation',
    component: ConfirmInformation
  },
  {
    path: '/registerstep5',
    name: 'ConfirmCitizen',
    component: ConfirmCitizen

  },
  {
    path: '/registerstep6',
    name: 'SelectPicture',
    component: SelectPicture

  },
  {
    path: '/registerstep7',
    name: 'SuccessRegister',
    component: SuccessRegister
  },
  {
    path: '/productstep1',
    name: 'NameProduct',
    component: NameProduct
  },
  {
    path: '/userinformationfile',
    name: 'UserInformationFile',
    component: UserInformationFile
  },
  {
    path: '/resetpassword',
    name: 'UserInformationResetPassword',
    component: UserInformationResetPassword
  },
  {
    path: '/userinformationaddress',
    name: 'UserInformationAddress',
    component: UserInformationAddress
  },
  {
    path: '/createnewproduct',
    name: 'CreateNewProduct',
    component: CreateNewProduct
  },
  {
    path: '/createnewproductfortree',
    name: 'CreateNewProductForTree',
    component: CreateNewProductForTree
  },
  {
    path: '/userinformationaccuracy',
    name: 'UserInformationAccuracy',
    component: UserInformationAccuracy
  },
  {
    path: '/mediationdashboardproduct',
    name: 'MediationDashboardProduct',
    component: MediationDashboardProduct
  },
  {
    path: '/cencorproductmediation',
    name: 'CencorProductMediation',
    component: CencorProductMediation
  },
  {
    path: '/mediationdashboardnameproduct',
    name: 'MediationDashboardNameProduct',
    component: MediationDashboardNameProduct
  },
  {
    path: '/placebid',
    name: 'PlaceBid',
    component: PlaceBid
  },
{
    path: '/mediationdashboardhome',
    name: 'MediationDashboardHome',
    component: MediationDashboardHome
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
