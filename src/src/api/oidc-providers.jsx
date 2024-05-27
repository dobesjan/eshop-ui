import { UserManager, WebStorageStateStore } from 'oidc-client';

const createUserManager = (providerConfig) => new UserManager({
  authority: providerConfig.authority,
  client_id: providerConfig.clientId,
  redirect_uri: providerConfig.redirectUri,
  response_type: 'code',
  scope: 'openid profile email api_scope offline_access',
  post_logout_redirect_uri: providerConfig.postLogoutRedirectUri,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  automaticSilentRenew: true,
  silent_redirect_uri: providerConfig.silentRedirectUri,
});

const providers = {
  provider1: createUserManager({
    authority: 'https://provider1.com',
    clientId: 'provider1-client-id',
    redirectUri: 'http://localhost:5173/callback/provider1',
    postLogoutRedirectUri: 'http://localhost:5173/',
    silentRedirectUri: 'http://localhost:5173/silent-renew.html',
  }),
  provider2: createUserManager({
    authority: 'https://provider2.com',
    clientId: 'provider2-client-id',
    redirectUri: 'http://localhost:5173/callback/provider2',
    postLogoutRedirectUri: 'http://localhost:5173/',
    silentRedirectUri: 'http://localhost:5173/silent-renew.html',
  }),
};

export default providers;
