import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isRegisteredIn: false,
    isLoggedIn: false,
    user: null,
    userID: null,
    selectedPhoto: null,
    totalEarnings: 0,
    users: JSON.parse(localStorage.getItem("users")) || [],
        
  }),
  

  actions: {
    async registerUser({ username, password, totalEarnings, selectedPhoto }) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find((user) => user.username === username);
      if (existingUser) {
        throw new Error("Username already exists");
      }
      const userID = users.length + 1;

      const newUser = {
        userID,
        username,
        selectedPhoto,
        history: [],
        totalEarnings,
        password,
      };
      this.users.push(newUser);

      this.saveUsersToLocalStorage();
      
    },
    saveUsersToLocalStorage() {
      localStorage.setItem('users', JSON.stringify(this.users))
    },
    updateUserList(newUsers) {
      this.users = newUsers;
      this.saveUsersToLocalStorage(); 
    },
    loadUsersFromLocalStorage() {
      const storedUsers = localStorage.getItem('users')
      if (storedUsers) {
       console.log("ok!")
      }
    },

    async loginUser({ username, password }) {
      this.users = JSON.parse(localStorage.getItem("users")) || [];
      const user = this.users.find((user) => user.username === username);
      if (!user || user.password !== password) {
        throw new Error("Wrong password and/or username");
      }

      this.isLoggedIn = true;
   
      this.user = { ...user };
    },

    logout() {
      this.isLoggedIn = false;
      this.user = null;
      
    },
    updateUser() {
      const updatedUsers = this.users.map((user) => {
        if (user.username === this.user.username) {
          return {
            ...this.user,
            totalEarnings: Number(this.user.totalEarnings),
          };
        }
        return user;
      });
      this.users = updatedUsers;
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    },
    setActivePhoto(photo) {
      this.selectedPhoto = photo;
    },
   
  },
});

