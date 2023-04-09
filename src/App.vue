<template>
    <div>
        <div id="center-box" class="flex justify-center items-center p-4">
            <div :class="[mainMenuExpanded ? expandedStyle : notExpandedStyle]">
                <ul class="text-white breathing-select-red">
                    <router-link v-if="!isMainMenu" :to="{ path: '/' }">
                        {{ "-- Go back" }}
                    </router-link>
                </ul>
                <ul v-if="isMainMenu" v-for="choice in choiceList" class="text-white breathing-select-red text-center w-">
                    <router-link v-if="!choice.externalLink" :to="{ path: choice.path }" @click="isMainMenu = !isMainMenu">{{ choice.name }}</router-link>
                    <a v-else :href="choice.path">{{ choice.name }}</a>
                </ul>

                <div v-if="mainMenuExpanded">
                    <div v-if="route.path === '/games'">
                        <ul v-for="games in gameList">
                            <div class="flex">
                                <label class="text-sm sm:text-sm md:text-base lg:text-lg text-white">
                                    {{ games.name }}
                                </label>
                                <label v-if="!games.expanded" class="text-sm sm:text-sm md:text-base lg:text-lg text-white hover:cursor-pointer breathing-select-red" @click.prevent="games.expanded = !games.expanded">
                                    {{ "Expand" }}
                                </label>
                                <label v-else class="text-sm sm:text-sm md:text-base lg:text-lg text-white hover:cursor-pointer breathing-select-red" @click.prevent="games.expanded = !games.expanded">
                                    {{ "Collapse" }}
                                </label>
                            </div>
                            <div v-if="games.expanded" class="flex flex-wrap pb-4">
                                <img v-for="image in games.images" :class="['', 'w-1/2', 'h-1/2', 'p-1']" :src="'./assets/' + image" alt="image" />
                            </div>
                        </ul>
                    </div>
                    <div v-if="route.path === '/resume'">
                        <vue-pdf-app style="height: 80vh" :pdf="'/assets/resume/CV_Julien_Augugliaro_FR.pdf'" page-scale="page-height" :config="{ toolbarViewerLeft: false }"></vue-pdf-app>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

import VuePdfApp from "vue3-pdf-app";
import "vue3-pdf-app/dist/icons/main.css";

const route = useRoute();
const router = useRouter();

const isMainMenu = ref(true);
const mainMenuExpanded = ref(false);

const notExpandedStyle = ref(["border", "border-white", "w-1/4", "h-1/4", "p-1", "transition-all"]);

const expandedStyle = ref(["border", "border-white", "w-3/4", "h-auto", "p-1", "transition-all"]);

onMounted(() => {
    console.log("Mounted");
    console.log(route.path);
});

watch(
    () => route.path,
    () => {
        if (route.path === "/") {
            isMainMenu.value = true;
            mainMenuExpanded.value = false;
        } else {
            isMainMenu.value = false;
            mainMenuExpanded.value = true;
        }
        if (route.path === "/index.html") {
            router.push("/");
        }
    }
);

const choiceList = ref([
    {
        name: "Github",
        path: "https://www.github.com/cram0",
        externalLink: true
    },
    {
        name: "Resume",
        path: "/resume",
        externalLink: false
    },
    {
        name: "Games",
        path: "/games",
        externalLink: false
    },
    {
        name: "Projects",
        path: "/projects",
        externalLink: false
    }
]);

const gameList = ref([
    {
        name: "my_hunter",
        images: ["hunter1.png", "hunter2.png"],
        expanded: false
    },
    {
        name: "my_defender",
        images: ["defender1.png", "defender2.png", "defender3.png", "defender4.png"],
        expanded: false
    },
    {
        name: "my_runner",
        images: ["runner1.png", "runner2.png", "runner3.png", "runner4.png"],
        expanded: false
    },
    {
        name: "my_rpg",
        images: ["rpg1.png", "rpg2.png", "rpg3.png", "rpg4.png", "rpgdbg1.png", "rpgdbg2.png"],
        expanded: false
    }
]);
</script>

<style>
@font-face {
    font-family: "Castlevania";
    src: url("/assets/font.ttf");
}

@keyframes breathing-select-red {
    from {
        background-color: rgb(150, 0, 0);
    }
    to {
        background-color: rgb(30, 0, 0);
    }
}

.breathing-select-red:hover {
    animation: 1s infinite alternate ease-out breathing-select-red;
}

body {
    font-family: "Castlevania", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: grayscale;
    background-image: linear-gradient(180deg, rgba(2, 0, 36, 1) 0%, rgba(0, 0, 32, 1) 11%, rgba(65, 65, 150, 1) 100%);
    background-attachment: fixed;
}
</style>
