<template>
<form v-on:submit.prevent="onSubmit">
  <input type="text" v-model="city" placeholder="Enter name of city here" />
  <button type="submit">Search</button>
</form>
</template>

<script src="./script.js"></script>
<style scoped src="./style.css"></style>