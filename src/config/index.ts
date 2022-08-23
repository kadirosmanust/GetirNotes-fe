export const CONFIG_PROD = {
  URL: {
    BACKEND_URL: 'https://getir-notes.herokuapp.com/api/'
  },
  ENDPOINTS: {
    NOTES: 'notes'
  }
};

export const CONFIG_DEV = {
  ...CONFIG_PROD,
  URL: {
    BACKEND_URL: 'http://localhost:7333/api/'
  }
};

export const CONFIG = process.env.NODE_ENV === 'production' ? CONFIG_PROD : CONFIG_DEV;
