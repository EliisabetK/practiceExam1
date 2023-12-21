<template>
  <div>

    <nav>
      <router-link to="/">Routs</router-link> |
      <router-link to="/routemanagement"> Routes Management</router-link> 
      <router-link to="/allbusses"> |  Buss Information</router-link> 
      <router-link to="/tickets"> |  Tickets</router-link> 
      <router-link to="/findroute"> |  Find a route</router-link> 

    </nav>
    <router-view />
  
   
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
button{
/*   margin-top: 30px;*/  
  border-radius: 36px;
  background: #FEE996;
  border:0;
  font-weight: 700;
  font-size: 0.8em;
  padding: 10px 16px;
  letter-spacing: 2px;
}
</style>
