<template>
  <HeaderBar />
  <BackButton />
  <div class="user-enter-container">

  


    <form @submit.prevent="loginUser" class="register-form">
      <h1 v-if="greetUser"> {{ greeting }}</h1>

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
import { useAuthStore } from '@/store/store';
import BackButton from '@/components/BackButton.vue';





export default {
  name: "LoginView",
  components: {
    HeaderBar,
    BackButton
  }, setup() {
    const auth = useAuthStore();
    return { auth }
  },
  computed: {
    isLoggedIn() {
      return this.auth.isLoggedIn;
    },
    isRegisteredIn(){
      return this.auth.isRegisteredIn;
    },

    user() {
      return this.auth.user;
    },
    // greeting() {
    //   return `Hello ${this.user.username}`;
    // },
 
  },

data() {
  return {
    username: "",
    password: "",
    greeting: "",
   

    



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
      authStore.loginUser({ username: this.username, password: this.password });

      this.$router.push("/UserProfile");

    } catch (error) {
      alert(error.message);
    }
  },

  // greetUser() {
  //   const authStore = useAuthStore();
  //   const user = authStore.users.find(user => user.username === this.username);
  //   this.greeting = user.username;
  // }

}


}
</script>
<style></style>