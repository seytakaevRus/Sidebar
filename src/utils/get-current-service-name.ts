import { AvailableService } from '@/store/services.type';

export const getCurrentServiceName = (
  availableServices: AvailableService[],
) => {
  const { host: currentHost } = new URL(window.location.href);

  for (const service of availableServices) {
    const { host: serviceHost } = new URL(service.url);

    if (currentHost === serviceHost) return service.name;
  }

  return '';
};
