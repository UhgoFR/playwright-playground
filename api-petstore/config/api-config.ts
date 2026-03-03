export const API_CONFIG = {
  BASE_URL: 'https://petstore.swagger.io/v2',
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  API_KEY: 'special-key',
  TIMEOUT: 30000
};

export const ENDPOINTS = {
  PET: {
    BASE: '/pet',
    BY_ID: (petId: number) => `/pet/${petId}`,
    BY_STATUS: '/pet/findByStatus',
    BY_TAGS: '/pet/findByTags',
    UPLOAD_IMAGE: (petId: number) => `/pet/${petId}/uploadImage`,
    UPDATE_WITH_FORM: (petId: number) => `/pet/${petId}`
  },
  STORE: {
    INVENTORY: '/store/inventory',
    ORDER: '/store/order',
    ORDER_BY_ID: (orderId: number) => `/store/order/${orderId}`
  },
  USER: {
    BASE: '/user',
    BY_USERNAME: (username: string) => `/user/${username}`,
    LOGIN: '/user/login',
    LOGOUT: '/user/logout',
    CREATE_WITH_ARRAY: '/user/createWithArray',
    CREATE_WITH_LIST: '/user/createWithList'
  }
};

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500
};

export const PET_STATUS = {
  AVAILABLE: 'available',
  PENDING: 'pending',
  SOLD: 'sold'
} as const;

export const ORDER_STATUS = {
  PLACED: 'placed',
  APPROVED: 'approved',
  DELIVERED: 'delivered'
} as const;
