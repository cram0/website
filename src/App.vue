<template>
    <div>
        <div id="center-box" :class="['flex', 'justify-center', 'items-center', 'transition-all', setMainMenuSizeBasedOnPage()]">
            <div :class="[mainMenuExpanded ? expandedStyle : notExpandedStyle]">
                <ul class="breathing-select-red">
                    <a v-if="!isMainMenu" @click.prevent="goBackButton()" class="block hover:cursor-pointer breathing-text">
                        {{ "-- Go back" }}
                    </a>
                </ul>
                <ul v-if="isMainMenu" v-for="choice in choiceList" class="breathing-select-red text-center">
                    <router-link v-if="!choice.externalLink" :to="{ path: choice.path }" @click="isMainMenu = !isMainMenu" class="block">{{ choice.name }}</router-link>
                    <a v-else :href="choice.path" target="_blank" rel="noopener noreferrer" class="block">{{ choice.name }}</a>
                </ul>

                <div v-if="mainMenuExpanded">
                    <div v-if="route.path.startsWith('/games')" class="flex flex-col items-center">
                        <div v-if="route.path.startsWith('/games/')">
                            <div v-for="game in gameList" class="grid grid-cols-2 gap-4">
                                <div class="flex justify-center" v-if="route.path === '/games' + game.path">
                                    <h1 class="text-xl pb-2">{{ game.name }}</h1>
                                </div>
                                <div class="flex justify-center" v-if="route.path === '/games' + game.path">
                                    <p class="">{{ game.description }}</p>
                                </div>
                                <img v-for="image in game.images" v-if="route.path === '/games' + game.path" :src="getImgurLinkPng(image)" class="" />
                                <img v-for="gif in game.gifs" v-if="game.gifs && route.path === '/games' + game.path" :src="getImgurLinkGif(gif)" class="" />
                            </div>
                        </div>
                        <div v-else>
                            <ul v-for="game in gameList">
                                <div class="flex justify-center">
                                    <router-link class="hover:cursor-pointer breathing-select-red" :to="{ path: '/games' + game.path }"> {{ game.name }}</router-link>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div v-if="route.path === '/resume'">
                        <div class="flex justify-center items-center divide-x p-1">
                            <label v-for="language in resumeList" class="block hover:cursor-pointer breathing-select-red p-1" @click.prevent="selectResumeLanguage(language.name)">
                                {{ language.name }}
                            </label>
                        </div>
                        <embed v-if="resumeList.find((e) => e.name === 'ENGLISH').selected == true" :src="englishResume" type="application/pdf" style="height: 100vh; width: 100%" />
                        <embed v-else :src="frenchResume" type="application/pdf" style="height: 100vh; width: 100%" />
                    </div>
                </div>
            </div>
            <img src="/assets/statue.png" style="position: fixed; bottom: 0; right: 0; max-width: 100%; max-height: 100%" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

import frenchResume from "/assets/CV_Julien_Augugliaro_FR.pdf";
import englishResume from "/assets/CV_Julien_Augugliaro_EN.pdf";

const route = useRoute();
const router = useRouter();

const isMainMenu = ref(true);
const mainMenuExpanded = ref(false);

const notExpandedStyle = ref(["border", "border-white", "w-1/4", "h-1/4", "p-1", "transition-all"]);

const expandedStyle = ref(["border", "border-white", "w-3/4", "h-auto", "p-1", "transition-all"]);

const getImgurLinkPng = (code) => {
    return "https://i.imgur.com/" + code + ".png";
};

const getImgurLinkGif = (code) => {
    return "https://i.imgur.com/" + code + ".gif";
};

const goBackButton = () => {
    if (route.path.startsWith("/games/")) {
        router.push("/games");
    } else {
        router.push("/");
    }
};

const setMainMenuSizeBasedOnPage = () => {
    if (route.path.startsWith("/games/")) {
        return "pt-8";
    }
    if (mainMenuExpanded.value) {
        return "pt-4";
    } else {
        return "pt-56";
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

onMounted(() => {});

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
        images: ["kZOlUwb", "AUUs4Gu"],
        expanded: false,
        description: "A simple game where you have to shoot the bats that appear on the screen.",
        path: "/hunter"
    },
    {
        name: "my_defender",
        images: ["XJqaBT6", "XUvzQ0B", "l2yjcwz", "huGYc5f"],
        expanded: false,
        description: "A simple tower defense game where you have to defend yourself from the enemies that appear on the screen.",
        path: "/defender"
    },
    {
        name: "my_runner",
        images: ["68JHW56", "rxrsvgv", "fYHNp5A", "l9ptsSk"],
        expanded: false,
        description: "A simple runner game where you have to avoid the obstacles that appear on the screen.",
        path: "/runner"
    },
    {
        name: "my_rpg",
        images: ["4D3bYQN", "8sqU2FZ", "X8s83Fn", "wP4qO3V", "xInvYe5", "ANpS6AU"],
        gifs: ["lYSPS2P", "TVUzolr", "9wS8M3x", "HP0eN7y", "bl2RWgi", "WY7gG1m", "7CHtu2W", "NYDglF9", "wNNVTzU"],
        expanded: false,
        description: "A simple RPG game where you have to fight the enemies that appear on the screen.",
        path: "/rpg"
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

@keyframes breathing-text {
    from {
        color: rgb(0, 0, 150);
    }
    to {
        color: rgb(0, 0, 30);
    }
}

.breathing-select-red:hover {
    animation: 1s infinite alternate ease-out breathing-select-red;
}

body {
    font-family: "Castlevania", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 16px;
    color: white;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: grayscale;
    background-image: linear-gradient(180deg, rgba(2, 0, 36, 1) 0%, rgba(0, 0, 32, 1) 11%, rgba(65, 65, 150, 1) 100%);
    background-attachment: fixed;
}
</style>
