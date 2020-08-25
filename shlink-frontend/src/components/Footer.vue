<template>
  <footer>
    <a id="github" target="_blank" class="footer-link link" href="https://github.com/musicchenko/shlink">GitHub</a>
    <a target="_blank" class="footer-link link" href="https://www.termsofusegenerator.net/live.php?token=rtYTfHPYz5AC4mBNxotaUGaXusGiMabK">Terms of use</a>
    <!--<a id="author" class="footer-link">Created by Dmitry Muzychenko</a>-->
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
footer {
  padding: 24px;
  width: calc(100% - 48px);
  text-align: left;
}
#github {
  background: url('../assets/github.svg') no-repeat;
  background-size: 16px;
  background-position: left center;
  padding-left: 20px;
}
#author {
  float: right;
  display: inline-block;
}
.footer-link {
  width: auto;
  height: auto;
  display: inline-block;
  color: #34495e;
  font-weight: bold;
  text-decoration: none;
}
.footer-link:not(:last-child) {
  padding-right: 24px;
}
</style>
