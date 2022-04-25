<template>
  <div class="container">
      <Loading v-show="loading"/>
      <h1 class='title'>Administration</h1>
      <form class="add-admin" @submit.prevent="addAdmin">
          <label for="admin">Add Admin</label>
          <input v-model="adminEmail" placeholder="Enter user email to make them an admin!" type="email" id="admin" required="required">
          <p v-show="this.message">{{ this.message }}</p>
          <button type="submit">Submit</button>
      </form>
  </div>
</template>

<script>
import Loading from "../components/Loading.vue"
import { getFunctions, httpsCallable } from "firebase/functions"
import { firebaseApp } from "../firebase/firebaseInit.js"


export default {
    name: "Admin",
    data() {
        return {
            adminEmail: "",
            message: "",
            loading: false,
        }
    },
    methods: {
        async addAdmin() {
            console.log('add admin running' + this.adminEmail)
            this.loading = true;
            const functions = getFunctions(firebaseApp);
            const addAdmin = await httpsCallable(functions, 'addAdminRole');
            addAdmin({ email: this.adminEmail }).then((result) => {
                console.log(result)
                this.message = result.data.message
            })
            this.loading = false;
            this.adminEmail = '';
        }
    },
    components: {
        Loading,
    }
}
</script>

<style lang='scss' scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    gap: 25px;

    .add-admin {
        background-color: #ededed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 600px;
        height: 300px;
        gap: 30px;
        border-radius: 15px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0,0,0, 0.06);

        label {
            font-size: 1.25rem;
        }

        input {
            background-color: #f2f7f6;
            width: 400px;
            height: 50px;
            padding-left: 10px;
            line-height: 1.5rem;
            border: none;
            font-size: 1rem;
            text-align: left;
            
            &:focus {
                outline: none;
            }
        }   
        
        button {
            width: 100px;
            height: 35px;
            border-radius: 10px;
            color: white;
            background-color: #303030;
            cursor: pointer;
            border: none;
        }
    }
}
</style>