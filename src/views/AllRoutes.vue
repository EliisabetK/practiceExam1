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
      <td :class="getColorClass(route.cost)">{{route.cost}}</td>
      <td>{{route.departuretime}}</td>
      <td>{{route.departuredate}}</td>
    </tr>
  </table>
  <div>
    <p>We have {{ routes.length }} trips today</p>
  </div>
</template>

<script>

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
    getColorClass(cost) {
      return cost > 12 ? 'red' : 'blue';
    }
  },
  mounted() {
    this.fetchRoutes();
    console.log("mounted");
  },
};
</script>

<style>
/*
table{
  margin-left: 400px;
  word-spacing: 20px;
  align-items: center;
  background-color: lightgray;
}
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  background-color: green;
}
td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  background-color: lightgreen;
}
tr{
  width: 300px;
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
}*/

</style>