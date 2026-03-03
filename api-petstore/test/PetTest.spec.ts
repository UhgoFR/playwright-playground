import { test, expect } from '@playwright/test';
import { ApiHelper } from '../utils/api-helper';
import { PetService } from '../services/PetService';
import { Pet } from '../models';
import validPetData from '../data/valid-pet.json';
import invalidPetData from '../data/invalid-pet.json';

test.describe('Pet API Tests', () => {
  let petService: PetService;
  let createdPetId: number;

  test.beforeAll(async () => {
    const requestContext = await ApiHelper.getRequestContext();
    petService = new PetService(requestContext);
  });

  test.afterAll(async () => {
    await ApiHelper.closeRequestContext();
  });

  test('TC001_givenValidPetData_whenCreatingPet_thenPetIsCreatedSuccessfully', async () => {
    // Given: Valid pet data
    const petData: Pet = {
      ...validPetData,
      name: `TestDog_${ApiHelper.generateRandomString()}`,
      id: ApiHelper.generateRandomNumber(),
      status: 'available' as const
    };

    console.log('Pet data to send:', JSON.stringify(petData, null, 2));

    // When: Creating the pet
    const response = await petService.createPet(petData);
    await ApiHelper.logResponse(response, 'TC001_CreatePet');

    // Then: Pet should be created successfully
    await ApiHelper.validateResponse(response, 200);
    const createdPet = await response.json();
    
    expect(createdPet).toHaveProperty('id');
    expect(createdPet.name).toBe(petData.name);
    expect(createdPet.status).toBe(petData.status);
    expect(createdPet.photoUrls).toEqual(petData.photoUrls);
    
    createdPetId = createdPet.id;
  });

  test('TC002_givenInvalidPetData_whenCreatingPet_thenValidationErrorReturned', async () => {
    // Given: Invalid pet data (missing required fields)
    const invalidPet: Partial<Pet> = invalidPetData;

    // When: Creating the pet with invalid data
    const response = await petService.createPet(invalidPet as Pet);
    await ApiHelper.logResponse(response, 'TC002_CreateInvalidPet');

    // Then: Validation error should be returned
    await ApiHelper.validateResponse(response, 405);
  });

  test('TC003_givenValidPetId_whenGettingPetById_thenPetDetailsReturned', async () => {
    // Given: A valid pet ID (from the previously created pet)
    expect(createdPetId).toBeDefined();

    // When: Getting the pet by ID
    const response = await petService.getPetById(createdPetId);
    await ApiHelper.logResponse(response, 'TC003_GetPetById');

    // Then: Pet details should be returned
    await ApiHelper.validateResponse(response, 200);
    const pet = await response.json();
    
    expect(pet).toHaveProperty('id', createdPetId);
    expect(pet).toHaveProperty('name');
    expect(pet).toHaveProperty('photoUrls');
    expect(pet).toHaveProperty('status');
  });

  test('TC004_givenInvalidPetId_whenGettingPetById_thenNotFoundErrorReturned', async () => {
    // Given: An invalid pet ID
    const invalidPetId = 999999;

    // When: Getting the pet by invalid ID
    const response = await petService.getPetById(invalidPetId);
    await ApiHelper.logResponse(response, 'TC004_GetPetByInvalidId');

    // Then: Not found error should be returned
    await ApiHelper.validateResponse(response, 404);
  });

  test('TC005_givenValidPetData_whenUpdatingPet_thenPetIsUpdatedSuccessfully', async () => {
    // Given: Valid pet data for update
    const updatedPetData: Pet = {
      ...validPetData,
      id: createdPetId,
      name: `UpdatedDog_${ApiHelper.generateRandomString()}`,
      status: 'sold'
    };

    // When: Updating the pet
    const response = await petService.updatePet(updatedPetData);
    await ApiHelper.logResponse(response, 'TC005_UpdatePet');

    // Then: Pet should be updated successfully
    await ApiHelper.validateResponse(response, 200);
    const updatedPet = await response.json();
    
    expect(updatedPet.id).toBe(createdPetId);
    expect(updatedPet.name).toBe(updatedPetData.name);
    expect(updatedPet.status).toBe('sold');
  });

  test('TC006_givenValidPetId_whenDeletingPet_thenPetIsDeletedSuccessfully', async () => {
    // Given: A valid pet ID
    expect(createdPetId).toBeDefined();

    // When: Deleting the pet
    const response = await petService.deletePet(createdPetId);
    await ApiHelper.logResponse(response, 'TC006_DeletePet');

    // Then: Pet should be deleted successfully
    await ApiHelper.validateResponse(response, 200);

    // Verify pet is actually deleted
    const getResponse = await petService.getPetById(createdPetId);
    await ApiHelper.validateResponse(getResponse, 404);
  });

  test('TC007_givenValidStatus_whenFindingPetsByStatus_thenPetsReturned', async () => {
    // Given: Valid status values
    const statuses = ['available', 'pending', 'sold'];

    for (const status of statuses) {
      // When: Finding pets by status
      const response = await petService.findPetsByStatus([status]);
      await ApiHelper.logResponse(response, `TC007_FindPetsByStatus_${status}`);

      // Then: Pets with the specified status should be returned
      await ApiHelper.validateResponse(response, 200);
      const pets = await response.json();
      
      expect(Array.isArray(pets)).toBeTruthy();
      if (pets.length > 0) {
        pets.forEach((pet: Pet) => {
          expect(pet.status).toBe(status);
        });
      }
    }
  });

  test('TC008_givenInvalidStatus_whenFindingPetsByStatus_thenValidationErrorReturned', async () => {
    // Given: Invalid status value
    const invalidStatus = ['invalid_status'];

    // When: Finding pets with invalid status
    const response = await petService.findPetsByStatus(invalidStatus);
    await ApiHelper.logResponse(response, 'TC008_FindPetsByInvalidStatus');

    // Then: Validation error should be returned
    await ApiHelper.validateResponse(response, 400);
  });
});
