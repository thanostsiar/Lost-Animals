export const oktaConfig = {
    clientId: '0oae864kg2c6mNgYg5d7',
    issuer: 'https://dev-24350379.okta.com/oauth2/default',
    redirectUri: window.location.origin + '/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true
}