<template>
  <main>
    <div id="main-wrapper">
      <article id="about">Shlink.org is a free and easy tool to shorten URLs. Create short links in seconds.</article>
      <form v-on:submit.prevent id="shortener-form">
        <input v-model="link" id="link-field" maxlength="4096" placeholder="Put link here" required/>
        <div id="btns-block">
          <button @click="makeShortRequest" class="green-btn" type="submit">Make short</button>
          <button @click="makeUnshortRequest" id="mk-unshort" class="green-btn" type="submit">Make unshort</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'Body',
  data: function() {
    return {
      link: ''
    }
  },
  methods: {
    makeShortRequest: function() {
      if(this.link.trim()) {
        let queryAddress = location.href + "generate?link=" + this.link;
        let resultFunc = function(response) {
          console.log(response);
          let temp = localStorage.links ? JSON.parse(localStorage.links) : {};
          temp[response.data] = this.link;
          localStorage.links = JSON.stringify(temp);
          this.$root.$emit('openModal');
        }
        Axios.post(queryAddress).then(resultFunc.bind(this));
      }
    },
    makeUnshortRequest: function() {
      if(this.link.trim()) {
        let queryAddress = location.href + "check?link=" + this.link;
        let resultFunc = function(response) {
          console.log(response);
          alert(response.data || "Link not found");
        }
        Axios.post(queryAddress).then(resultFunc.bind(this));
      }
    }
  }
}
</script>

<style>
#about {
  color: #34495e;
  font-size: 20px;
  font-weight: bold;
  padding: 20px 25px;
  line-height: 30px;
}
#btns-block {
  margin: auto;
  margin-top: 20px;
  width: 500px;
}
main {
  width: 100%;
  height: 100%;
  padding-top: 78px;
  display: table;
}
#main-wrapper {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
#shortener-form {
  display: block;
  text-align: center;
}
.green-btn {
  width: 100%;
  display: block;
  outline: none;
  padding: 20px 15px;
  border: 0px;
  background-color: #42b983;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin: auto;
  transition: .25s;
}
.green-btn:hover {
  /*opacity: .9;*/
  background-color: #5dc990;
  transition: .25s;
}
#mk-unshort {
  border: 2px solid #42b983;
  color: #42b983;
  background-color: transparent;
}
#mk-unshort:hover {
  border-color: #5dc990;
  color: #5dc990;
}
#link-field {
  width: calc(500px - 34px);
  display: block;
  padding: 20px 15px;
  outline: none;
  border: 2px solid #42b983;
  font-size: 16px;
  margin: auto;
}
@media  (max-width: 1199px) {
  #link-field {
    width: calc(300px - 34px);
  }
  #btns-block {
    width: 300px;
  }
}
</style>
