import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isRegisteredIn: false,
    isLoggedIn: false,
    user: null,
    userID: null,
    selectedPhoto: null,
    totalMoney: null,
    totalIncomes: null,
    totalExpenses: null,
    users: JSON.parse(localStorage.getItem("users")) || [],
        
  }),
  

  actions: {
    async registerUser({ username, password, totalIncomes, totalExpenses, totalMoney, selectedPhoto }) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find((user) => user.username === username);
      if (existingUser) {
        throw new Error("Username already exists");
      }
      
      const userID = users.length + 1;
      

      const newUser = {
        userID,
        username,
        password,
        selectedPhoto,
         incomes: [],
         expenses: [],
         totalMoney,
        totalIncomes,
        totalExpenses, 
      };
     
      this.users.push(newUser);
      this.isRegisteredIn = true;
      this.updateUser();
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
      if (this.user) {
        const totalIncomes = this.user.incomes.reduce(
          (total, income) => total + income.count,
          0
        );
        const totalExpenses = this.user.expenses.reduce(
          (total, expense) => total + expense.count,
          0
        );
        const totalMoney = totalIncomes - totalExpenses;

        this.user.totalIncomes = totalIncomes;
        this.user.totalExpenses = totalExpenses;
        this.user.totalMoney = totalMoney;

        const updatedUsers = this.users.map((user) =>
          user.username === this.user.username ? this.user : user
        );

        this.users = updatedUsers;
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      }
    },
    setActivePhoto(photo) {
      this.selectedPhoto = photo;
    },
 
    
   
  },
});

