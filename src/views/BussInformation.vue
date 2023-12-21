<template>
    <form>
      <label>Enter the model of the bus:</label>
      <input
        type="text"
        id="model"
        name="model"
        placeholder="Bus model"
        required
        v-model="ABus.model"
      />
      <button @click.prevent="fetchBus" class="fetchBus">Show bus information</button>
      <p v-if="ABus.seats !== null">The bus has {{ ABus.seats }} seats.</p>
    </form>
  </template>
  
  <script>
  import router from "@/router";
  
  export default {
    name: "AllBusses",
    data() {
      return {
        ABus: {
          model: "",
          seats: null,
        },
      };
    },
    methods: {
      fetchBus() {
        fetch(`http://localhost:3000/api/busses/${this.ABus.model}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Bus not found");
            }
            return response.json();
          })
          .then((data) => {
            this.ABus.seats = data.seats;
          })
          .catch((error) => {
            console.error(error.message);
            this.ABus.seats = null;
          });
      },
    },
  };
  </script>
  
  <style scoped>
  form{
    background-color: rgb(152, 144, 207);
    color: whitesmoke;
    width: 400px;
    margin-left: 30%;
    display: flex;
    flex-direction: column;
    padding: 30px;
    align-items: center;
    border-radius: 20px;
  }
  button{
    background-color: rgb(173, 203, 176);
    margin-top: 20px;
  }
  input{
    margin-top: 20px;
    width: 100px;
  }
  </style>
  