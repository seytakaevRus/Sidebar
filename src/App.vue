<template>
  <Sidebar />
  <Navbar />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import { useServicesStore } from '@/store/services.store';

const servicesStore = useServicesStore();

onMounted(async () => {
  await servicesStore.getAllAvailableServices();
});
</script>
