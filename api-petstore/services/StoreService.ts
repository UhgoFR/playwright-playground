import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENDPOINTS, API_CONFIG } from '../config/api-config';
import { Order } from '../models';

export class StoreService {
  private requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  async getInventory(): Promise<APIResponse> {
    const response = await this.requestContext.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.STORE.INVENTORY}`, {
      headers: {
        ...API_CONFIG.HEADERS,
        'api_key': API_CONFIG.API_KEY
      }
    });
    return response;
  }

  async placeOrder(orderData: Order): Promise<APIResponse> {
    const response = await this.requestContext.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.STORE.ORDER}`, {
      data: orderData,
      headers: API_CONFIG.HEADERS
    });
    return response;
  }

  async getOrderById(orderId: number): Promise<APIResponse> {
    const response = await this.requestContext.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.STORE.ORDER_BY_ID(orderId)}`, {
      headers: API_CONFIG.HEADERS
    });
    return response;
  }

  async deleteOrder(orderId: number): Promise<APIResponse> {
    const response = await this.requestContext.delete(`${API_CONFIG.BASE_URL}${ENDPOINTS.STORE.ORDER_BY_ID(orderId)}`, {
      headers: API_CONFIG.HEADERS
    });
    return response;
  }
}
