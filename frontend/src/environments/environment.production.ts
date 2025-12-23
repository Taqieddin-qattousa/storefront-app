// Production environment configuration for Render deployment
// This file is safe to commit as it uses public Auth0 credentials
// Update the API URL after deploying your backend

export const environment = {
  production: true,
  apiUrl: 'https://YOUR-BACKEND-URL.onrender.com', // Update this after deploying backend
  auth0: {
    domain: 'dev-omcgefrdf5yqkm0x.us.auth0.com',
    clientId: 'XKgkaKmCCwrSXMapJ6fd8EMIZ4JjGg1X',
    authorizationParams: {
      redirect_uri: window.location.origin,
      // audience: 'https://storefront-api', // Keep commented for login to work
    },
    httpInterceptor: {
      allowedList: [
        {
          uri: 'https://YOUR-BACKEND-URL.onrender.com/users*', // Update after backend deploy
          tokenOptions: {
            authorizationParams: {
              // audience: 'https://storefront-api'
            },
          },
        },
        {
          uri: 'https://YOUR-BACKEND-URL.onrender.com/orders*', // Update after backend deploy
          tokenOptions: {
            authorizationParams: {
              // audience: 'https://storefront-api'
            },
          },
        },
      ],
    },
  },
};
