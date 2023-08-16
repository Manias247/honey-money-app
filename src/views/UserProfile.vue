<template>
 
  <HeaderBar 
  :thumbNail="user.selectedPhoto.filename"
  />
  <button @click="logout" class="logout-button">logout</button>

  <div v-if="isLoggedIn">
    <h2 v-if="isLoggedIn">hey, {{ user.username }}!</h2>

    <br />



    <form v-if="isLoggedIn" @submit.prevent="addEntry">
      <div class="user-input-box">
        <h4>Your earnings in total: {{ user.totalEarnings }}</h4>
        <br />

        <label for="entryDate" class="input-heading">Date:</label>
        <input type="date" id="entryDate" class="main-input" v-model="entryDate" required />
      </div>

      <div class="user-input-box">
        <label for="entryDate" class="input-heading">
          How much did you get?</label>
        <input type="number" id="earningsCount" class="main-input" v-model="earningsCount" required />
        <button type="submit" class="main-button add">Dodaj</button>
        <div v-if="isLoggedIn">
          <h3 class="input-heading">Historia:</h3>
          <table class="history-table">
            <thead>
              <tr>
                <th>Data:</th>
                <th>Ilość:</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="entry in user.history" :key="entry.date">
                <td>{{ entry.date }}</td>
                <td>{{ entry.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>

  </div>
  <h1 v-else>Something went wrong, log in properly to continue</h1>
</template>
<script>
import HeaderBar from '@/components/HeaderBar.vue';

import { useAuthStore } from '@/store/store';

export default {
  name: "UserProfile",
  components: {
    HeaderBar,


  },

  data() {
    return {
      entryDate: new Date().toISOString().substring(0, 10),
      earningsCount: "",

    };
  },
  computed: {
    isLoggedIn() {
      const auth = useAuthStore();
      return auth.isLoggedIn;
    },

    user() {
      const auth = useAuthStore();
      const user = auth.user;
      if (user) {
        return { ...user };
      }
      return null;
    },



  },
  methods: {
    addEntry() {
      const auth = useAuthStore();
      const newEntry = {
        date: this.entryDate,
        count: parseInt(this.earningsCount),
      };
      if (!auth.user.history) {
        auth.user.history = [];
        auth.user.totalEarnings = 0;
      }
      auth.user.history.push(newEntry);

      auth.user.totalEarnings = auth.user.history.reduce(
        (total, entry) => total + entry.count,
        0
      );

      auth.updateUser();
      this.entryDate = "";
      this.earningsCount = "";
    },
    logout() {
      useAuthStore().logout();
      this.$router.push("/");
    },



  },
};

</script>
<style></style>