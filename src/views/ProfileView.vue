<script setup>
import MSOIcon from '@/components/icons/MSOIcon.vue'
import { useNhostClient } from '@nhost/vue'

const { nhost } = useNhostClient();
const db = async (query) => await nhost.graphql.request(query);

const userDefinedGroups = await db(`
query GetGroups {
  groups {
    id
    slug
    name
    group_timers {
      time
      position
      start
    }
    group_countdowns {
      time
      position
      start
    }
  }
}`); // TODO do something with timers and countdowns... and how to add them!
</script>

<template>
  <section>
    <h1>My Overlays</h1>

    <p><MSOIcon style="font-size: 100px">construction</MSOIcon></p>
    <p>This might take a while.</p>

    <div class="card" v-for="group in userDefinedGroups.data.groups" :key="group.id">
      <div class="card-header">
        {{ group.name }} &ndash; <em>{{ group.slug }}</em>
      </div>
      <div class="card-body">

        <div v-if="group.group_timers">There's {{group.group_timers.length }} timers!</div>
        <div v-else>No timers..</div>

        <div v-if="group.group_countdowns">There's {{group.group_countdowns.length }} countdowns!</div>
        <div v-else>No countdowns..</div>

      </div>
    </div>
        
  </section>
</template>

<style>
</style>
