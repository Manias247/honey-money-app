<template>
   <HeaderBar/>
   <BackButton/>
  <div class="user-enter-container">
   
    
    <form @submit.prevent="loginUser" class="register-form">
    
  
      <div class="user-input-box">
       
      
        <label for="username" class="input-heading">Username</label>
        <input type="text" id="username" class="main-input" v-model="username" autocomplete="off" required />
      </div>

      <div class="user-input-box">
        <label for="password" class="input-heading">Password:</label>
        <input type="password" id="password" class="main-input" v-model="password" autocomplete="off" required />
      </div>
      <div class="user-input-box">

        <button class="main-button login">Login</button>
      </div>
   
    </form>
  
  </div>
</template>
<script>
import HeaderBar from '@/components/HeaderBar.vue';
import { useAuthStore  } from '@/store/store';
import BackButton from '@/components/BackButton.vue';



export default {
  name: "LoginView",
  components: {
    HeaderBar,
    BackButton
  },
  computed: {
 

    user() {
      const auth = useAuthStore();
      const user = auth.user;
      if (user) {
        return { ...user };
      }
      return null;
    },
    currentPhoto(){
      
      return useAuthStore().selectedPhoto;
    
},

  
    },
    setup(){
      const auth = useAuthStore();
      return { auth }
  },
  
  data() {
    return {
    
      password: "",
  
    }
  },
  methods: {
     loginUser() {
      const authStore = useAuthStore();
      const user = authStore.users.find(user => user.username === this.username);
      if (!user || user.password !== this.password) {
        alert("Invalid username or password");
        return;
      }
  
      try {
        authStore.loginUser({ username: this.username, password: this.password});
        this.$router.push("/UserProfile");
      } catch (error) {
        alert(error.message);
      }
    },
    

  
  }
}
</script>
<style></style>