export const environment = {
  production: false,
  auth0: {
    domain: 'YOUR_AUTH0_DOMAIN', // e.g., 'dev-abc123.us.auth0.com'
    clientId: 'YOUR_AUTH0_CLIENT_ID', // e.g., 'aBcD1234567890eFgHiJ'
    authorizationParams: {
      redirect_uri: window.location.origin, // Automatically uses http://localhost:4200 in dev
      audience: 'YOUR_AUTH0_API_IDENTIFIER', // Optional: Your API identifier if using Auth0 API
    },
    httpInterceptor: {
      allowedList: [
        {
          uri: '/api/*', // Attach tokens to all API requests
          tokenOptions: {
            authorizationParams: {
              audience: 'YOUR_AUTH0_API_IDENTIFIER', // Match the audience above
            },
          },
        },
      ],
    },
  },
};
