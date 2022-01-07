import { Response, Request } from 'express';
import config from '../../../config';
import { serializeSession } from '../../../services/session';
import { encrypt } from '../../../services/crypto';
import {
  exchangeAccessCodeForCredentials,
  getDiscordUserDetails,
  revokeToken,
} from '../../../services/auth';
import { createUser } from '../../../services/user';

export async function authDiscordRedirectController(
  req: Request,
  res: Response,
) {
  try {
    const { code } = req.query;
    if (code != null) {
      // Retrieve Discord User 'access_token' and 'refresh_token'
      // to retrieve user data from Discord
      const response = await exchangeAccessCodeForCredentials({
        client_id: config.discord.applicationId || 'unknown',
        client_secret: config.discord.clientSecret || 'unknown',
        grant_type: 'authorization_code',
        code: code.toString(),
        redirect_uri: config.discord.redirectUrl,
      });

      // Retrieve Discord user data
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        token_type: tokenType,
      } = response.data;
      const discordUser = await getDiscordUserDetails(accessToken, tokenType);

      // Save Discord user data in the database
      const { id, discriminator, username, avatar } = discordUser.data;
      const user = await createUser(
        {
          discordId: id,
          discriminator,
          name: username,
          avatar: avatar || undefined,
        },
        {
          accessToken: encrypt(accessToken),
          refreshToken: encrypt(refreshToken),
        },
      );

      // Init session
      const session = await serializeSession(req, user.id.toString());

      res.send({
        session: {
          expiresAt: session.expiresAt,
        },
        user: {
          id: user.id,
          avatar: user.avatar,
          name: user.name,
          discriminator: user.discriminator,
          tag: `${user?.name}#${user?.discriminator}`,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

export async function authDiscordRevokeController(req: Request, res: Response) {
  try {
    // Check if user is authenticated
    const userId = req.userId;
    if (userId == null) return res.sendStatus(401);

    const success = await revokeToken(userId);

    res.send({ success });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }

  res.sendStatus(401);
}
