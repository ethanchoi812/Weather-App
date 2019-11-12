<template>
<div>
  <button v-on:click="toggleTemp('c')" v-bind:class="{ active: scale === 'c' }">C</button>
  <button v-on:click="toggleTemp('f')" v-bind:class="{ active: scale === 'f' }">F</button>
</div>
</template>

<script src="./script.js"></script>
<style scoped src="./style.css"></style>