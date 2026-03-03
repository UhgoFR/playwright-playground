import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENDPOINTS, API_CONFIG } from '../config/api-config';
import { Pet, ApiResponse } from '../models';
import { ApiHelper } from '../utils/api-helper';

export class PetService {
  private requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  async createPet(petData: Pet): Promise<APIResponse> {
    const requestData = {
      data: petData,
      headers: {
        ...API_CONFIG.HEADERS
      }
    };
    
    // Log curl command for debugging
    await ApiHelper.logCurlCommand(this.requestContext, ENDPOINTS.PET.BASE, 'POST', requestData);
    
    const response = await this.requestContext.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.PET.BASE}`, requestData);
    
    return response;
  }

  async updatePet(petData: Pet): Promise<APIResponse> {
    const requestData = {
      data: petData,
      headers: {
        ...API_CONFIG.HEADERS,
        'Authorization': `Bearer special-key`
      }
    };
    
    // Log curl command for debugging
    await ApiHelper.logCurlCommand(this.requestContext, ENDPOINTS.PET.BASE, 'PUT', requestData);
    
    const response = await this.requestContext.put(`${API_CONFIG.BASE_URL}${ENDPOINTS.PET.BASE}`, requestData);
    
    return response;
  }

  async getPetById(petId: number): Promise<APIResponse> {
    const requestData = {
      headers: {
        ...API_CONFIG.HEADERS,
        'api_key': API_CONFIG.API_KEY
      }
    };
    
    // Log curl command for debugging
    await ApiHelper.logCurlCommand(this.requestContext, ENDPOINTS.PET.BY_ID(petId), 'GET', requestData);
    
    const response = await this.requestContext.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.PET.BY_ID(petId)}`, requestData);
    
    return response;
  }

  async deletePet(petId: number): Promise<APIResponse> {
    const requestData = {
      headers: {
        ...API_CONFIG.HEADERS,
        'api_key': API_CONFIG.API_KEY,
        'Authorization': `Bearer special-key`
      }
    };
    
    // Log curl command for debugging
    await ApiHelper.logCurlCommand(this.requestContext, ENDPOINTS.PET.BY_ID(petId), 'DELETE', requestData);
    
    const response = await this.requestContext.delete(`${API_CONFIG.BASE_URL}${ENDPOINTS.PET.BY_ID(petId)}`, requestData);
    
    return response;
  }

  async findPetsByStatus(status: string[]): Promise<APIResponse> {
    const requestData = {
      params: { status: status.join(',') },
      headers: {
        ...API_CONFIG.HEADERS,
        'Authorization': `Bearer special-key`
      }
    };
    
    // Log curl command for debugging
    await ApiHelper.logCurlCommand(this.requestContext, ENDPOINTS.PET.BY_STATUS, 'GET', requestData);
    
    const response = await this.requestContext.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.PET.BY_STATUS}`, requestData);
    
    return response;
  }

  async findPetsByTags(tags: string[]): Promise<APIResponse> {
    const requestData = {
      params: { tags: tags.join(',') },
      headers: {
        ...API_CONFIG.HEADERS,
        'Authorization': `Bearer special-key`
      }
    };
    
    // Log curl command for debugging
    await ApiHelper.logCurlCommand(this.requestContext, ENDPOINTS.PET.BY_TAGS, 'GET', requestData);
    
    const response = await this.requestContext.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.PET.BY_TAGS}`, requestData);
    
    return response;
  }

  async updatePetWithForm(petId: number, name?: string, status?: string): Promise<APIResponse> {
    const formData: any = {};
    if (name) formData.name = name;
    if (status) formData.status = status;

    const requestData = {
      form: formData,
      headers: {
        'Authorization': `Bearer special-key`
      }
    };
    
    // Log curl command for debugging
    await ApiHelper.logCurlCommand(this.requestContext, ENDPOINTS.PET.UPDATE_WITH_FORM(petId), 'POST', requestData);
    
    const response = await this.requestContext.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.PET.UPDATE_WITH_FORM(petId)}`, requestData);
    
    return response;
  }

  async uploadImage(petId: number, additionalMetadata?: string, file?: string): Promise<APIResponse> {
    const formData: any = {};
    if (additionalMetadata) formData.additionalMetadata = additionalMetadata;
    if (file) formData.file = file;

    const requestData = {
      multipart: formData,
      headers: {
        'Authorization': `Bearer special-key`
      }
    };
    
    // Log curl command for debugging
    await ApiHelper.logCurlCommand(this.requestContext, ENDPOINTS.PET.UPLOAD_IMAGE(petId), 'POST', requestData);
    
    const response = await this.requestContext.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.PET.UPLOAD_IMAGE(petId)}`, requestData);
    
    return response;
  }
}
