<template>
  <div>
    <h2>Routes Management Pannel</h2>
    <table>
      <tr>
        <th>From</th>
        <th>To</th>
        <th>Cost</th>
        <th>Time</th>
        <th>Date</th>
      </tr>
      <tr v-for="route in routes" :key="route.id">
        <td><input type="text" v-model="route.fromcity" /></td>
        <td><input type="text" v-model="route.tocity" /></td>
        <td><input type="text" v-model="route.cost" /></td>
        <td><input type="text" v-model="route.departuretime" /></td>
        <td><input type="text" v-model="route.departuredate" /></td>
        <buttoncontainer>
          <button @click="updateRoute(route)" class="updateRoute">Update Route</button>
          <button @click="deleteRoute(route.id)" class="deleteRoute">Delete Route</button>
        </buttoncontainer>
        
      </tr>
    </table>
    <formcontainer>
      <form>
        <input type="text" id="from" name="From" placeholder="From" required v-model="ARoute.fromcity">
        <input type="text" id="to" name="To" placeholder="To" required v-model="ARoute.tocity">
        <input type="text" id="cost" name="Cost" placeholder="Cost" required v-model="ARoute.cost">
        <input type="text" id="departuretime" name="Departuretime" placeholder="Departure time" required v-model="ARoute.departuretime">
        <input type="text" id="dateAdd" name="dateAdd" placeholder="Departure date" required v-model="ARoute.departuredate">
      </form>
      <button @click="addRoute(ARoute)" class="addRoute">Add Route</button>
      <button @click="deleteAll()" class="deleteAll">Delete all</button>
    </formcontainer>
  </div>
</template>

<script>
import router from '@/router';


export default {
  name: "AllRoutes",
  data() {
    return {
      ARoute: {
        fromcity: "",
        tocity: "",
        cost: "",
        departuretime: "",
        departuredate: "",
      },
      routes: [],
    };
  },
  methods: {
    fetchRoutes() {
      fetch(`http://localhost:3000/api/routes/`)
        .then((response) => response.json())
        .then((data) => (this.routes = data))
        .catch((err) => console.log(err.message));
    },
    deleteRoute(routeId) {
      fetch(`http://localhost:3000/api/routes/${routeId}`, {
        method: "DELETE",
      })
      .then(() => this.fetchRoutes())
      .catch((e) => console.log(e));
    },

    updateRoute(route) {
      fetch(`http://localhost:3000/api/routes/${route.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(route),
      })
      .then((response) => {
        console.log(response.data);
        this.$router.push("/api/allroutes");
      })
      
      .catch((e) => console.log(e));
    },

  addRoute(route) {

  fetch("http://localhost:3000/api/routes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(route),
  })
  .then((response) => {
    console.log(response.data);
    this.$router.push("/api/allroutes");
  })
  .catch((e) => {
    console.log(e);
    console.log("error");
  });
},
deleteAll() {
      fetch(`http://localhost:3000/api/routes`, {
        method: "DELETE",
      })
      .then((response) => {
        console.log(response.data);
        this.fetchRoutes();
        this.$router.push("/api/allroutes");
      
      })
      .catch((e) => {
        console.log(e);
      });
    },

},

  mounted() {
    this.fetchRoutes();
    console.log("mounted");
  },
};
</script>

<style scoped>
.buttoncontainer {
  display: flex;
  width: auto;
}
form{
  padding: 20px;
  border-radius: 20px;
  background-color: lightgray;
  margin-top: 1em;
}

table{
  margin-left: 200px;
  align-items: center;
  background-color: rgb(190, 186, 186);
  padding: 10px;
  border-radius: 20px;
  width: auto;
}
th {
  text-align: center;
  margin: 30px;
  width: auto;
}
td {
  text-align: left;
  padding: 0px;
  margin: 0px;
  width: 7em;
  text-align: center;
  background-color: white;
}
tr{
  width: auto;
  margin: 50px;
  padding: 30px;
}

.blue {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  background-color: rgb(144, 144, 238);
}
.red {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  background-color: rgb(238, 144, 144);
}
p{
  background-color: gray;
  padding: 50px;
  width: 260px;
  margin-left: 400px;
}
.deleteRoute{
  background-color: red;
  width: auto;

}
.updateRoute{
  background-color: blue;
  color: white;
  width: auto;
}
.addRoute{
  background-color: rgb(29, 86, 33);
  color: white;
  margin-top: 2em;
}
td input {
  border: none;
  background: transparent;
  width: 100%;
  padding: 0px; 
  margin: 0; 
  text-align: center;
}

</style>