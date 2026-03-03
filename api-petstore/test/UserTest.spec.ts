import { test, expect } from '@playwright/test';
import { ApiHelper } from '../utils/api-helper';
import { UserService } from '../services/UserService';
import { User } from '../models';
import * as validUserData from '../data/valid-user.json';

test.describe('User API Tests', () => {
  let userService: UserService;
  let createdUsername: string;

  test.beforeAll(async () => {
    const requestContext = await ApiHelper.getRequestContext();
    userService = new UserService(requestContext);
  });

  test.afterAll(async () => {
    await ApiHelper.closeRequestContext();
  });

  test('TC013_givenValidUserData_whenCreatingUser_thenUserIsCreatedSuccessfully', async () => {
    // Given: Valid user data
    const userData: User = {
      ...validUserData,
      username: `testuser_${ApiHelper.generateRandomString()}`,
      email: `test_${ApiHelper.generateRandomString()}@example.com`
    };

    // When: Creating the user
    const response = await userService.createUser(userData);
    await ApiHelper.logResponse(response, 'TC013_CreateUser');

    // Then: User should be created successfully
    await ApiHelper.validateResponse(response, 200);
    createdUsername = userData.username;
  });

  test('TC014_givenValidCredentials_whenLoggingIn_thenSessionTokenReturned', async () => {
    // Given: Valid user credentials (using the user created in TC013)
    const username = createdUsername || 'testuser123'; // Fallback for standalone test execution
    const password = validUserData.password || 'Password123!';

    // When: Logging in with valid credentials
    const response = await userService.loginUser(username, password);
    await ApiHelper.logResponse(response, 'TC014_LoginUser');

    // Then: Session token should be returned
    await ApiHelper.validateResponse(response, 200);
    const sessionToken = await response.text();
    
    expect(typeof sessionToken).toBe('string');
    expect(sessionToken.length).toBeGreaterThan(0);
    
    // Verify response headers
    const headers = response.headers();
    expect(headers).toHaveProperty('x-rate-limit');
    expect(headers).toHaveProperty('x-expires-after');
  });

  test('TC015_givenInvalidCredentials_whenLoggingIn_thenAuthenticationErrorReturned', async () => {
    // Given: Invalid user credentials
    const invalidUsername = 'invaliduser';
    const invalidPassword = 'invalidpassword';

    // When: Logging in with invalid credentials
    const response = await userService.loginUser(invalidUsername, invalidPassword);
    await ApiHelper.logResponse(response, 'TC015_LoginInvalidUser');

    // Then: Authentication error should be returned
    await ApiHelper.validateResponse(response, 400);
  });

  test('TC016_givenValidUsername_whenGettingUserByName_thenUserDetailsReturned', async () => {
    // Given: A valid username (using the user created in TC013)
    const username = createdUsername || 'testuser123'; // Fallback for standalone test execution

    // When: Getting the user by username
    const response = await userService.getUserByUsername(username);
    await ApiHelper.logResponse(response, 'TC016_GetUserByName');

    // Then: User details should be returned
    await ApiHelper.validateResponse(response, 200);
    const user = await response.json();
    
    expect(user).toHaveProperty('username', username);
    expect(user).toHaveProperty('firstName');
    expect(user).toHaveProperty('lastName');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('phone');
    expect(user).toHaveProperty('userStatus');
  });

  test('TC017_givenValidUserData_whenUpdatingUser_thenUserIsUpdatedSuccessfully', async () => {
    // Given: Valid user data for update
    const username = createdUsername || 'testuser123'; // Fallback for standalone test execution
    const updatedUserData: User = {
      username: username,
      firstName: `Updated_${ApiHelper.generateRandomString()}`,
      lastName: `User_${ApiHelper.generateRandomString()}`,
      email: `updated_${ApiHelper.generateRandomString()}@example.com`,
      phone: `+${ApiHelper.generateRandomNumber(1000000000, 9999999999)}`,
      userStatus: 2
    };

    // When: Updating the user
    const response = await userService.updateUser(username, updatedUserData);
    await ApiHelper.logResponse(response, 'TC017_UpdateUser');

    // Then: User should be updated successfully
    await ApiHelper.validateResponse(response, 200);

    // Verify the update by getting the user again
    const getResponse = await userService.getUserByUsername(username);
    await ApiHelper.validateResponse(getResponse, 200);
    const updatedUser = await getResponse.json();
    
    expect(updatedUser.firstName).toBe(updatedUserData.firstName);
    expect(updatedUser.lastName).toBe(updatedUserData.lastName);
    expect(updatedUser.email).toBe(updatedUserData.email);
    expect(updatedUser.phone).toBe(updatedUserData.phone);
    expect(updatedUser.userStatus).toBe(updatedUserData.userStatus);
  });

  test('TC018_givenValidUsername_whenDeletingUser_thenUserIsDeletedSuccessfully', async () => {
    // Given: A valid username (create one first for deletion if needed)
    let usernameToDelete = createdUsername;
    
    if (!usernameToDelete) {
      // Create a user specifically for deletion test
      const tempUserData: User = {
        ...validUserData,
        username: `tempuser_${ApiHelper.generateRandomString()}`,
        email: `temp_${ApiHelper.generateRandomString()}@example.com`
      };
      
      const createResponse = await userService.createUser(tempUserData);
      await ApiHelper.validateResponse(createResponse, 200);
      usernameToDelete = tempUserData.username;
    }

    // When: Deleting the user
    const response = await userService.deleteUser(usernameToDelete);
    await ApiHelper.logResponse(response, 'TC018_DeleteUser');

    // Then: User should be deleted successfully
    await ApiHelper.validateResponse(response, 200);

    // Verify user is actually deleted
    const getResponse = await userService.getUserByUsername(usernameToDelete);
    await ApiHelper.validateResponse(getResponse, 404);
  });
});
