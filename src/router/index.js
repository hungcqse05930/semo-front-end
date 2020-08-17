import Vue from 'vue'
import VueRouter from 'vue-router'
import NameProduct from '../views/NameProduct.vue'
//
// import UserInformationFile from '../views/UserInformationFile.vue'
//
import UserInformationResetPassword from '../views/UserInformationResetPassword.vue'
import UserInformationAddress from '../views/UserInformationAddress.vue'
import UserInformationAccuracy from '../views/UserInformationAccuracy.vue'
import CreateNewProduct from '../views/CreateNewProduct'
import CreateNewProductForTree from '../views/CreateNewProductForTree'
import MediationDashboardProduct from '../views/MediationDashboardProduct.vue'
import CencorProductMediation from '../views/CencorProductMediation.vue'
import MediationDashboardNameProduct from '../views/MediationDashboardNameProduct.vue'
import PlaceBid from '../views/PlaceBid.vue'
import MediationDashboardHome from '../views/MediationDashboardHome.vue'
import CreateNewProductAddProduct from '../views/CreateNewProductAddProduct.vue'
import CreateNewProductSuccess from '../views/CreateNewProductSuccess.vue'
import CreateNewProductNotification from '../views/CreateNewProductNotification.vue'
import Affair from '../views/Affair.vue'
import AffairEditContract from '../views/AffairEditContract.vue'
import UserBidAuction from '../views/UserBidAuction.vue'
import UserWallet from '../views/UserWallet.vue'
import UserBidContract from '../views/UserBidContract.vue'
import UserBidBuy from '../views/UserBidBuy.vue'
import AdminWallet from '../views/AdminWallet.vue'
import AdminDashboardNameProduct from '../views/AdminDashboardNameProduct.vue'
import AdminDashboardProduct from '../views/AdminDashboardProduct.vue'
import AdminDashboardDeal from '../views/AdminDashboardDeal.vue'
import UserInformationTESTFILE from '../views/UserInformationTESTFILE.vue'
import UserWalletHistory from '../views/UserWalletHitory.vue'
import AdminDashboardContract from '../views/AdminDashboardContract.vue'
import AdminDashboardBid from '../views/AdminDashboardBid.vue'
import AdminDashboardCheckBid from '../views/AdminDashboardCheckBid.vue'
import AdminDashboardUser from '../views/AdminDashboardUser.vue'

// import { component } from 'vue/types/umd';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Trang chủ',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/auction/latest',
    name: 'Mới nhất',
    component: () => import('../views/AuctionLatest.vue')
  },
  {
    path: '/search/:keyword',
    name: 'Tìm kiếm',
    props: true,
    component: () => import('../views/Search.vue')
  },
  {
    path: '/auction/:id',
    name: 'Đấu giá',
    props: true,
    component: () => import('../views/Auction.vue')
  },
  {
    path: '/user/info/:id',
    name: 'Tài khoản của bạn',
    props: true,
    component: () => import('../views/UserInfo.vue')
  },
  {
    path: '/user/info',
    name: 'Tài khoản của bạn',
    component: () => import('../views/UserInfo.vue')
  },
  {
    path: '/user/address/:id',
    name: 'Địa chỉ của bạn',
    props: true,
    component: () => import('../views/UserInfoAddress.vue')
  },
  {
    path: '/user/product',
    name: 'Sản phẩm bạn đăng'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Đăng ký',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/register/otp',
    name: 'Nhập OTP',
    component: () => import('../views/RegisterOTP.vue')
  },
  {
    path: '/register/pwd',
    name: 'Tạo mật khẩu',
    component: () => import('../views/RegisterPassword')
  },
  {
    path: '/register/info',
    name: 'Hoàn thành thông tin',
    component: () => import('../views/RegisterInfo.vue')
  },
  {
    path: '/register/identity',
    name: 'Xác minh công dân',
    component: () => import('../views/RegisterIdentity.vue')
  },
  {
    path: '/register/avatar',
    name: 'Chọn ảnh đại diện',
    component: () => import('../views/RegisterAvatar')
  },
  {
    path: '/register/completed',
    name: 'Đăng ký thành công',
    component: () => import('../views/RegisterCompleted')
  },
  {
    path: '/productstep1',
    name: 'NameProduct',
    component: NameProduct
  },
  //User information file
  // {
  //   path: '/userinformationfile',
  //   name: 'UserInformationFile',
  //   component: UserInformationFile
  // },
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
    component: CencorProductMediation,
    props: true
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
  {
    path: '/createnewproductaddproduct',
    name: 'CreateNewProductAddProduct',
    component: CreateNewProductAddProduct
  },
  {
    path: '/createnewproductsuccess',
    name: 'CreateNewProductSuccess',
    component: CreateNewProductSuccess
  },
  {
    path: '/createnewproductnotification',
    name: 'CreateNewProductNotification',
    component: CreateNewProductNotification
  },
  {
    path: '/affair',
    name: 'Affair',
    component: Affair
  },
  {
    path: '/affaireditcontract',
    name: 'AffairEditContract',
    component: AffairEditContract
  },
  {
    path: '/userbidauction',
    name: 'UserBidAuction',
    component: UserBidAuction
  },
  {
    path: '/userwallet',
    name: 'UserWallet',
    component: UserWallet
  },
  {
    path: '/userbidcontract',
    name: 'UserBidContract',
    component: UserBidContract
  },
  {
    path: '/userbidbuy',
    name: 'UserBidBuy',
    component: UserBidBuy
  },
  {
    path: '/userinformationtest',
    name: 'UserInformationTESTFILE',
    component: UserInformationTESTFILE
  },
  {
    path: '/adminwallet',
    name: 'AdminWallet',
    component: AdminWallet
  },
  {
    path: '/admindashboardnameproduct',
    name: 'AdminDashboardNameProduct',
    component: AdminDashboardNameProduct
  },
  {
    path: '/admindashboardproduct',
    name: 'AdminDashboardProduct',
    component: AdminDashboardProduct
  },
  {
    path: '/admindashboarddeal',
    name: 'AdminDashboardDeal',
    component: AdminDashboardDeal
  },
  {
    path: '/userwallethistory',
    name: 'UserWalletHistory',
    component: UserWalletHistory
  },
  {
    path: '/admindashboardcontract',
    name: 'AdminDashboardContract',
    component: AdminDashboardContract
  },
  {
    path: '/admindashboardbid',
    name: 'AdminDashboardBid',
    component: AdminDashboardBid
  },
  {
    path: '/admindashboardcheckbid',
    name: 'AdminDashboardCheckBid',
    component: AdminDashboardCheckBid
  },
  {
    path: '/admindashboarduser',
    name: 'AdminDashboardUser',
    component: AdminDashboardUser
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      const position = {}

      if (to.hash) {
        position.selector = to.hash

        if (document.querySelector(to.hash)) {
          return position
        }
        return false
      }
    }
  },
  routes
})

export default router
