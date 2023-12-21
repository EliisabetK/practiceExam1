<template>
     <div>Enter the departure station:  
        <input type="text" id="fromcity" name="fromcity" placeholder="From"  v-model="ARoute.fromcity"/> 
        <button @click="fetchRoutes(ARoute.fromcity)" class="fetchRoutes">Show routes</button>
    </div>
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
      <td>{{route.cost}} </td>
      <td>{{route.departuretime}}</td>
      <td>{{route.departuredate}}</td>
    </tr>
    </table>
</template>

<script>
export default{
 name: "FindRoute",
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
    fetchRoutes(fromcity) {
        fetch(`http://localhost:3000/api/routes/${fromcity}`, {
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
          .then((data) => {
            this.routes= data;
          })
          .catch((error) => {
            console.error(error.message);
          });
      },
    },
    mounted() {
    this.routes;
    console.log("mounted");
  },
}
</script>
<style scoped>
table{
    margin-left: 33%;
    background-color: rgb(201, 230, 176);
    padding: 20px;
    width: 500px;
    border-radius: 20px;

}
div{
    margin: 20px;
    background-color: rgb(157, 216, 197);
    width: 500px;
    padding: 20px;
    border-radius: 20px;
    margin-left: 30%;
}
th{
    background-color: rgb(149, 168, 115);
    color: aliceblue;
    padding: 5px;
}
td{
    background-color: rgb(185, 201, 157);
    padding: 5px;
}
button{
    margin: 5px;
}

</style>