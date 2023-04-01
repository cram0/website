import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
		},
		{
			path: "/games",
			name: "games",
		},
		{
			path: "/projects",
			name: "projects",
		},
	],
});

export default router;
