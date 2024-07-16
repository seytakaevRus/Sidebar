<template>
  <Teleport v-if="isNavbarLoaded" :to="teleportLocation">
    <div :class="getBlockClass()">
      <template v-if="servicesStore.isLoading">
        <div :class="getElementClass('spinner-wrapper')">
          <NativeSpinner :class="getElementClass('spinner')" />
        </div>
      </template>

      <template v-else-if="!servicesStore.isUserAuthenticated">
        <div
          aria-hidden="true"
          :class="getElementClass('action')"
          @click="handleGoogleIconClick()"
        >
          <GoogleIcon size="36px" />
        </div>
      </template>

      <div
        v-for="{ name, logoUrl, url } in servicesStore.availableServices"
        v-else
        :key="name"
        aria-hidden="true"
        :class="getElementClass('action')"
        @click="handleActionIconClick(url)"
      >
        <img
          width="36"
          height="36"
          :class="getElementClass('icon')"
          :src="logoUrl"
          :alt="`${name} logo icon`"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import NativeSpinner from 'primevue/progressspinner';

import { GoogleIcon } from '@/components/icons';
import { bemBlock, bemElement, redirectToSSO } from '@/utils';
import { useServicesStore } from '@/store/services.store';

const isNavbarLoaded = ref(false);
const teleportLocation = ref('#space-navbar');

const servicesStore = useServicesStore();

const blockName = 'navbar';

const getBlockClass = bemBlock(blockName);
const getElementClass = bemElement(blockName);

const handleNavbarLoaded = (event: Event) => {
  isNavbarLoaded.value = true;

  if (event instanceof CustomEvent) {
    teleportLocation.value = `#${event.detail}`;
  }
};

const handleActionIconClick = (url: string) => {
  window.location.href = url;
};

const handleGoogleIconClick = () => {
  redirectToSSO();
};

onMounted(() => {
  document.addEventListener('navbar-place-ready', handleNavbarLoaded);
});

onUnmounted(() => {
  document.removeEventListener('navbar-place-ready', handleNavbarLoaded);
});
</script>

<style scoped lang="scss">
.navbar {
  width: 64px;
  height: 100%;
  box-shadow: 0px 2px 14px -7px var(--sidebar-secondary-text-color);

  &__action {
    display: grid;
    padding: 8px 0;
    gap: 8px;
    align-items: center;
    justify-items: center;
    cursor: pointer;
    transition: background 0.3s;
  }

  &__action:hover {
    background: var(--sidebar-surface-c);
  }

  &__icon {
    width: 36px;
    height: 36px;
  }

  &__spinner {
    width: 36px;
    height: 36px;
  }

  &__spinner-wrapper {
    display: grid;
    align-content: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}
</style>
