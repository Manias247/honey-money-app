import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '@/components/WelcomeView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import UserProfile from '@/views/UserProfile.vue';
import ProfilePhotos from '@/components/ProfilePhotos.vue';
import UsersView from '@/components/UsersView.vue';

const routes = [
  {
    path: "/",
    name: "WelcomeView",
    component: WelcomeView
  },
  {
    path: "/RegisterView",
    name: "RegisterView",
    component: RegisterView
  },
  {
    path: "/UsersView",
    name: "UsersView",
    component: UsersView
  },
   {
    path: "/LoginView",
    name: "LoginView",
    component: LoginView
  },
  {
    path: "/UserProfile",
    name: "UserProfile",
    component: UserProfile,
  },
  {
    path: "/ProfilePhotos",
    name: "ProfilePhotos",
    component: ProfilePhotos,
  },
  
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router