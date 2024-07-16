export type AvailableService = {
  name: string;
  url: string;
  logoUrl: string;
  pages: Array<{
    name: string;
    url: string;
  }>;
};

export type ServicesState = {
  availableServices: AvailableService[];
  isLoading: boolean;
  isUserAuthenticated: boolean;
};
