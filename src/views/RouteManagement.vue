<template>
  <h3>All routes</h3>
  <table>
    <tr>
      <th>From</th>
      <th>To</th>
      <th>Cost</th>
      <th>Time</th>
      <th>Date</th>
    </tr>
    <tr v-for="route in routes" :key="route.id">
      <td>{{route.fromcity}}</td>
      <td>{{route.tocity}}</td>
      <td>{{route.cost}}</td>
      <td>{{route.departuretime}}</td>
      <td>{{route.departuredate}}</td>
      <button @click="updateRoute" class="updateRoute">Update Route</button>
      <button @click="deleteRoute(route.id)" class="deleteRoute">Delete Route</button>
    </tr>
  </table>
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

<style>
table{
  margin-left: 400px;
  align-items: center;
  background-color: lightgray;
  padding: 20px;
  border-radius: 20px;
}
th {
  text-align: center;
  margin: 30px;
}
td {
  border: 1px solid #dddddd;
  text-align: left;
  background-color: white;

}
tr{
  width: 300px;
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
}
.updateRoute{
  background-color: blue;
  color: white;
}

</style>