<template>
  <div id="modal" v-if="isModalOpened">
    <div v-if="clickedCopy" id="copied-block" :class="{'copied-slowing-down': !copiedAnimation, 'copied-slowing-up': copiedAnimation}">Copied</div>
    <div id="modal-wrapper" :class="{'modal-open': this.isModalOpened}">
      <div id="links-window">
        <h2 class="left-al">Links</h2>
        <div id="links-wrapper">
          <table v-if="Object.keys(linksList).length" id="links-table">
            <tr v-for="n in Object.keys(linksList).length" :key="n">
              <td>
                <div @click="copyLink(Object.keys(linksList)[n-1])" class="short-link-wrapper">{{ Object.keys(linksList)[n-1] }}</div>
              </td>
              <td align="right">
                <div class="link-wrapper">
                  <a
                    :href="linksList[Object.keys(linksList)[n-1]]"
                    :title="linksList[Object.keys(linksList)[n-1]]"
                    target="_blank">
                      {{ linksList[Object.keys(linksList)[n-1]] }}
                  </a>
                </div>
              </td>
            </tr>
          </table>
          <h4 v-else class="left-al" id="no-links-found">No links were found</h4>
        </div>
      </div>
      <button @click="closeModal" id="modal-close-btn" class="green-btn">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data: function() {
    return {
      isModalOpened: false,
      linksList: localStorage.links ? JSON.parse(localStorage.links) : {},
      clickedCopy: false,
      copiedAnimation: false
    }
  },
  methods: {
    openModal: function() {
      this.linksList = localStorage.links ? JSON.parse(localStorage.links) : {};
      this.isModalOpened = true;
    },
    closeModal: function() {
      this.isModalOpened = false;
      this.clickedCopy = false;
    },
    copyLink: function(link) {
      this.clickedCopy = true;
      this.copiedAnimation = true;
      navigator.clipboard.writeText(location.href + link);
      let stopAnimation = function() {
        this.copiedAnimation = false;
      }
      setTimeout(stopAnimation.bind(this), 2000);
    }
  },
  mounted: function () {
    this.$root.$on('openModal', () => {
      this.openModal();
    })
    this.$root.$on('closeModal', () => {
      this.closeModal();
    })
  }
}
</script>

<style>
#links-wrapper {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
.copied-slowing-up {
  animation: copied-up;
  animation-duration: .5s;
  animation-fill-mode: forwards;
}
.copied-slowing-down {
  animation: copied-down;
  animation-duration: .5s;
  animation-fill-mode: forwards;
}
@keyframes copied-up {
  0% {
    bottom: -58px;
  }
  100% {
    bottom: 0px;
  }
}
@keyframes copied-down {
  0% {
    bottom: 0px;
  }
  100% {
    bottom: -58px;
  }
}
.left-al {
  text-align: left;
}
#no-links-found {
  margin-bottom: 0px;
}
.modal-open {
  animation: modal-open-animation;
  animation-duration: .2s;
}
@keyframes modal-open-animation {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
#modal-close-btn {
  width: 348px;
}
#copied-block {
  width: 100%;
  background-color: black;
  color: white;
  font-weight: bold;
  margin: auto;
  padding: 20px 0px;
  bottom: 0px;
  position: fixed;
}
#links-table {
  width: 100%;
}
#links-table td {
  text-align: left;
  padding: 10px 0px;
  width: 50%;
}
.link-wrapper {
  text-overflow: ellipsis;
  max-width: 150px;
  overflow: hidden;
}
.link-wrapper a {
  color: #42b983
}
.short-link-wrapper {
  cursor: pointer;
  padding-left: 20px;
  background: url('../assets/copy.svg') no-repeat;
  background-size: 12px;
  background-position: left center;
}
/*#links-table tr:nth-child(2) td {
  background-color: #eaeaea;
}*/
#modal {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  display: table;
}
#modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
#links-window {
  background-color: white;
  width: 300px;
  margin: auto;
  padding: 6px 24px 24px;
}
</style>
