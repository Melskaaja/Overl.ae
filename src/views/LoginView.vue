<script setup>
import { useNhostClient } from '@nhost/vue'
import IconDiscord from '@/components/icons/IconDiscord.vue'
import IconTwitch from '@/components/icons/IconTwitch.vue'

const { nhost } = useNhostClient();

const doDiscordLogin = () => {
  nhost.auth.signIn({ provider: 'discord' });
}

const doTwitchLogin = () => {
  nhost.auth.signIn({ provider: 'twitch' });
}
</script>

<template>
  <section>
    <h1>Login</h1>

    <button type="button" class="login-button" v-on:click="doDiscordLogin()">
      <IconDiscord /> Via Discord
    </button>
    <button type="button" class="login-button" v-on:click="doTwitchLogin()">
      <IconTwitch /> Via Twitch
    </button>

  </section>
</template>

<style lang="scss">
.login-button {
  width: 300px;
  display: flex;
  gap: 10px;
  padding: 0.4em !important;

  svg {
    width: 30px;
    height: 30px;
  }

  svg[aria-label="Discord"] { 
    fill: #5865f2; 
  }
  svg[aria-label="Twitch"] {
    path { fill: #6441a4; }
    polygon { display: none; }
  }
}
</style>
