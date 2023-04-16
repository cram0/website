<template>
    <div :class="getPixellatedFont()">
        <div id="center-box" :class="['flex', 'justify-center', 'items-center', 'transition-all', setMainMenuSizeBasedOnPage()]">
            <div :class="[mainMenuExpanded ? expandedStyle : notExpandedStyle]">
                <ul class="breathing-select-red">
                    <a v-if="!isMainMenu" @click.prevent="goBackButton()" @mouseenter="playSound('hover')" @mousedown="playSound('click')" class="block hover:cursor-pointer breathing-text">
                        {{ "-- " + t("back") }}
                    </a>
                </ul>
                <ul v-if="isMainMenu" v-for="choice in choiceList" class="breathing-select-red text-center" @mouseenter="playSound('hover')" @mousedown="playSound('click')">
                    <router-link v-if="!choice.externalLink" :to="{ path: choice.path }" @click="isMainMenu = !isMainMenu" class="block">{{ t(choice.name.toLowerCase()) + " " }}<img v-if="choice.icon" :src="'/assets/' + choice.icon" class="h-4 inline-block" /></router-link>
                    <a v-else :href="choice.path" rel="noopener noreferrer" class="block">{{ choice.name }}</a>
                </ul>

                <div v-if="mainMenuExpanded">
                    <div v-if="route.path.startsWith('/games')">
                        <div v-if="route.path.startsWith('/games/')">
                            <div v-for="game in gameList">
                                <div class="flex justify-center" v-if="route.path === '/games' + game.path">
                                    <h1 class="text-5xl pb-4 pl-4 pr-4">{{ game.name }}</h1>
                                </div>
                                <div class="flex justify-center pb-4" v-if="route.path === '/games' + game.path">
                                    <p class="">{{ game.description }}</p>
                                </div>
                                <div class="flex justify-center pb-4" v-if="game.repository && route.path === '/games' + game.path">
                                    {{ t("githubLink") + " --&nbsp;" }} <a :href="game.repository" target="_blank" rel="noopener noreferrer" class="hover:cursor-pointer breathing-select-red" @mouseenter="playSound('hover')" @mousedown="playSound('click')">{{ t("here") }}</a>
                                </div>
                                <div class="grid grid-cols-2 gap-4 pr-2 pl-2 pb-0.5">
                                    <img v-for="image in game.images" v-if="game.images && route.path === '/games' + game.path" :src="getImgurLinkPng(image)" class="" />
                                    <img v-for="gif in game.gifs" v-if="game.gifs && route.path === '/games' + game.path" :src="getImgurLinkGif(gif)" class="" />
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <h1 class="text-5xl text-center pb-4">{{ t("games") }}</h1>
                            <ul v-for="game in gameList" class="breathing-select-red text-center" @mouseenter="playSound('hover')" @mousedown="playSound('click')">
                                <router-link :to="{ path: '/games' + game.path }" class="block"> {{ game.name }}</router-link>
                            </ul>
                        </div>
                    </div>
                    <div v-if="route.path === '/resume'">
                        <div class="flex justify-center items-center divide-x p-1">
                            <label v-for="language in resumeList" class="block hover:cursor-pointer breathing-select-red p-1" @mouseenter="playSound('hover')" @mousedown="playSound('click')" @click.prevent="selectResumeLanguage(language.name)">
                                {{ language.name }}
                            </label>
                        </div>
                        <div class="bg-white">
                            <embed v-if="resumeList.find((e) => e.name === 'ENGLISH').selected == true" :src="englishResume" type="application/pdf" class="h-screen w-full max-sm:h-full max-sm:w-full" />
                            <embed v-else :src="frenchResume" type="application/pdf" class="h-screen w-full max-sm:h-full max-sm:w-full" />
                        </div>
                    </div>
                    <div v-if="route.path.startsWith('/projects')">
                        <div v-if="route.path.startsWith('/projects/')">
                            <div v-for="project in projectList">
                                <div class="flex justify-center" v-if="route.path === '/projects' + project.path">
                                    <h1 class="text-5xl pb-4">{{ project.name }}</h1>
                                </div>
                                <div class="flex justify-center pb-4" v-if="route.path === '/projects' + project.path">
                                    <p class="">{{ project.description }}</p>
                                </div>
                                <div class="flex justify-center pb-4" v-if="project.repository && route.path === '/projects' + project.path">
                                    {{ "Github link --&nbsp;" }} <a :href="project.repository" target="_blank" rel="noopener noreferrer" class="hover:cursor-pointer breathing-select-red" @mouseenter="playSound('hover')" @mousedown="playSound('click')">{{ t("here") }}</a>
                                </div>
                                <div class="grid grid-cols-2 gap-4 pr-2 pl-2 pb-0.5">
                                    <img v-for="image in project.images" v-if="project.images && route.path === '/projects' + project.path" :src="getImgurLinkPng(image)" class="" />
                                    <img v-for="gif in project.gifs" v-if="project.gifs && route.path === '/projects' + project.path" :src="getImgurLinkGif(gif)" class="" />
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <h1 class="text-5xl text-center pb-4">{{ t("projects") }}</h1>
                            <ul v-for="project in projectList">
                                <div class="breathing-select-red text-center" @mouseenter="playSound('hover')" @mousedown="playSound('click')">
                                    <router-link class="block" :to="{ path: '/projects' + project.path }"> {{ project.name }}</router-link>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div v-if="route.path === '/contact'">
                        <h1 class="text-5xl text-center pb-4">{{ "Contact" }}</h1>
                        <p>{{ "Email : j.augugliaro[at]outlook.fr" }}</p>
                    </div>
                    <div v-if="route.path === '/settings'">
                        <div class="grid gap-4">
                            <h1 class="text-5xl text-center">{{ t("settings") }}</h1>
                            <div v-for="setting in accessibilitySettingsList" class="flex flex-row items-center">
                                {{ "&nbsp;" }}
                                <img class="hover:cursor-pointer" @mousedown="playSound('click')" :src="getButtonBasedOnState(setting.selected)" @click.prevent="toggleAccessibilitySetting(setting)" />
                                {{ "&nbsp;" + t(setting.name) }}
                            </div>
                        </div>
                    </div>
                    <div v-if="route.path.startsWith('/blog')">
                        <div v-if="route.path.startsWith('/blog/')">
                            <div v-for="post in blogArticleList">
                                <div class="flex flex-col p-2" v-if="route.path === '/blog' + post.path">
                                    <p class="text-5xl text-center">{{ post.name }}</p>
                                    <p class="text-lg text-center">{{ post.author }}</p>

                                    <Markdown v-if="articleLoaded" :source="articleSource" />
                                    <p v-else>{{ "Article loading ..." }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <ul v-for="post in blogArticleList">
                                <div
                                    class="flex flex-row justify-between breathing-select-red hover:cursor-pointer text-center pr-2 pl-2"
                                    @mouseenter="playSound('hover')"
                                    @mousedown="playSound('click')"
                                    @click.prevent="
                                        router.push({ path: '/blog' + post.path });
                                        readContentFromArticle('/articles/' + post.articleName);
                                    "
                                >
                                    <p>{{ post.name }}</p>
                                    <i class="block">{{ post.date }}</i>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <img src="/assets/statue.png" class="statue" />
        <div class="flex flex-row items-end fixed bottom-0 left-0 pl-1 pb-1">
            <img v-for="locale in i18n.availableLocales" :src="'/' + locale + '.svg'" :alt="locale" class="w-8 p-0.5 hover:cursor-pointer" @mouseenter="playSound('hover')" @mousedown="playSound('click')" @click.prevent="setLocale(locale)" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

import Markdown from "vue3-markdown-it";

import frenchResume from "/assets/CV_Julien_Augugliaro_FR.pdf";
import englishResume from "/assets/CV_Julien_Augugliaro_EN.pdf";

import onButton from "/assets/on.png";
import offButton from "/assets/off.png";

import hoverSound from "/assets/hover.ogg";
import clickSound from "/assets/click.ogg";

import { useI18n } from "vue-i18n";

const route = useRoute();
const router = useRouter();

const isMainMenu = ref(true);
const mainMenuExpanded = ref(false);

const notExpandedStyle = ref(["border", "border-white", "w-1/4", "p-1", "transition-all", "min-w-fit", "min-h-fit"]);

const expandedStyle = ref(["border", "border-white", "w-3/4", "transition-all"]);

const i18n = useI18n({
    locale: "en",
    fallbackLocale: "en",
    messages: {
        en: {
            home: "Home",
            resume: "Resume",
            projects: "Projects",
            games: "Games",
            blog: "Blog",
            contact: "Contact",
            settings: "Settings",
            sounds: "Sounds",
            here: "Here",
            pixellatedFont: "Pixellated font",
            githubLink: "Github link",
            workInProgress: "Work in progress ..",
            back: "Go back"
        },
        fr: {
            home: "Accueil",
            resume: "CV",
            projects: "Projets",
            games: "Jeux",
            blog: "Blog",
            contact: "Contact",
            settings: "Options",
            sounds: "Sons",
            here: "Ici",
            pixellatedFont: "Police pixellisee",
            githubLink: "Lien Github",
            workInProgress: "Travail en cours ..",
            back: "Retour"
        }
    }
});

const { t } = i18n;
i18n.locale.value = "fr";

const articleLoaded = ref(false);
const articleSource = ref("");
const readContentFromArticle = async (path) => {
    articleLoaded.value = false;
    articleSource.value = await (await fetch(path)).text();
    articleLoaded.value = true;
};

const setLocale = (locale) => {
    i18n.locale.value = locale;
    localStorage.setItem("locale", locale);
};

const playSound = (soundName) => {
    if (localStorage.getItem("sounds") === "false") {
        return;
    } else {
        if (soundList.value.find((e) => e.name === soundName)) {
            const sound = new Audio(soundList.value.find((e) => e.name === soundName).source);
            sound.volume = 0.1;
            sound.play();
        }
    }
};

const getPixellatedFont = () => {
    if (localStorage.getItem("pixellatedFont") === "true") {
        return "pixellated-font";
    } else {
        return "";
    }
};

const getButtonBasedOnState = (state) => {
    if (state) {
        return onButton;
    } else {
        return offButton;
    }
};

const toggleAccessibilitySetting = (setting) => {
    setting.selected = !setting.selected;
    if (setting.name === "pixellatedFont") {
        localStorage.setItem("pixellatedFont", setting.selected);
    }
    if (setting.name === "sounds") {
        localStorage.setItem("sounds", setting.selected);
    }
};

const getImgurLinkPng = (code) => {
    return "https://i.imgur.com/" + code + ".png";
};

const getImgurLinkGif = (code) => {
    return "https://i.imgur.com/" + code + ".gif";
};

const goBackButton = () => {
    router.go(-1);
};

const setMainMenuSizeBasedOnPage = () => {
    if (route.path.startsWith("/games/")) {
        return "pt-8";
    }
    if (route.path.startsWith("/projects/")) {
        return "pt-8";
    }
    if (mainMenuExpanded.value) {
        return "pt-4";
    } else {
        return "pt-24";
    }
};

const selectResumeLanguage = (name) => {
    resumeList.value.forEach((language) => {
        if (language.name === name) {
            language.selected = true;
        } else {
            language.selected = false;
        }
        localStorage.setItem("resumeLanguage", name);
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
    // Sets the resume language to the one stored in local storage
    if ((localStorage.getItem("resumeLanguage") && localStorage.getItem("resumeLanguage") === "ENGLISH") || localStorage.getItem("resumeLanguage") === "FRANCAIS") {
        selectResumeLanguage(localStorage.getItem("resumeLanguage"));
    } else {
        localStorage.setItem("resumeLanguage", "FRANCAIS");
    }

    // Sets the pixellated font to the one stored in local storage
    if (localStorage.getItem("pixellatedFont")) {
        if (localStorage.getItem("pixellatedFont") === "true") {
            localStorage.setItem("pixellatedFont", true);
            accessibilitySettingsList.value.find((setting) => setting.name === "pixellatedFont").selected = true;
        } else if (localStorage.getItem("pixellatedFont") === "false") {
            localStorage.setItem("pixellatedFont", false);
            accessibilitySettingsList.value.find((setting) => setting.name === "pixellatedFont").selected = false;
        } else {
            localStorage.setItem("pixellatedFont", true);
        }
    } else {
        localStorage.setItem("pixellatedFont", true);
    }

    // Sets the sounds to the one stored in local storage
    if (localStorage.getItem("sounds")) {
        if (localStorage.getItem("sounds") === "true") {
            localStorage.setItem("sounds", true);
            accessibilitySettingsList.value.find((setting) => setting.name === "sounds").selected = true;
        } else if (localStorage.getItem("sounds") === "false") {
            localStorage.setItem("sounds", false);
            accessibilitySettingsList.value.find((setting) => setting.name === "sounds").selected = false;
        } else {
            localStorage.setItem("sounds", true);
        }
    } else {
        localStorage.setItem("sounds", true);
    }

    // Sets the locale to the one stored in local storage
    if (localStorage.getItem("locale")) {
        if (localStorage.getItem("locale") === "fr") {
            setLocale("fr");
        } else if (localStorage.getItem("locale") === "en") {
            setLocale("en");
        } else {
            setLocale("en");
        }
    } else {
        setLocale("en");
    }
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

const accessibilitySettingsList = ref([
    {
        name: "pixellatedFont",
        selected: true
    },
    {
        name: "sounds",
        selected: true
    }
]);

const soundList = ref([
    {
        name: "hover",
        source: hoverSound
    },
    {
        name: "click",
        source: clickSound
    }
]);

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
        name: "Blog",
        path: "/blog",
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
    },
    {
        name: "Contact",
        path: "/contact",
        externalLink: false
    },
    {
        name: "Settings",
        path: "/settings",
        externalLink: false,
        icon: "gear.svg"
    }
]);

const gameList = ref([
    {
        name: "my_hunter",
        images: ["kZOlUwb", "AUUs4Gu"],
        expanded: false,
        description: "A simple game where you have to shoot the bats that appear on the screen.",
        repository: "https://github.com/cram0/my_hunter_2019",
        path: "/hunter"
    },
    {
        name: "my_defender",
        images: ["XJqaBT6", "XUvzQ0B", "l2yjcwz", "huGYc5f"],
        expanded: false,
        description: "A simple tower defense game where you have to defend yourself from the enemies that appear on the screen.",
        repository: "https://github.com/cram0/my_defender_2019",
        path: "/defender"
    },
    {
        name: "my_runner",
        images: ["68JHW56", "rxrsvgv", "fYHNp5A", "l9ptsSk"],
        expanded: false,
        description: "A simple runner game where you have to avoid the obstacles that appear on the screen.",
        repository: "https://github.com/cram0/my_runner_2019",
        path: "/runner"
    },
    {
        name: "my_rpg",
        images: ["4D3bYQN", "8sqU2FZ", "X8s83Fn", "wP4qO3V", "xInvYe5", "ANpS6AU"],
        gifs: ["lYSPS2P", "TVUzolr", "9wS8M3x", "HP0eN7y", "bl2RWgi", "WY7gG1m", "7CHtu2W", "NYDglF9", "wNNVTzU"],
        expanded: false,
        description: "A simple RPG game where you have to fight the enemies that appear on the screen.",
        repository: "https://github.com/cram0/my_rpg_2019",
        path: "/rpg"
    },
    {
        name: "arcade",
        expanded: false,
        description: "Simulation of an arcade machine made in C++ using SDL2, SFML and ncurses libraries.",
        repository: "https://github.com/cram0/arcade_2020",
        path: "/arcade"
    }
]);

const projectList = ref([
    {
        name: "zia",
        expanded: false,
        description: "HTTP(S) server running on both Windows and Linux",
        repository: "https://github.com/cram0/zia",
        path: "/zia"
    },
    {
        name: "plazza",
        expanded: false,
        description: "Program that simulates a pizzeria with kitchen(processes) with cooks(threads) and FIFO files to make them communicate between eachother",
        repository: "https://github.com/cram0/plazza",
        path: "/plazza"
    },
    {
        name: "minilibC",
        expanded: false,
        description: "Implementation of the libc functions in Assembly language with NASM",
        repository: "https://github.com/cram0/minilibC",
        path: "/minilibc"
    },
    {
        name: "Game of Life",
        expanded: false,
        description: "A simple game based on John Conway's Game of Life",
        repository: "https://github.com/cram0/Game_of_Life",
        path: "/game_of_life"
    }
]);

// Articles should be hosted on a server
const blogArticleList = ref([
    {
        name: "How to create a simple game in C++ using SFML",
        articleName: "test.md",
        date: "2023/04/15",
        author: "cram",
        path: "/how-to-create-a-simple-game-in-cpp-using-sfml"
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
    font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 20px;
    color: white;
    background-image: linear-gradient(180deg, rgba(2, 0, 36, 1) 0%, rgba(0, 0, 32, 1) 11%, rgba(65, 65, 150, 1) 100%);
    background-attachment: fixed;
}

.pixellated-font {
    font-family: "Castlevania";
    font-size: 16px;
}

.statue {
    position: fixed;
    bottom: 0;
    right: 0;
    max-width: 100%;
    max-height: 100%;
}
</style>
