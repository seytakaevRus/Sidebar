import { adapter } from '@/adapter';
import { extractErrorMessage } from '@/utils/extract-error-message';
import { AvailableService } from '@/store/services.type';

export const getAllAvailableServices = async (): Promise<AvailableService[] | Error> => {
  try {
    const { data } = await adapter.get<AvailableService[]>('/services/my');

    return data;
  } catch (error) {
    extractErrorMessage(
      error,
      'SERVICES_MODULE::STORE::getAllAvailableServices',
    );

    return new Error('User is not authorized');
  }
};
