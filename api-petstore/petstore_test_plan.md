# API Regression Test Plan

## Document Information

File Name: petstore_test_plan.md
Version: 1.0
Created: 2025-06-17
Last Updated: 2025-06-17

## Overview

The Swagger Petstore API is a sample RESTful API that provides operations for managing a pet store. It includes three main domains: Pet management (CRUD operations), Store operations (order management and inventory), and User management (user authentication and profile management). The API supports both HTTP and HTTPS protocols and uses API key and OAuth2 authentication methods.

## Test Scope

This test plan covers regression testing for all major endpoints of the Petstore API:
- Pet operations: Create, read, update, delete pets, find by status/tags, upload images
- Store operations: Place orders, retrieve orders by ID, delete orders, get inventory
- User operations: Create users, authenticate, manage user profiles, logout
- Authentication testing with API key and OAuth2
- Error handling and validation testing

## Authentication Requirements

The API supports two authentication methods:
1. **API Key**: Header-based authentication using `api_key` header
2. **OAuth2**: Implicit flow with scopes `read:pets` and `write:pets`
3. **Test API Key**: `special-key` (provided for testing authorization filters)

## Test Cases

| Test Case Name | Description |
|---------------|-------------|
| TC001_givenValidPetData_whenCreatingPet_thenPetIsCreatedSuccessfully | Test successful pet creation with valid data |
| TC002_givenInvalidPetData_whenCreatingPet_thenValidationErrorReturned | Test pet creation with invalid/missing required fields |
| TC003_givenValidPetId_whenGettingPetById_thenPetDetailsReturned | Test retrieving pet by valid ID |
| TC004_givenInvalidPetId_whenGettingPetById_thenNotFoundErrorReturned | Test retrieving pet with non-existent ID |
| TC005_givenValidPetData_whenUpdatingPet_thenPetIsUpdatedSuccessfully | Test updating existing pet with valid data |
| TC006_givenValidPetId_whenDeletingPet_thenPetIsDeletedSuccessfully | Test deleting pet by ID |
| TC007_givenValidStatus_whenFindingPetsByStatus_thenPetsReturned | Test finding pets by status (available, pending, sold) |
| TC008_givenInvalidStatus_whenFindingPetsByStatus_thenValidationErrorReturned | Test finding pets with invalid status |
| TC009_givenValidOrderData_whenPlacingOrder_thenOrderIsCreatedSuccessfully | Test placing order with valid data |
| TC010_givenValidOrderId_whenGettingOrderById_thenOrderDetailsReturned | Test retrieving order by valid ID |
| TC011_givenValidOrderId_whenDeletingOrder_thenOrderIsDeletedSuccessfully | Test deleting order by ID |
| TC012_givenNoAuth_whenGettingInventory_thenInventoryReturned | Test getting inventory without authentication |
| TC013_givenValidUserData_whenCreatingUser_thenUserIsCreatedSuccessfully | Test creating user with valid data |
| TC014_givenValidCredentials_whenLoggingIn_thenSessionTokenReturned | Test user login with valid credentials |
| TC015_givenInvalidCredentials_whenLoggingIn_thenAuthenticationErrorReturned | Test user login with invalid credentials |
| TC016_givenValidUsername_whenGettingUserByName_thenUserDetailsReturned | Test retrieving user by username |
| TC017_givenValidUserData_whenUpdatingUser_thenUserIsUpdatedSuccessfully | Test updating existing user |
| TC018_givenValidUsername_whenDeletingUser_thenUserIsDeletedSuccessfully | Test deleting user by username |

## Detailed Test Cases

### TC001_givenValidPetData_whenCreatingPet_thenPetIsCreatedSuccessfully

**Endpoint:** /pet

**HTTP Method:** POST

**Description:** Test creating a new pet with all required fields and valid data

**Preconditions:**
- User is authenticated with OAuth2 token having write:pets scope
- Pet data includes required fields: name, photoUrls

**Test Steps:**
1. Prepare valid pet object with name, photoUrls, category, tags, status
2. Send POST request to /pet with JSON body
3. Include proper Authorization header

**Expected Results:**
- Status Code: 200 (successful operation)
- Response Body: Created pet object with assigned ID
- Response includes all fields sent in request
- Pet status should be one of: available, pending, sold

### TC002_givenInvalidPetData_whenCreatingPet_thenValidationErrorReturned

**Endpoint:** /pet

**HTTP Method:** POST

**Description:** Test pet creation with missing required fields or invalid data

**Preconditions:**
- User is authenticated with OAuth2 token

**Test Steps:**
1. Prepare pet object missing required fields (name or photoUrls)
2. Send POST request to /pet with invalid JSON body
3. Include proper Authorization header

**Expected Results:**
- Status Code: 405 (Invalid input)
- Response Body: Error message describing validation failure

### TC003_givenValidPetId_whenGettingPetById_thenPetDetailsReturned

**Endpoint:** /pet/{petId}

**HTTP Method:** GET

**Description:** Test retrieving an existing pet by its ID

**Preconditions:**
- Pet exists in the system
- User is authenticated with API key

**Test Steps:**
1. Send GET request to /pet/{petId} with valid pet ID
2. Include api_key header

**Expected Results:**
- Status Code: 200 (successful operation)
- Response Body: Complete pet object with all details
- Response includes id, name, photoUrls, category, tags, status

### TC004_givenInvalidPetId_whenGettingPetById_thenNotFoundErrorReturned

**Endpoint:** /pet/{petId}

**HTTP Method:** GET

**Description:** Test retrieving pet with non-existent ID

**Preconditions:**
- User is authenticated with API key

**Test Steps:**
1. Send GET request to /pet/{petId} with non-existent pet ID
2. Include api_key header

**Expected Results:**
- Status Code: 404 (Pet not found)
- Response Body: Error message indicating pet not found

### TC005_givenValidPetData_whenUpdatingPet_thenPetIsUpdatedSuccessfully

**Endpoint:** /pet

**HTTP Method:** PUT

**Description:** Test updating an existing pet with valid data

**Preconditions:**
- Pet exists in the system
- User is authenticated with OAuth2 token having write:pets scope

**Test Steps:**
1. Prepare updated pet object with existing pet ID and modified data
2. Send PUT request to /pet with updated JSON body
3. Include proper Authorization header

**Expected Results:**
- Status Code: 200 (successful operation)
- Response Body: Updated pet object with changes applied
- All modified fields should reflect new values

### TC006_givenValidPetId_whenDeletingPet_thenPetIsDeletedSuccessfully

**Endpoint:** /pet/{petId}

**HTTP Method:** DELETE

**Description:** Test deleting an existing pet by ID

**Preconditions:**
- Pet exists in the system
- User is authenticated with OAuth2 token having write:pets scope

**Test Steps:**
1. Send DELETE request to /pet/{petId} with valid pet ID
2. Include api_key header and Authorization header

**Expected Results:**
- Status Code: 200 (successful operation)
- Pet should be removed from the system
- Subsequent GET requests for the same ID should return 404

### TC007_givenValidStatus_whenFindingPetsByStatus_thenPetsReturned

**Endpoint:** /pet/findByStatus

**HTTP Method:** GET

**Description:** Test finding pets by status filter

**Preconditions:**
- User is authenticated with OAuth2 token

**Test Steps:**
1. Send GET request to /pet/findByStatus with status parameter
2. Test with each valid status: available, pending, sold
3. Include proper Authorization header

**Expected Results:**
- Status Code: 200 (successful operation)
- Response Body: Array of pet objects with specified status
- All returned pets should have the requested status

### TC008_givenInvalidStatus_whenFindingPetsByStatus_thenValidationErrorReturned

**Endpoint:** /pet/findByStatus

**HTTP Method:** GET

**Description:** Test finding pets with invalid status value

**Preconditions:**
- User is authenticated with OAuth2 token

**Test Steps:**
1. Send GET request to /pet/findByStatus with invalid status parameter
2. Include proper Authorization header

**Expected Results:**
- Status Code: 400 (Invalid status value)
- Response Body: Error message indicating invalid status

### TC009_givenValidOrderData_whenPlacingOrder_thenOrderIsCreatedSuccessfully

**Endpoint:** /store/order

**HTTP Method:** POST

**Description:** Test placing a new order with valid data

**Preconditions:**
- Pet exists for the order
- Order data includes required fields

**Test Steps:**
1. Prepare order object with petId, quantity, shipDate, status, complete
2. Send POST request to /store/order with JSON body

**Expected Results:**
- Status Code: 200 (successful operation)
- Response Body: Created order object with assigned order ID
- Order should be properly stored in the system

### TC010_givenValidOrderId_whenGettingOrderById_thenOrderDetailsReturned

**Endpoint:** /store/order/{orderId}

**HTTP Method:** GET

**Description:** Test retrieving an existing order by ID

**Preconditions:**
- Order exists in the system
- Order ID is between 1 and 10 (as per API constraints)

**Test Steps:**
1. Send GET request to /store/order/{orderId} with valid order ID

**Expected Results:**
- Status Code: 200 (successful operation)
- Response Body: Complete order object with all details
- Response includes id, petId, quantity, shipDate, status, complete

### TC011_givenValidOrderId_whenDeletingOrder_thenOrderIsDeletedSuccessfully

**Endpoint:** /store/order/{orderId}

**HTTP Method:** DELETE

**Description:** Test deleting an existing order by ID

**Preconditions:**
- Order exists in the system
- Order ID is a positive integer

**Test Steps:**
1. Send DELETE request to /store/order/{orderId} with valid order ID

**Expected Results:**
- Status Code: 200 (successful operation)
- Order should be removed from the system
- Subsequent GET requests for the same ID should return 404

### TC012_givenNoAuth_whenGettingInventory_thenInventoryReturned

**Endpoint:** /store/inventory

**HTTP Method:** GET

**Description:** Test getting inventory without authentication (public endpoint)

**Preconditions:**
- No authentication required

**Test Steps:**
1. Send GET request to /store/inventory

**Expected Results:**
- Status Code: 200 (successful operation)
- Response Body: Map of status codes to quantities
- Should return inventory counts for different pet statuses

### TC013_givenValidUserData_whenCreatingUser_thenUserIsCreatedSuccessfully

**Endpoint:** /user

**HTTP Method:** POST

**Description:** Test creating a new user with valid data

**Preconditions:**
- User data includes required fields
- Username is unique

**Test Steps:**
1. Prepare user object with username, firstName, lastName, email, password, phone, userStatus
2. Send POST request to /user with JSON body

**Expected Results:**
- Status Code: 200 (successful operation)
- Response Body: Success message or created user object
- User should be stored in the system

### TC014_givenValidCredentials_whenLoggingIn_thenSessionTokenReturned

**Endpoint:** /user/login

**HTTP Method:** GET

**Description:** Test user login with valid credentials

**Preconditions:**
- User exists in the system
- Username and password are correct

**Test Steps:**
1. Send GET request to /user/login with username and password query parameters

**Expected Results:**
- Status Code: 200 (successful operation)
- Response Body: Session token string
- Response headers should include X-Expires-After and X-Rate-Limit

### TC015_givenInvalidCredentials_whenLoggingIn_thenAuthenticationErrorReturned

**Endpoint:** /user/login

**HTTP Method:** GET

**Description:** Test user login with invalid credentials

**Preconditions:**
- User may or may not exist in the system

**Test Steps:**
1. Send GET request to /user/login with invalid username or password

**Expected Results:**
- Status Code: 400 (Invalid username/password supplied)
- Response Body: Error message indicating authentication failure

### TC016_givenValidUsername_whenGettingUserByName_thenUserDetailsReturned

**Endpoint:** /user/{username}

**HTTP Method:** GET

**Description:** Test retrieving user by username

**Preconditions:**
- User exists in the system

**Test Steps:**
1. Send GET request to /user/{username} with valid username

**Expected Results:**
- Status Code: 200 (successful operation)
- Response Body: Complete user object with all details
- Response includes id, username, firstName, lastName, email, password, phone, userStatus

### TC017_givenValidUserData_whenUpdatingUser_thenUserIsUpdatedSuccessfully

**Endpoint:** /user/{username}

**HTTP Method:** PUT

**Description:** Test updating an existing user with valid data

**Preconditions:**
- User exists in the system

**Test Steps:**
1. Prepare updated user object with modified data
2. Send PUT request to /user/{username} with JSON body

**Expected Results:**
- Status Code: 200 (successful operation)
- Response Body: Updated user object with changes applied
- All modified fields should reflect new values

### TC018_givenValidUsername_whenDeletingUser_thenUserIsDeletedSuccessfully

**Endpoint:** /user/{username}

**HTTP Method:** DELETE

**Description:** Test deleting an existing user by username

**Preconditions:**
- User exists in the system

**Test Steps:**
1. Send DELETE request to /user/{username} with valid username

**Expected Results:**
- Status Code: 200 (successful operation)
- User should be removed from the system
- Subsequent GET requests for the same username should return 404

## Setup and Teardown Procedures

### Setup
1. **Authentication Setup**: Configure API key and OAuth2 credentials
2. **Test Data Preparation**: Create test pets, users, and orders with known IDs
3. **Environment Configuration**: Set base URL to https://petstore.swagger.io/v2
4. **Test Suite Initialization**: Initialize test framework and reporting

### Teardown
1. **Test Data Cleanup**: Delete created pets, users, and orders
2. **Session Cleanup**: Logout active user sessions
3. **Report Generation**: Generate test execution reports
4. **Resource Cleanup**: Release allocated resources and connections
