import appConfig from './app.config';
import { sprintf } from '../utils/sprintf';

const apiEndpoint = 'https://discord.com/api/v8';

export default {
  applicationId: process.env.DISCORD_APPLICATION_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  apiEndpoint,
  redirectUrl: sprintf(
    process.env.DISCORD_REDIRECT_URL || '',
    appConfig.version,
  ),

  routes: {
    oauth2Token: `${apiEndpoint}/oauth2/token`,
    oauth2User: `${apiEndpoint}/users/@me`,
    revokeToken: `${apiEndpoint}/oauth2/token/revoke`,
    imageBase: `https://cdn.discordapp.com`,
  },
};

// Localhost
// https://discord.com/api/oauth2/authorize?client_id=927198260530122773&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Fv1%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify

// dronies.watch
// https://discord.com/api/oauth2/authorize?client_id=927198260530122773&redirect_uri=https%3A%2F%2Fapi.dronies.watch%2Fv1%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify
