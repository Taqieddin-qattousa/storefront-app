// Environment configuration
// Note: Auth0 clientId is public and safe to commit
// Backend URL will be replaced after deployment

export const environment = {
  production: false,
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
          uri: '/api/users*',
          tokenOptions: {
            authorizationParams: {
              // audience: 'https://storefront-api'
            },
          },
        },
        {
          uri: '/api/orders*',
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
