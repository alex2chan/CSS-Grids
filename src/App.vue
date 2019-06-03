<template>
  <div id="app">
    <h1 class="mb-5 text-info text-center">Playing with CSS Grids</h1>
    <CssGrids></CssGrids>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
    CssGrids: () => import("./components/CssGrids")
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background-color: inherit;
  margin: 2rem;
  height: 100%;
}
</style>
