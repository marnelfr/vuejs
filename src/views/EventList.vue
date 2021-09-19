<template>
  <div>
    <h1>Event listing page</h1>
    <router-link :to="{ name: 'event-show', params: { id: 1 }}">Event show #1</router-link>
  </div>
</template>
