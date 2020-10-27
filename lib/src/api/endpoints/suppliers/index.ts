import { getPortalEuEndpoint } from '@/api/endpoints/shared-urls';

export const registrationEndpoint = `${getPortalEuEndpoint()}/suppliers/register`;

export const warehousesListEndpoint = `${getPortalEuEndpoint()}/suppliers/allWarehouseList`;

export const countriesEndpoint = `${getPortalEuEndpoint()}/suppliers/listCountries`;

export const downloadContractEndpoint = `${getPortalEuEndpoint()}/suppliers/downloadContractOffer`;
