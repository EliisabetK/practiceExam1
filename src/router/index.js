import { createRouter, createWebHistory } from 'vue-router'
import RouteManagement from "../views/RouteManagement.vue";
import AllRouts from "../views/AllRoutes.vue";
import BussInformation from "../views/BussInformation.vue";
import Tickets from "../views/Tickets.vue"
import FindRoute from "../views/FindRoute.vue"
import Design from "../views/Design.vue";

const routes = [{
        path: "/",
        name: "AllRouts",
        component: AllRouts,
    }, {
        path: '/routemanagement',
        name: 'RouteManagement',
        component: RouteManagement,
    },
    {
        path: '/findroute',
        name: 'Findroute',
        component: FindRoute,
    },
    {path: '/design', name: 'Design', component: Design},
    {
        path: "/allbusses",
        name: "allBusses",
        component: BussInformation,
    },
    {
        path: "/tickets",
        name: "Tickets",
        component: Tickets,
    },
    { //will route to AllPosts view if none of the previous routes apply
        path: "/:catchAll(.*)",
        name: "AllRouts",
        component: AllRouts,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router