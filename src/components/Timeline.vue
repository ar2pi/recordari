<template>
  <md-theme md-name="recordari">
    <div class="doc-content-wrapper full-height">
      <router-link tag="md-button"
                   to="/"
                   class="md-raised md-primary md-fab md-fab-top-right">
        <md-icon>home</md-icon>
      </router-link>
      <iframe
        src='https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1rbeTxxdMRRrhj__4VfTMxOj4AC4nxw6tHvxkAKgtmYU&font=Default&lang=en&initial_zoom=2&height=650'
        width='100%'
        height='100%'
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen
        frameborder='0'></iframe>
    </div>
  </md-theme>
</template>

<script>
  export default {
    name: 'ap-timeline'
  }
</script>

<style>
  iframe {
    height: 100% !important;
  }

  .doc-content-wrapper {
    background-color: #f9f9f9;
  }
</style>
