<script setup>
import IconTwitch from '@/components/icons/IconTwitch.vue'
import IconYoutube from '@/components/icons/IconYoutube.vue'
import { createVNode, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const $route = useRouter().currentRoute.value;

let pronouns = '';

if ($route.params) {
  if ($route.params.pronouns) {
    // streamlabs doesn't know what replaceAll is
    let parts = $route.params.pronouns?.toUpperCase().split('-');
    pronouns = parts.join('/');
  }
}

let position = 'tl';
let service = createVNode('span');

if ($route.query) {
  if ($route.query.p) {
    // default to top left
    position = $route.query.p ?? 'tl';
  }
  if ($route.query.s) {
    if ($route.query.s == 'yt') {
      service = IconYoutube;
    } else if ($route.query.s == 'tw') {
      service = IconTwitch;
    }
  }
}

onMounted(() => {
  window.document.body.classList.add('overlay');
  window.document.body.classList.add(position);
});
</script>


<template>
  <span class="main">
    <span class="service"><service /></span>
    <span class="username">{{ $route.params.username }}</span>
    <span class="pronouns">{{ pronouns }}</span>
  </span>
</template>


<style lang="scss">
.main {
  display: flex;
  align-items: baseline;
  text-shadow: 0 0 8px var(--oae-color-white);

  .service {
    margin-right: 0.2em;

    svg {
      width: 7.5vh;
      height: 7.5vh;

      filter: drop-shadow(0 0 3px var(--oae-color-white));

      polygon,
      .oae-white {
        fill: var(--oae-color-white);
      }
      path {
        fill: var(--oae-color-dark-gray);
      }
    }
  }

  .username {
    line-height: .75em;
  }
  .pronouns {
    margin-left: 0.3em;
    font-size: .73em;
    -webkit-text-stroke-width: 0.35vh;
  }
}
</style>
