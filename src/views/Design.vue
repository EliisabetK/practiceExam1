<template>
    <container>
        <column_left>
            <p>Saadaolevad bussid: </p>
            <list>
                <li v-for="buss in busses" :key="buss.id" @click="fetchSeats(buss)" class = fetchSeats>
                    {{buss.model}}
                </li>
            </list>
        </column_left>
        <column_right>
            <p v-if="ABus.seats !== null">The bus has {{ ABus.seats }} seats.</p>
            
        </column_right>
    </container>
</template>

<script>
export default {
    data() {
        return {
            ABus: {
                model: "",
                seats: "",
            },
            busses: []
        }
    },
    methods: {
        fetchBusses() {
        fetch(`http://localhost:3000/api/busses/`)
            .then((response) => response.json())
            .then((data) => (this.busses = data))
            .catch((err) => console.log(err.message));
        },
        fetchSeats(bus) {
        fetch(`http://localhost:3000/api/busses/${bus.model}`, {
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

    mounted() {
        this.fetchBusses();
        console.log("mounted");
        }
    } 
</script>
<style scoped>
    container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        column-gap: 3em;
    }
    column_left, column_right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 50%;
        background-color: rgb(64, 98, 110);
        border-radius: 20px;
    }
    p {
        font-size: 2em;
        color: aliceblue;
    }

    li{
        color: aliceblue;
        font-size: 1.3em;
        margin: 1em;
        }
</style>