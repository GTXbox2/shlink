<template>
  <header>
    <a id="logo" href=""></a>
    <a @click="openLinksWindow" id="links">My links</a>
    <Modal></Modal>
  </header>
</template>

<script>
import Modal from './Modal'

export default {
  name: 'Header',
  data: function() {
    return {
      isModalOpened: true,
    }
  },
  methods: {
    openLinksWindow: function() {
      this.$root.$emit('openModal');
    }
  },
  components: {
    Modal
  }
}
</script>

<style>
header {
  position: fixed;
  top: 0px;
  left: 0px;
  width: calc(100% - 48px);
  padding: 24px;
  background-color: white;
}
#logo {
  width: 100px;
  height: 30px;
  background: url('../assets/logo.svg') no-repeat;
  background-size: cover;
  display: inline-block;
  float: left;
  transition: .25s;
}
#logo:hover {
  opacity: .8;
  transition: .25s;
}
#links {
  display: inline-block;
  vertical-align: middle;
  float: right;
  cursor: pointer;
  font-weight: bold;
  color: #42b983;
}
#links::after {
  display: block;
  margin: auto;
  width: 0px;
  height: 2px;
  background-color: #42b983;
  border-radius: 3px;
  content: "";
  transition: .25s;
}
#links:hover::after {
  width: 100%;
  transition: .25s;
}
</style>
