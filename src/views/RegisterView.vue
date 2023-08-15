<template>
  <HeaderBar />
  <BackButton />
  <div class="user-enter-container">
    <h1 class="input-heading">Register first!</h1>
    <div class="user-input-box">
      <div class="profile-photo-box">
        <button @click="showPhotoBox" class="register-photo-btn ">
          Add your profile image!
        </button>
      </div>
    </div>
    <form @submit.prevent="registerUser" class="register-form">


      <div class="user-input-box">
        <label for="username" class="input-heading">Username</label>
        <input type="text" id="username" class="main-input" v-model="username" autocomplete="off" required />
      </div>

      <div class="user-input-box">
        <label for="password" class="input-heading">Password:</label>
        <input type="password" id="password" class="main-input" v-model="password" autocomplete="off" required />
      </div>
      <div class="user-input-box">
        <label for="confirmPassword" class="input-heading">Confirm password:</label>
        <input type="password" id="confirmPassword" class="main-input" v-model="confirmPassword" required
          autocomplete="off" />


      </div>
      <div v-if="photoBoxShown" class="overlay">
        <div class="image-container-wrapper">
          <ul class="image-container">
            <li v-for="photo in photos" :key="photo.id">
              <label :for="photo.id">
                <input :id="photo.id" type="radio" v-model="selectedPhoto" :value="photo" required />
                <img :src="photo.filename" class="photo-item" alt="Profile Photo" />
              </label>
            </li>
          </ul>
          <div class="approve-photo-box">

            <button type="button" @click="approvePhoto" class="approve-photo-btn">
              Approve Photo
            </button>
          </div>
        </div>
      </div>

      <button type="submit" class="main-button login">Add account & log in</button>

    </form>

  </div>
</template>
<script>
import HeaderBar from '@/components/HeaderBar.vue';
import { useAuthStore } from '@/store/store';
import BackButton from '@/components/BackButton.vue';



export default {
  name: "RegisterView",
  components: {
    HeaderBar,
    BackButton
  },
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      passError: '',
      isWrong: false,
      photoBoxShown: false,
      selectedPhoto: null,

      photos: [
        { id: 0, filename: 'https://github.com/Manias247/honey-money/blob/main/src/components/images/images/bart.png?raw=true' },
        { id: 1, filename: 'https://github.com/Manias247/honey-money/blob/main/src/components/images/images/homer.jpg?raw=true' },
        { id: 2, filename: 'https://github.com/Manias247/honey-money/blob/main/src/components/images/images/lisa.png?raw=true' },
        { id: 3, filename: 'https://github.com/Manias247/honey-money/blob/main/src/components/images/images/maggie.png?raw=true' },
        { id: 4, filename: 'https://github.com/Manias247/honey-money/blob/main/src/components/images/images/merge.png?raw=true' },
      ],

    }
  },
  computed: {

  },
  methods: {
    async registerUser() {
      const auth = useAuthStore();
      if (this.password === this.confirmPassword) {
        try {
          auth.setActivePhoto(this.selectedPhoto);
          auth.registerUser({
            username: this.username,
            password: this.password,
            selectedPhoto: this.selectedPhoto,
          });
          // auth.isRegisteredIn;
          console.log(this.selectedPhoto);
          this.$router.push('/LoginView');
        } catch (error) {
          alert(error.message);
        }
      }
    },
    showPhotoBox() {
      this.photoBoxShown = true;
    },
    approvePhoto() {
      this.photoBoxShown = false;
    },


  },

}
</script>
<style>
body {
  background-color: rgb(174, 202, 255);

}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);

}

.image-container-wrapper {
  width: 100%;
  align-items: center;
  display: block;
  align-items: center;
  justify-content: center;
  max-width: 50%;

}
.approve-photo-box {
  max-width: 70%;
  align-items: center;
  display: flex;
}

.approve-photo-btn {
  margin-left: auto;
}

.photo-item:active {
  border: 10px 5px 5px hotpink;
}

.login,
.register {
  border-radius: 0%;
  margin: 20px;
}

.login {
  background-color: hotpink;
}

.login:hover,
.login:active {
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgb(218, 57, 57) 0%, rgba(255, 105, 180, 1) 88%);
}

.register {
  background-color: rgb(255, 200, 0);
  height: 50px;
}

.register:hover,
.register:active {
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(255, 200, 0, 1) 0%, rgba(247, 132, 0, 1) 88%);
}

.user-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: none;
  background-color: aquamarine;
  margin: 20px;
}

.user-enter-container {
  align-items: center;
}

.main-input {
  padding: 10px;
  margin: 10px;
  width: 200px;
  border: none;

}

.user-input-box {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  align-items: center;
}

.input-heading {
  margin-bottom: 5px;
  text-align: center;
}

.active-photo-container {
  margin: auto;
  width: 200px;
  height: 200px;
}

.profile-photo-box {

  border-radius: 100%;
  width: 200px;
  height: 200px;
  position: relative;
}

.cover {
  width: 100%;
  height: 100%;
}

.chosen-photo {
  width: 200px;
  height: 200px;
}


.register-photo-btn {
  border-radius: 100%;
  width: 150px;
  height: 150px;
  position: absolute;
  margin: 20px;
}</style>