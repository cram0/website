<template>
    <div>
        <div id="center-box" :class="['flex', 'justify-center', 'items-center', 'transition-all', mainMenuExpanded ? 'pt-4' : 'pt-56']">
            <div :class="[mainMenuExpanded ? expandedStyle : notExpandedStyle]">
                <ul class="text-white breathing-select-red">
                    <router-link v-if="!isMainMenu" :to="{ path: '/' }" @click.prevent="shouldCollapseGames(route.path)" class="block">
                        {{ "-- Go back" }}
                    </router-link>
                </ul>
                <ul v-if="isMainMenu" v-for="choice in choiceList" class="text-white breathing-select-red text-center w-">
                    <router-link v-if="!choice.externalLink" :to="{ path: choice.path }" @click="isMainMenu = !isMainMenu" class="block">{{ choice.name }}</router-link>
                    <a v-else :href="choice.path" target="_blank" rel="noopener noreferrer" class="block">{{ choice.name }}</a>
                </ul>

                <div v-if="mainMenuExpanded">
                    <div v-if="route.path === '/games'" class="flex flex-col items-center">
                        <ul v-for="game in gameList">
                            <div class="flex justify-center pb-4">
                                <label class="text-base text-white">
                                    {{ game.name + "&nbsp;" }}
                                </label>
                                <label v-if="!game.expanded" class="text-base text-white hover:cursor-pointer breathing-select-red" @click.prevent="game.expanded = !game.expanded">
                                    {{ "<Expand>" }}
                                </label>
                                <label v-else class="text-base text-white hover:cursor-pointer breathing-select-red" @click.prevent="game.expanded = !game.expanded">
                                    {{ ">Collapse<" }}
                                </label>
                            </div>
                            <div v-if="game.expanded" class="flex flex-wrap p-1">
                                <img v-for="image in game.images" class="md:w-1/2 p-2" :src="'./assets/' + image" alt="image" rel="preload" />
                            </div>
                        </ul>
                    </div>
                    <div v-if="route.path === '/resume'">
                        <div class="flex justify-center items-center divide-x p-1">
                            <label v-for="language in resumeList" class="block text-sm sm:text-sm md:text-base lg:text-lg text-white hover:cursor-pointer breathing-select-red p-1" @click.prevent="selectResumeLanguage(language.name)">
                                {{ language.name }}
                            </label>
                        </div>
                        <embed v-if="resumeList.find((e) => e.name === 'ENGLISH').selected == true" :src="englishResume" type="application/pdf" style="height: 100vh; width: 100%" />
                        <embed v-else :src="frenchResume" type="application/pdf" style="height: 100vh; width: 100%" />
                    </div>
                </div>
            </div>
            <img src="/assets/statue.png" style="position: fixed; bottom: 0; right: 0; max-width: 99%; max-height: 99%" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

import frenchResume from "/assets/CV_Julien_Augugliaro_FR.pdf"
import englishResume from "/assets/CV_Julien_Augugliaro_EN.pdf"

const route = useRoute();
const router = useRouter();

const isMainMenu = ref(true);
const mainMenuExpanded = ref(false);

const notExpandedStyle = ref(["border", "border-white", "w-1/4", "h-1/4", "p-1", "transition-all"]);

const expandedStyle = ref(["border", "border-white", "w-3/4", "h-auto", "p-1", "transition-all"]);

const shouldCollapseGames = (path) => {
    if (path === "/games") {
        gameList.value.forEach((game) => {
            game.expanded = false;
        });
    }
};

const selectResumeLanguage = (name) => {
    resumeList.value.forEach((language) => {
        if (language.name === name) {
            language.selected = true;
        } else {
            language.selected = false;
        }
    });
};

const resumeList = ref([
    {
        name: "FRANCAIS",
        selected: true
    },
    {
        name: "ENGLISH",
        selected: false
    }
]);

onMounted(() => {

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
    font-smooth: never;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: grayscale;
    background-image: linear-gradient(180deg, rgba(2, 0, 36, 1) 0%, rgba(0, 0, 32, 1) 11%, rgba(65, 65, 150, 1) 100%);
    background-attachment: fixed;
}
</style>
