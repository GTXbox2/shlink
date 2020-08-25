<template>
  <div id="app">
    <Header></Header>
    <Body></Body>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Body,
    Footer
  }
}
</script>

<style>
table, tr, td {
  border-spacing: 0px;
}
.link:hover {
  text-decoration: underline;
}
::placeholder {
  font-size: 16px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: calc(100% - 66px);
}
body, html {
  margin: 0px;
  height: 100%;
  -webkit-tap-highlight-color: transparent;
}
</style>
