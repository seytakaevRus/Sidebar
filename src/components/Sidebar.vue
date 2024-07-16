<template>
  <NativeSidebar
    v-model:visible="isVisible"
    style="width: 500px"
    :block-scroll="true"
  >
    <div :class="getSidebarBlockClass()">
      <template v-if="servicesStore.isLoading">
        <div :class="getSidebarElementClass('spinner-wrapper')">
          <NativeSpinner :class="getSidebarElementClass('spinner')" />
        </div>
      </template>

      <template v-else-if="!servicesStore.isUserAuthenticated">
        <GoogleButton @click="handleGoogleButtonClick" />
      </template>

      <NativePanelMenu
        v-else
        v-model:expandedKeys="expandedKeys"
        :model="items"
      >
        <template #item="{ item }">
          <div :class="getItemBlockClass()">
            <template v-if="item.items !== undefined">
              <a :class="getItemElementClass('header')">
                <template v-if="typeof item.label === 'string'">
                  <ArrowDownIcon v-if="item.label in expandedKeys" />
                  <ArrowRightIcon v-else />
                </template>

                <img
                  width="24"
                  height="24"
                  :class="getItemElementClass('service-icon')"
                  :src="item.icon"
                  :alt="`${item.label} logo icon`"
                />
                <span>{{ item.label }}</span>
                <a
                  :class="getItemElementClass('action-link')"
                  :href="item.url"
                  @click="handleActionLinkClick"
                >
                  Перейти
                </a>
              </a>
            </template>
            <template v-else>
              <a
                tabindex="-1"
                :class="getItemElementClass('content')"
                :href="item.url"
              >
                <span :class="getItemElementClass('link-text')">{{
                  item.label
                }}</span>
              </a>
            </template>
          </div>
        </template>
      </NativePanelMenu>
    </div>
  </NativeSidebar>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  watchEffect,
} from 'vue';
import NativeSidebar from 'primevue/sidebar';
import NativePanelMenu from 'primevue/panelmenu';
import NativeSpinner from 'primevue/progressspinner';

import {
  bemBlock,
  bemElement,
  getCurrentServiceName,
  redirectToSSO,
} from '@/utils';
import { ArrowDownIcon, ArrowRightIcon } from '@/components/icons';
import GoogleButton from '@/components/GoogleButton.vue';
import { useServicesStore } from '@/store/services.store';
import { AvailableService } from '@/store/services.type';

type ExpandedKeys = Record<AvailableService['name'], boolean>;

const expandedKeys = ref(<ExpandedKeys>{});
const isVisible = ref(false);

const servicesStore = useServicesStore();

const items = computed(() => servicesStore.availableServices.map((service) => {
  const pages = service.pages.map((page) => ({
    label: page.name,
    url: page.url,
  }));

  return {
    key: service.name,
    label: service.name,
    icon: service.logoUrl,
    url: service.url,
    items: pages,
  };
}));

const currentServiceName = computed(() => getCurrentServiceName(
  servicesStore.availableServices,
));

watchEffect(() => {
  expandedKeys.value[currentServiceName.value] = true;
});

const handleActionLinkClick = (event: Event) => {
  event.stopPropagation();
};

const handleGoogleButtonClick = () => {
  redirectToSSO();
};

onMounted(async () => {
  document.addEventListener('toggle-sidebar', () => {
    isVisible.value = !isVisible.value;
  });
});

const sidebarBlockName = 'sidebar';

const getSidebarBlockClass = bemBlock(sidebarBlockName);
const getSidebarElementClass = bemElement(sidebarBlockName);

const itemBlockName = 'item';

const getItemBlockClass = bemBlock(itemBlockName);
const getItemElementClass = bemElement(itemBlockName);
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  width: 100%;

  &__spinner-wrapper {
    display: grid;
    align-content: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__spinner {
    width: 48px;
    height: 48px;
  }
}
.item {
  cursor: pointer;
  user-select: none;

  &__header {
    display: grid;
    grid-template-columns: min-content min-content auto 1fr;
    gap: 8px;
    color: var(--sidebar-secondary-text-color);
    padding: 8px 20px;
    font: 700 18px/21px Roboto;
    align-items: center;
  }

  &__header:hover &__action-link {
    visibility: visible;
  }

  &__action-link {
    text-decoration: none;
    visibility: hidden;
    justify-self: end;
    color: var(--sidebar-primary-text-color);
    text-transform: uppercase;
    font: 400 12px/21px Roboto;
    border: 1px solid transparent;
    letter-spacing: 0.1em;
    transition: border-bottom-color 0.3s;
  }

  &__action-link:hover {
    border-bottom-color: var(--sidebar-primary-text-color);
  }

  &__action-link:focus-visible {
    outline: none;
    outline-offset: 0;
    box-shadow: 0 0 0 0.2rem var(--sidebar-shadow-color);
  }

  &__service-icon {
    width: 24px;
    height: 24px;
  }

  &__content {
    display: grid;
    align-items: center;
    user-select: none;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    overflow: hidden;
  }

  &__link-text {
    color: var(--sidebar-primary-text-color);
    padding: 0.75rem 1.25rem;
    user-select: none;
  }
}
</style>
