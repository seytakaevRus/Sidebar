<template>
  <div :class="getElementBlock()">
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="#8a99a5"
    >
      <path d="M1 3v26h30V3Zm2 24V5h8v22Zm26 0H13V5h16Z" />
      <path d="M5 15h4v2H5zM5 11h4v2H5zM5 7h4v2H5z" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { bemBlock } from '@/utils';

const blockName = 'burger-menu-icon';

const getElementBlock = bemBlock(blockName);
</script>

<style lang="scss" scoped>
.burger-menu-icon {
  display: grid;
  width: 48px;
  height: 48px;
  place-content: center;
  cursor: pointer;
  border-radius: 100%;
  user-select: none;

  &:hover {
    background: hsla(0, 0%, 0%, 0.1);
  }
}
</style>
