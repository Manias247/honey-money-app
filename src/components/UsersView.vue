<template>
  <BackButton />
  <ul class="users-container">
    <li v-for="user in users" :key="user.userID" @click="showLogin" class="person">
      <img :src="user.selectedPhoto.filename" alt="Profile Photo" class="photo-item shadow" />
      <h2 class="user-name">{{ user.username }}</h2>
      </li>
  </ul>
</template>
  
<script>
import { useAuthStore } from "@/store/store";

import BackButton from "./BackButton.vue";

export default {
  name: "UsersView",
  components: {
    BackButton,
  },
  computed: {
    users(){
      return useAuthStore().users;
    }
  },
  setup(){
    const auth = useAuthStore();
    return { auth }
  },
  methods: {
    showLogin(){
          this.$router.push('/LoginView')
      }
    },
    
    
  
  
};
</script>
<style>
.user-name {
  text-align: center;
}

.person {
  display: inline-block;
}

.image-container {
  width: 300px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0px;
  list-style: none;
  padding: 20px;
  margin-left: 25%;
}

.photo-item {
  border-radius: 100%;
  display: inline-block;
  margin: 50px;
  width: 150px;
  height: 150px;

}


.btn-container {
  width: 100%;
  justify-content: center;
}

.save-photo-btn {
  margin-left: 40%;
  width: 200px;
}

.shadow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}

.shadow:before {
  pointer-events: none;
  position: absolute;
  z-index: -1;
  content: "";
  top: 100%;
  left: 5%;
  height: 10px;
  width: 90%;
  opacity: 0;
  background: -webkit-radial-gradient(center,
      ellipse,
      rgba(0, 0, 0, 0.35) 0%,
      rgba(0, 0, 0, 0) 80%);
  background: radial-gradient(ellipse at center,
      rgba(0, 0, 0, 0.35) 0%,
      rgba(0, 0, 0, 0) 80%);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform, opacity;
  transition-property: transform, opacity;
}

.shadow:hover:before,
.shadow:focus:before,
.shadow:active:before {
  opacity: 1;
  -webkit-transform: translateY(5px);
  transform: translateY(5px);
}

.shadow:hover,
.shadow:focus,
.shadow:active {
  -webkit-transform: translateY(-10px);
  transform: translateY(-10px);
  box-shadow: 10px 10px 10px rgba(105, 109, 110, 0.816);
}

.active {
  border: 10px solid rgb(32, 109, 252)
}
</style>
