<template>
    <form>
      <label>Select the starting station:</label>
      <input type="text" id="fromcity" name="fromcity" placeholder="From station" required v-model="Bus.fromcity" />
      <label>Select the destination station:</label>
      <input type="text" id="tocity" name="tocity" placeholder="To station" required v-model="Bus.tocity" />
      <label>Select the date:</label>
      <input type="text" id="date" name="model" placeholder="Date" required v-model="Bus.departuredate" />
      <label>Select the time:</label>
      <input type="text" id="time" name="time" placeholder="Time" required v-model="Bus.departuretime" />
      <button @click.prevent="updateSeats(Bus)" class="">Purchase</button>
      <p v-if="Bus.seats !== null">The bus has {{ Bus.seats }} seats left.</p>
    </form>
  </template>
  
  <script>
  import router from "@/router";
  
  export default {
    name: "AllBusses",
    data() {
      return {
        Bus: {
            fromcity: "",
            tocity: "",
            departuretime: "",
            departuredate: "",
            seats: null,
      },
      };
    },
    methods: {
      Purchase() {
        fetch(`http://localhost:3000/api/routes/${this.Bus.fromcity}/${this.Bus.tocity}/${this.Bus.departuretime}/${this.Bus.departuredate}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Route not found");
            }
            return response.json();
          })
          .catch((error) => {
            console.error(error.message);
          });
      },

      updateSeats(Bus) {
      fetch(`http://localhost:3000/api/routes/${this.Bus.fromcity}/${this.Bus.tocity}/${this.Bus.departuretime}/${this.Bus.departuredate}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Bus),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.Bus.seats = data.seats;
      })
      
      .catch((e) => console.log(e));
    },
    },
  };
  </script>
  
  <style scoped>
    form{
        align-items: center;
        padding: 20px;
        border-radius: 20px;
        margin-top: 1em;
        background-color: rgb(64, 96, 86);
        display: flex;
        flex-direction: column;
        width: 300px;
        margin-left: 35%;
        }
    label{
        margin-top: 20px;
        margin-bottom: 5px;
        color: rgb(237, 249, 249);
    }
    button{
        background-color: rgb(223, 209, 166);
        margin-top: 30px;
    }
    button:hover{
        background-color: rgb(244, 243, 213);
    }
    p{
        color: beige;
    }
  </style>
