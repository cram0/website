<template>
	<div>
		<div id="center-box" class="flex justify-center items-center h-60">
			<div class="border border-gray-400 w-auto h-auto p-1">
				<ul>
					<a class="text-white breathing-select-red">Test</a>
				</ul>
				<ul>
					<a class="text-white breathing-select-red">Test</a>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
const msg = "Hello!";
const isExpanded = ref(true);

function log() {
	console.log(msg);
}
</script>

<style>
@font-face {
	font-family: "Castlevania";
	src: url("/src/assets/font.ttf");
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

.is-expanded {
}

body {
	font-family: "Castlevania", -apple-system, BlinkMacSystemFont, "Segoe UI",
		Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
		sans-serif;
	-webkit-font-smoothing: none;
	-moz-osx-font-smoothing: grayscale;
	background-image: linear-gradient(
		180deg,
		rgba(2, 0, 36, 1) 0%,
		rgba(0, 0, 32, 1) 11%,
		rgba(65, 65, 150, 1) 100%
	);
	background-attachment: fixed;
}
</style>
