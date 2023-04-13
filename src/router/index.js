import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home"
        },
        {
            path: "/games",
            name: "games"
        },
        {
            path: "/projects",
            name: "projects"
        },
        {
            path: "/resume",
            name: "resume"
        },
        {
            path: "/contact",
            name: "contact"
        },
        {
            path: "/settings",
            name: "settings"
        }
    ]
});

export default router;
