<template>
  <div aria-hidden="true" :class="classes" @click="onClick">
    <GoogleIcon />
    <div :class="getElementClass('label')">Войти через Google</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { GoogleIcon } from '@/components/icons';
import { bemBlock, bemElement } from '@/utils';

const props = defineProps({
  fullWidth: {
    type: Boolean,
    default: false,
  },
});

const blockName = 'login-button';

const getBlockClass = bemBlock(blockName);

const getElementClass = bemElement(blockName);

const emit = defineEmits(['click']);

const classes = computed(() => getBlockClass({
  'full-width': props.fullWidth,
}));

const onClick = (event: Event) => {
  emit('click', event);
};
</script>

<style scoped lang="scss">
.login-button {
  font-family: 'Roboto-Medium', sans-serif;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1.14px;
  display: grid;
  place-items: center;
  place-content: center;
  color: var(--sidebar-surface-e);
  background-color: var(--sidebar-primary-text-color);
  grid-template-columns: 32px max-content;
  width: max-content;
  padding: 16px 36px;

  &:hover {
    background: hsl(154, 100%, 30%) 0 0 no-repeat padding-box;
  }

  &__icon {
    width: 32px;
    height: 32px;

    border-radius: 100%;
    background:hsl(0, 100%, 100%);
  }

  &__label {
    padding: 0 8px;
    white-space: nowrap;
    color: var(--sidebar-surface-e);
  }

  &--full-width {
    width: 100%;
    height: 50px;
  }
}
</style>
