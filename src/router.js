import {createRouter, createWebHistory} from 'vue-router'
import Home from './pages/Home.vue';
import DetailProject from './pages/DetailProject.vue';
import Profile from './pages/Profile.vue';
import EditProfile from './pages/EditProfile.vue';
import CreateProject from './pages/CreateProject.vue';
import EditProject from './pages/EditProject.vue';
import Login from './pages/auth/Login.vue';
import Role from './pages/auth/register/Role.vue';
import Account from './pages/auth/register/Account.vue';
import Done from './pages/auth/register/Done.vue';
import ForgotPassword from './pages/auth/ForgotPassword.vue';
import ChangePassword from './pages/auth/ChangePassword.vue';
import CheckOTP from './pages/auth/CheckOTP.vue';
import InitData from './pages/InitData.vue';

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    props: route => ({category: route.query.category, search: route.query.search}),
  },
  {
    path: '/project/show/:id',
    component: DetailProject,
    name: 'DetailProject',
    props: true,
  },
  {
    path: '/project/create',
    component: CreateProject,
    name: 'CreateProject',
    props: true,
  },
  {
    path: '/project/edit/:id',
    component: EditProject,
    name: 'EditProject',
    props: true,
  },
  {
    path: '/auth/login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/auth/register/role',
    component: Role,
    name: 'Role'
  },
  {
    path: '/auth/register/done',
    component: Done,
    name: 'Done'
  },
  {
    path: '/auth/register/account',
    component: Account,
    name: 'Account'
  },
  {
    path: '/auth/forgot-password',
    component: ForgotPassword,
    name: 'ForgotPassword'
  },
  {
    path: '/auth/check-otp',
    component: CheckOTP,
    name: 'CheckOTP',
    props: true,
  },
  {
    path: '/auth/change-password',
    component: ChangePassword,
    name: 'ChangePassword',
    props: true,
  },
  {
    path: '/user/:id',
    component: Profile,
    name: 'Profile',
    props: true,
  },
  {
    path: '/user/edit',
    component: EditProfile,
    name: 'EditProfile',
    props: true,
  },
  {
    path: '/init-data',
    component: InitData,
    name: 'InitData'
  }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})