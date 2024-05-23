import * as VueRouter from 'vue-router'
import * as Cookies from './Cookies'

// Pages
import Base from './pages/Base.vue';
import Auth from './pages/Auth.vue';

// Contents
import Profile from './components/contents/Profile.vue';
import ExploreProjects from './components/contents/ExploreProjects.vue';
import Projects from './components/contents/Projects.vue';
import ProjectDiscuss from './components/contents/ProjectDiscuss.vue';
import DetailProgressProject from './components/contents/DetailProgressProject.vue';
import SubmitProposal from './components/contents/SubmitProposal.vue';
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

// Settings
import ProfileSetting from './components/settings/Profile.vue';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
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
            content: ExploreProjects
          }
        },
        {
          path: '/base/project/me',
          name: 'my-projects',
          components: {
            content: Projects
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
        {
          path: '/base/project/:id/submit-proposal',
          name: 'submit-proposal',
          props: true,
          components: {
            content: SubmitProposal
          }
        },
        {
          path: '/base/setting/profile',
          name: 'setting-profile',
          props: true,
          components: {
            content: ProfileSetting
          }
        },
        {
          path: '/base/setting/change-password',
          name: 'setting-password',
          props: true,
          components: {
            content: ProfileSetting
          }
        },
        {
          path: '/base/setting/preference',
          name: 'setting-preference',
          props: true,
          components: {
            content: ProfileSetting
          }
        },
        {
          path: '/base/setting/about-us',
          name: 'about-us',
          props: true,
          components: {
            content: ProfileSetting
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
          props: true,
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
    console.log('b')
    return { name: 'profile' }
  }
})

function isAuthenticated() {
  if (Cookies.getCookie('access_token')) {
    return true;
  }
  return false;
}


export default router;