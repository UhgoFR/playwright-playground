import { test, expect } from '@playwright/test';
import { ApiHelper } from '../utils/api-helper';
import { StoreService } from '../services/StoreService';
import { Order } from '../models';
import * as validOrderData from '../data/valid-order.json';

test.describe('Store API Tests', () => {
  let storeService: StoreService;
  let createdOrderId: number;

  test.beforeAll(async () => {
    const requestContext = await ApiHelper.getRequestContext();
    storeService = new StoreService(requestContext);
  });

  test.afterAll(async () => {
    await ApiHelper.closeRequestContext();
  });

  test('TC009_givenValidOrderData_whenPlacingOrder_thenOrderIsCreatedSuccessfully', async () => {
    // Given: Valid order data
    const orderData: Order = {
      ...validOrderData,
      petId: ApiHelper.generateRandomNumber(),
      quantity: ApiHelper.generateRandomNumber(1, 10),
      shipDate: ApiHelper.getCurrentTimestamp()
    };

    // When: Placing the order
    const response = await storeService.placeOrder(orderData);
    await ApiHelper.logResponse(response, 'TC009_PlaceOrder');

    // Then: Order should be created successfully
    await ApiHelper.validateResponse(response, 200);
    const createdOrder = await response.json();
    
    expect(createdOrder).toHaveProperty('id');
    expect(createdOrder.petId).toBe(orderData.petId);
    expect(createdOrder.quantity).toBe(orderData.quantity);
    expect(createdOrder.status).toBe(orderData.status);
    expect(createdOrder.complete).toBe(orderData.complete);
    
    createdOrderId = createdOrder.id;
  });

  test('TC010_givenValidOrderId_whenGettingOrderById_thenOrderDetailsReturned', async () => {
    // Given: A valid order ID (using a known valid ID for testing)
    const testOrderId = 1; // API documentation mentions IDs 1-10 are valid for testing

    // When: Getting the order by ID
    const response = await storeService.getOrderById(testOrderId);
    await ApiHelper.logResponse(response, 'TC010_GetOrderById');

    // Then: Order details should be returned
    await ApiHelper.validateResponse(response, 200);
    const order = await response.json();
    
    expect(order).toHaveProperty('id');
    expect(order).toHaveProperty('petId');
    expect(order).toHaveProperty('quantity');
    expect(order).toHaveProperty('status');
    expect(order).toHaveProperty('complete');
  });

  test('TC011_givenValidOrderId_whenDeletingOrder_thenOrderIsDeletedSuccessfully', async () => {
    // Given: A valid order ID (create one first for deletion)
    const orderData: Order = {
      ...validOrderData,
      petId: ApiHelper.generateRandomNumber(),
      quantity: 1,
      shipDate: ApiHelper.getCurrentTimestamp()
    };

    const createResponse = await storeService.placeOrder(orderData);
    await ApiHelper.validateResponse(createResponse, 200);
    const createdOrder = await createResponse.json();
    const orderIdToDelete = createdOrder.id;

    // When: Deleting the order
    const deleteResponse = await storeService.deleteOrder(orderIdToDelete);
    await ApiHelper.logResponse(deleteResponse, 'TC011_DeleteOrder');

    // Then: Order should be deleted successfully
    await ApiHelper.validateResponse(deleteResponse, 200);

    // Verify order is actually deleted
    const getResponse = await storeService.getOrderById(orderIdToDelete);
    await ApiHelper.validateResponse(getResponse, 404);
  });

  test('TC012_givenNoAuth_whenGettingInventory_thenInventoryReturned', async () => {
    // Given: No authentication required (public endpoint)

    // When: Getting the inventory
    const response = await storeService.getInventory();
    await ApiHelper.logResponse(response, 'TC012_GetInventory');

    // Then: Inventory should be returned
    await ApiHelper.validateResponse(response, 200);
    const inventory = await response.json();
    
    expect(typeof inventory).toBe('object');
    expect(inventory).toHaveProperty('available');
    expect(inventory).toHaveProperty('pending');
    expect(inventory).toHaveProperty('sold');
    
    // Verify inventory values are numbers
    expect(typeof inventory.available).toBe('number');
    expect(typeof inventory.pending).toBe('number');
    expect(typeof inventory.sold).toBe('number');
  });
});
