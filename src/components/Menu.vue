<template>
	<div>
		<ul
			v-if="isMainMenu"
			v-for="choice in choiceList"
			class="text-white breathing-select-red"
		>
			<router-link
				:to="{ path: choice.path }"
				@click="isMainMenu = !isMainMenu"
				>{{ choice.name }}</router-link
			>
		</ul>
		<div v-else>
			<Games />
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import Games from "./Games.vue";

const isMainMenu = ref(true);

onMounted(() => {
	console.log("Mounted");
});

const choiceList = ref([
	{
		name: "Games",
		path: "/games",
		// component: Games,
	},
	{
		name: "Projects",
		path: "/projects",
		// component: Projects,
	},
]);
</script>
