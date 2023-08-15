<template>
  <HeaderBar :thumbNail="isLoggedIn ? user.selectedPhoto.filename : ''" />
  <button @click="logout" class="logout-button">logout</button>
  <h2 class="welcome-heading" v-if="isLoggedIn">hey, {{ user.username }}!</h2>
  <div class="money-containers">
    <div class="total-money-container">
      <div class="incomes-title">
        <h4>Your incomes this month: </h4>
      </div>

      <br>
      <div class="total-money-box incomes">
        <h4 class="total-money incomes" v-if="user"> {{ user.totalIncomes }} </h4>
        <span class="currency incomes">{{ currency }}</span>
      </div>
    </div>
    <div class="total-money-container">
      <div class="sum-title">
        <h4 class="total-money sum">Your money in total: </h4>
      </div>
      <br>
      <div class="total-money-box sum">
        <h4 class="total-money sum" v-if="user">{{ user.totalMoney }} </h4>
        <span class="currency incomes">{{ currency }}</span>
      </div>
    </div>



    <div class="total-money-container">
      <div class="expenses-title">
        <h4>Your expenses this month: </h4>
      </div>
      <br>
      <div class="total-money-box">
        <h4 class="total-money" v-if="user">{{ user.totalExpenses }} </h4>
        <span class="currency expenses">{{ currency }}</span>
      </div>
    </div>
  </div>

  <div class="user-container" v-if="isLoggedIn">


    <br />


    <div class="forms-container">
      <form class="user-form" v-if="isLoggedIn" @submit.prevent="addIncome">
        <div class="money-input-box">
          <h4 class="heading-add-income">Add your new income</h4>
          <br />



          <label for="incomeDate" class="input-heading">Date:</label>
          <input type="date" id="incomeDate" class="money-input" v-model="incomeDate" required />
        </div>
        <div class="money-input-box">
          <label for="incomeDescription" class="input-heading">Description:</label>
          <input type="text" id="incomeDescription" class="money-input" v-model="incomeDescription" required />
        </div>

        <div class="money-input-box">
          <label for="incomeDate" class="input-heading">
            How much did you get?</label>
          <input type="number" id="incomeCount" class="money-input" v-model="incomeCount" required />
          <button type="submit" class="main-money-button add-income">Add income</button>
          <div class="history-container" v-if="isLoggedIn">
            <h3 class="input-heading incomes-heading">Incomes history</h3>

            <table class="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="income in user.incomes" :key="income.date">
                  <td>{{ income.date }}</td>
                  <td>{{ income.description }}</td>
                  <td>{{ income.count }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
      <form class="user-form" v-if="isLoggedIn" @submit.prevent="addExpense">
        <div class="money-input-box">
          <h4 class="heading-add-expense">Add your new expense</h4>
          <br />
          <label for="expenseDate" class="input-heading">Date:</label>
          <input type="date" id="expenseDate" class="money-input" v-model="expenseDate" required />
        </div>

        <div class="money-input-box">
          <label for="expenseDescription" class="input-heading">Description:</label>
          <input type="text" id="expenseDescription" class="money-input" v-model="expenseDescription" required />
        </div>

        <div class="money-input-box">
          <label for="expenseDate" class="input-heading">
            How much did you spend?</label>
          <input type="number" id="expenseCount" class="money-input" v-model="expenseCount" required />
          <button type="submit" class="main-money-button add-expense">Add expense</button>
          <div class="history-container" v-if="isLoggedIn">
            <h3 class="input-heading expenses-heading">Expenses history</h3>
            <table class="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="expense in user.expenses" :key="expense.date">
                  <td>{{ expense.date }}</td>
                  <td>{{ expense.description }}</td>
                  <td>{{ expense.count }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>

  </div>
  <h1 v-else>Something went wrong, log in properly to continue</h1>
</template>
<script>
import HeaderBar from '@/components/HeaderBar.vue';
import { useAuthStore } from '@/store/store';

export default {
  name: "UserProfile",
  components: {
    HeaderBar
  },

  data() {
    return {
      incomeDate: new Date().toISOString().substring(0, 10),
      expenseDate: new Date().toISOString().substring(0, 10),
      incomeCount: "",
      incomeDescription: "",
      expenseCount: "",
      expenseDescription: "",
      currency: "$",
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
    addIncome() {
      const auth = useAuthStore();
      const newIncome = {
        date: this.incomeDate,
        description: this.incomeDescription,
        count: parseInt(this.incomeCount)
      };

      if (!auth.user.incomes) {
        auth.user.incomes = [];
      }
      auth.user.incomes.push(newIncome);
      this.calculateAndUpdateTotalMoney();
      this.incomeDate = new Date().toISOString().substring(0, 10);
      this.incomeCount = "";
      this.incomeDescription = "";
    },
    addExpense() {
      const auth = useAuthStore();
      const newExpense = {
        date: this.expenseDate,
        description: this.expenseDescription,
        count: parseInt(this.expenseCount)
      };
      auth.updateUser();
      if (!auth.user.expenses) {
        auth.user.expenses = [];
      }
      auth.user.expenses.push(newExpense);
      this.calculateAndUpdateTotalMoney();
      this.expenseDate = new Date().toISOString().substring(0, 10);
      this.expenseCount = "";
      this.expenseDescription = "";
    },
    calculateTotalMoney() {
      const totalIncomes = this.user.incomes.reduce(
        (total, income) => total + income.count,
        0
      );
      const totalExpenses = this.user.expenses.reduce(
        (total, expense) => total + expense.count,
        0
      );
      return totalIncomes - totalExpenses;
    },
    calculateAndUpdateTotalMoney() {
      const auth = useAuthStore();
      const totalExpenses = this.user.expenses.reduce(
        (total, expense) => total + expense.count,
        0
      );
      const totalMoney = this.user.totalMoney + totalExpenses;
      auth.user.totalMoney = totalMoney;
      auth.updateUser();
    },
    logout() {
      useAuthStore().logout();
      this.$router.push("/");
    },
  },
};

</script>
<style>
.welcome-heading,
.total-money-container {
  text-align: center;
}

.welcome-user-heading {
  margin: 10px;
  width: 100%;
}

.total-money-container {
  width: 100%;
  padding-left: 100px;
  padding-right: 100px;
  padding: 20px;

}

.total-money h4 {
  line-height: 20px;
  color: white;
  font-weight: bold;
}

.total-money .incomes h4 {
  color: white;
}

.total-money-box {
  background-color: rgba(255, 255, 255, 0.8);
  width: 150px;
  height: 100px;
  padding: 20px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
}

.user-form {
  flex: 1;
  max-width: 300px;
  margin: 10px;
}

.forms-container,
.total-money-box {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.total-money-container {
  padding: 50px;
}

.total-money-box {
  margin: 0 auto;
}

.forms-container {
  height: 100px;
  display: flex;
  gap: 320px;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
}

.user-form {
  flex: 1;
  width: 300px;
}

.history-table {
  background-color: rgba(255, 255, 255, 0.8);
  width: 300px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
}

tbody,
th,
td {
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
}

.money-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  text-align: center;
  opacity: 0.8;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
}

.main-money-button {
  width: 60%;
  padding: 10px;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
  margin: 20px;
}

.add-expense {
  background-color: #b75f8b;
}

.add-income {
  background-color: #2c9273;
}

.add-income,
.add-expense {
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
}

.add-expense:hover {
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(183, 95, 139, 1) 0%, rgba(244, 58, 58, 1) 100%);
}

.add-income:hover {
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(115, 231, 131, 1) 0%, rgba(44, 146, 115, 1) 100%);
}

.incomes {
  color: #2c9273;
}

.expenses {
  color: #b75f8b;
}



.add-expense:hover,
.add-income:hover {
  transform: translateY(-5px);
  box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.5);
  transition: all ease 0.2s;
}

.money-input {
  width: 300px;
  padding: 10px;
  margin: 20px;
  border: none;
  text-align: center;

}

.money-containers {
  display: flex;
}

.heading-add-income, .incomes-heading {
  text-decoration-color: #2c9273;
  text-decoration-line: underline;
  text-decoration-thickness: 3px;
}

.heading-add-expense, .expenses-heading {
  text-decoration-color: #b75f8b;
  text-decoration-line: underline;
  text-decoration-thickness: 3px;
}

.expenses-title,
.sum-title,
.incomes-title {
  padding: 10px;
  color: white;
}

.expenses-title {
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(183, 95, 139, 1) 0%, rgba(244, 58, 58, 1) 100%);
}

.incomes-title {
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(115, 231, 131, 1) 0%, rgba(44, 146, 115, 1) 100%);
}

.sum-title {
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(100, 149, 237, 1) 0%, rgb(18, 63, 160) 100%);

}</style>