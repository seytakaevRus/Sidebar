import { defineStore } from 'pinia';

import { getAllAvailableServices } from '@/store/services.api';
import { ServicesState } from '@/store/services.type';

export const useServicesStore = defineStore('services', {
  state: (): ServicesState => ({
    isLoading: true,
    availableServices: [],
    isUserAuthenticated: false,
  }),
  actions: {
    async getAllAvailableServices(): Promise<null | Error> {
      const result = await getAllAvailableServices();

      this.isLoading = false;

      if (result instanceof Error) {
        return result;
      }

      this.isUserAuthenticated = true;
      this.availableServices = result;
      return null;
    },
  },
});
