<template>
  <div class="welcome-container">
    <div class="welcome-container">
  <button class="main-button register">
      <RouterLink to="/RegisterView" class="link">
        Create new account!
      </RouterLink>
    </button>
  <button class="main-button login">
      <RouterLink to="/UsersView" class="link">
        Login
      </RouterLink>
    </button>
    
  </div>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';



</script>

<style>
body {
  background-color: cornflowerblue;
}

.welcome-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.welcome-profile-photos {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

button {
  text-align: center;
  border: none;
  font-size: large;
  font-weight: bold;
  padding: 10px;


}

.main-button {
  color: aliceblue;
  width: 200px;
  height: 50px;
  
}

.register-show {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  font-size: large;
  font-weight: bold;
  padding: 10px;
  background-color: rgb(15, 37, 71);
}
.login, .register {
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
  
}
.register:hover, .login:hover {
  transform: translateY(-5px);
  box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.5);
  transition: all ease 0.2s;
}
</style>
