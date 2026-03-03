import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENDPOINTS, API_CONFIG } from '../config/api-config';
import { User } from '../models';

export class UserService {
  private requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  async createUser(userData: User): Promise<APIResponse> {
    const response = await this.requestContext.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.USER.BASE}`, {
      data: userData,
      headers: API_CONFIG.HEADERS
    });
    return response;
  }

  async createUsersWithArray(usersData: User[]): Promise<APIResponse> {
    const response = await this.requestContext.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.USER.CREATE_WITH_ARRAY}`, {
      data: usersData,
      headers: API_CONFIG.HEADERS
    });
    return response;
  }

  async createUsersWithList(usersData: User[]): Promise<APIResponse> {
    const response = await this.requestContext.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.USER.CREATE_WITH_LIST}`, {
      data: usersData,
      headers: API_CONFIG.HEADERS
    });
    return response;
  }

  async getUserByUsername(username: string): Promise<APIResponse> {
    const response = await this.requestContext.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.USER.BY_USERNAME(username)}`, {
      headers: API_CONFIG.HEADERS
    });
    return response;
  }

  async updateUser(username: string, userData: User): Promise<APIResponse> {
    const response = await this.requestContext.put(`${API_CONFIG.BASE_URL}${ENDPOINTS.USER.BY_USERNAME(username)}`, {
      data: userData,
      headers: API_CONFIG.HEADERS
    });
    return response;
  }

  async deleteUser(username: string): Promise<APIResponse> {
    const response = await this.requestContext.delete(`${API_CONFIG.BASE_URL}${ENDPOINTS.USER.BY_USERNAME(username)}`, {
      headers: API_CONFIG.HEADERS
    });
    return response;
  }

  async loginUser(username: string, password: string): Promise<APIResponse> {
    const response = await this.requestContext.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.USER.LOGIN}`, {
      params: { username, password },
      headers: API_CONFIG.HEADERS
    });
    return response;
  }

  async logoutUser(): Promise<APIResponse> {
    const response = await this.requestContext.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.USER.LOGOUT}`, {
      headers: API_CONFIG.HEADERS
    });
    return response;
  }
}
