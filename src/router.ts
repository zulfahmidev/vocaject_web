import * as VueRouter from 'vue-router'
import store from './store.ts';

// Pages
import Base from './pages/Base.vue';
import Auth from './pages/Auth.vue';

// Contents
import Profile from './components/contents/Profile.vue';
import Settings from './components/contents/Settings.vue';
import Projects from './components/contents/Projects.vue';
import ProjectDiscuss from './components/contents/ProjectDiscuss.vue';
import DetailProgressProject from './components/contents/DetailProgressProject.vue';
import CreateProject from './components/contents/CreateProject.vue';

// Auth Contents
import Login from './pages/auth/Login.vue';
import CheckOTP from './pages/auth/CheckOTP.vue';
import ForgotPassword from './pages/auth/ForgotPassword.vue';
import ChangePassword from './pages/auth/ChangePassword.vue';
import Account from './pages/auth/register/Account.vue';
import Confirmed from './pages/auth/register/Confirmed.vue';
import Done from './pages/auth/register/Done.vue';
import Role from './pages/auth/register/Role.vue';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: '/base',
      component: Base,
      children: [
        {
          path: '/base',
          name: 'profile',
          components: {
            content: Profile
          }
        },
        {
          path: '/base/project-discuss',
          name: 'project-discuss',
          components: {
            content: ProjectDiscuss
          }
        },
        {
          path: '/base/project/create',
          name: 'create-project',
          components: {
            content: CreateProject
          }
        },
        {
          path: '/base/project',
          name: 'projects',
          components: {
            content: Projects
          }
        },
        {
          path: '/base/setting',
          name: 'settings',
          components: {
            content: Settings
          }
        },
        {
          path: '/base/project/:id/detail',
          name: 'progress-project',
          props: true,
          components: {
            content: DetailProgressProject
          }
        },
      ]
    }, 
    {
      path: '/auth',
      component: Auth,
      name: 'auth',
      children: [
        {
          path: '/auth/login',
          name: 'login',
          components: {
            auth: Login
          }
        },
        {
          path: '/auth/check-otp',
          name: 'check-otp',
          components: {
            auth: CheckOTP
          }
        },
        {
          path: '/auth/forgot-password',
          name: 'forgot-password',
          components: {
            auth: ForgotPassword
          }
        },
        {
          path: '/auth/change-password',
          name: 'change-password',
          components: {
            auth: ChangePassword
          }
        },
        {
          path: '/auth/account',
          name: 'account',
          components: {
            auth: Account
          }
        },
        {
          path: '/auth/confirmed',
          name: 'confirmed',
          components: {
            auth: Confirmed
          }
        },
        {
          path: '/auth/done',
          name: 'done',
          components: {
            auth: Done
          }
        },
        {
          path: '/auth/role',
          name: 'role',
          components: {
            auth: Role
          }
        },
      ]
    }
  ]
});

router.beforeEach(async (to) => {
  if (!isAuthenticated() && !to.fullPath.split('/').includes('auth')) {
    return { name: 'login' }
  }else if (isAuthenticated() && to.fullPath.split('/').includes('auth')) {
    return { name: 'profile' }
  }
})

function isAuthenticated() {
  if (getCookie('access_token')) {
    return true;
  }
  return false;
}
function getCookie(cname: any) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}


export default router;