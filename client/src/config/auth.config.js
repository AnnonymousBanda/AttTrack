const TENANT_ID = process.env.EXPO_PUBLIC_AZURE_TENANT_ID
const CLIENT_ID = process.env.EXPO_PUBLIC_AZURE_CLIENT_ID
const REDIRECT_URI = process.env.EXPO_PUBLIC_AZURE_REDIRECT_URI

const config = {
    issuer: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
    clientId: CLIENT_ID,
    redirectUrl: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read'],
    additionalParameters: {
        prompt: 'select_account',
    },
}

export { config }
