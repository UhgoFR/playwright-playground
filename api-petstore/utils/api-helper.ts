import { API_CONFIG, STATUS_CODES } from '../config/api-config';
import { request, APIRequestContext } from '@playwright/test';

export class ApiHelper {
  private static requestContext: APIRequestContext | null = null;

  static async getRequestContext(): Promise<APIRequestContext> {
    if (!this.requestContext) {
      this.requestContext = await request.newContext({
        baseURL: API_CONFIG.BASE_URL,
        extraHTTPHeaders: API_CONFIG.HEADERS,
        timeout: API_CONFIG.TIMEOUT
      });
    }
    return this.requestContext;
  }

  static async closeRequestContext(): Promise<void> {
    if (this.requestContext) {
      await this.requestContext.dispose();
      this.requestContext = null;
    }
  }

  static async validateResponse(response: any, expectedStatusCode: number): Promise<void> {
    const actualStatusCode = response.status();
    if (actualStatusCode !== expectedStatusCode) {
      throw new Error(
        `Expected status code ${expectedStatusCode}, but got ${actualStatusCode}. ` +
        `Response body: ${await response.text()}`
      );
    }
  }

  static async logResponse(response: any, testName: string): Promise<void> {
    console.log(`\n=== ${testName} Response ===`);
    console.log(`Status: ${response.status()}`);
    console.log(`Headers:`, response.headers());
    console.log(`Body:`, await response.text());
    console.log(`=== End Response ===\n`);
  }

  static async logCurlCommand(requestContext: APIRequestContext, url: string, method: string, requestData: any): Promise<void> {
    // Build full URL for curl command
    const fullUrl = url.startsWith('http') ? url : `${API_CONFIG.BASE_URL}${url}`;
    let curlCommand = `curl -X ${method} '${fullUrl}'`;
    
    // Add query parameters if present
    if (requestData.params) {
      const queryString = new URLSearchParams(requestData.params).toString();
      curlCommand = `curl -X ${method} '${fullUrl}?${queryString}'`;
    }
    
    // Add headers
    if (requestData.headers) {
      for (const [key, value] of Object.entries(requestData.headers)) {
        curlCommand += ` \\\n  -H '${key}: ${value}'`;
      }
    }
    
    // Add body data if present
    if (requestData.data) {
      curlCommand += ` \\\n  -d '${JSON.stringify(requestData.data)}'`;
    }
    
    // Add form data if present
    if (requestData.form) {
      curlCommand += ` \\\n  -d '${JSON.stringify(requestData.form)}'`;
    }
    
    // Add multipart data if present
    if (requestData.multipart) {
      curlCommand += ` \\\n  -d '${JSON.stringify(requestData.multipart)}'`;
    }
    
    console.log(`\n=== ${method} ${fullUrl} CURL Command ===`);
    console.log(curlCommand);
    console.log(`=== End CURL ===\n`);
  }

  static generateRandomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateRandomNumber(min: number = 1, max: number = 1000): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getCurrentTimestamp(): string {
    return new Date().toISOString();
  }
}
