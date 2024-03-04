<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MSOIcon from '@/components/icons/MSOIcon.vue'
import IconLogo from './components/icons/IconLogo.vue'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/"><IconLogo/> Home</RouterLink>
      <RouterLink to="/name"><MSOIcon>signature</MSOIcon> Name</RouterLink>
      <RouterLink to="/timer"><MSOIcon>timer</MSOIcon> Timer</RouterLink>
      <RouterLink to="/countdown"><MSOIcon>avg_pace</MSOIcon> Countdown</RouterLink>
    </nav>
  </header>

  <main>
    <Suspense>
      <RouterView />
    </Suspense>
  </main>

  <footer>
    <span class="copyright">
      &copy; Melskaaja {{ new Date().getFullYear() }}
    </span>
  </footer>
</template>

<style scoped lang="scss">
@import '@/assets/css/app-vars';

header {
  width: 100%;
  margin-bottom: 1em;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--oae-color-dark-gray);
}

nav {
  font-family: var(--oae-font-narrow);
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  text-align: center;
  
  a {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    border-left: 1px solid var(--oae-dark-green);
    font-size: 1.2em;
    text-decoration: none;
    gap: 0.3em;

    &:first-of-type {
      border-left: 0;
    }

    &.router-link-exact-active {
      color: var(--oae-light-green);

      &:hover {
        background-color: transparent;
      }
    }
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 2em;
  }
  
  svg {
    width: 30px;
    height: 30px;
  }
}

:not(.overlay) > #app > main {
  max-width: $respo-xl;
  margin: 0 auto;
  padding: 0 2rem;
  flex: 1;
}

footer {
  width: 100%;
  min-height: 6em;
  margin-top: 2em;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--oae-color-dark-gray);
  text-align: center;

  > * {
    max-width: $respo-xl;
  }

  span {
    font-family: var(--oae-font-narrow);
  }
}
</style>
