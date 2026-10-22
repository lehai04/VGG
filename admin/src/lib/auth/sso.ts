import { randomBytes, createHmac } from "node:crypto";

export type SsoProvider = "microsoft" | "google";

export interface SsoUserInfo {
  email: string;
  name?: string | null;
  provider: SsoProvider;
  providerId?: string;
}

export const SSO_STATE_COOKIE = "vgg_sso_state";

const STATE_SECRET = process.env.SESSION_SECRET || "vgg-sso-state-secret-key-salt";

export function createSsoState(provider: SsoProvider, returnTo = "/admin/dashboard"): { state: string; cookieValue: string } {
  const nonce = randomBytes(16).toString("hex");
  const payload = JSON.stringify({ provider, nonce, returnTo, ts: Date.now() });
  const hmac = createHmac("sha256", STATE_SECRET).update(payload).digest("hex");
  const cookieValue = Buffer.from(JSON.stringify({ payload, hmac })).toString("base64url");
  return { state: nonce, cookieValue };
}

export function verifySsoState(cookieValue: string | null | undefined, expectedNonce: string, expectedProvider: SsoProvider): { ok: boolean; returnTo: string } {
  if (!cookieValue) return { ok: false, returnTo: "/admin/dashboard" };
  try {
    const raw = Buffer.from(cookieValue, "base64url").toString("utf-8");
    const { payload, hmac } = JSON.parse(raw);
    const expectedHmac = createHmac("sha256", STATE_SECRET).update(payload).digest("hex");
    if (hmac !== expectedHmac) return { ok: false, returnTo: "/admin/dashboard" };
    const data = JSON.parse(payload) as { provider: SsoProvider; nonce: string; returnTo: string; ts: number };
    if (data.nonce !== expectedNonce || data.provider !== expectedProvider) return { ok: false, returnTo: "/admin/dashboard" };
    // Expiration: 15 minutes
    if (Date.now() - data.ts > 15 * 60 * 1000) return { ok: false, returnTo: "/admin/dashboard" };
    return { ok: true, returnTo: data.returnTo || "/admin/dashboard" };
  } catch {
    return { ok: false, returnTo: "/admin/dashboard" };
  }
}

export function getSsoConfig(provider: SsoProvider) {
  if (provider === "microsoft") {
    const tenantId = process.env.SSO_MICROSOFT_TENANT_ID || "common";
    return {
      provider: "microsoft" as const,
      clientId: process.env.SSO_MICROSOFT_CLIENT_ID || "",
      clientSecret: process.env.SSO_MICROSOFT_CLIENT_SECRET || "",
      authUrl: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`,
      tokenUrl: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      userInfoUrl: "https://graph.microsoft.com/v1.0/me",
      scope: "openid profile email User.Read",
      isConfigured: Boolean(process.env.SSO_MICROSOFT_CLIENT_ID && process.env.SSO_MICROSOFT_CLIENT_SECRET),
    };
  }

  return {
    provider: "google" as const,
    clientId: process.env.SSO_GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.SSO_GOOGLE_CLIENT_SECRET || "",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    userInfoUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
    scope: "openid profile email",
    isConfigured: Boolean(process.env.SSO_GOOGLE_CLIENT_ID && process.env.SSO_GOOGLE_CLIENT_SECRET),
  };
}

export function buildAuthorizationUrl(provider: SsoProvider, state: string, redirectUri: string): string {
  const config = getSsoConfig(provider);
  const params = new URLSearchParams({
    client_id: config.clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    response_mode: "query",
    scope: config.scope,
    state,
  });

  if (provider === "google") {
    params.set("access_type", "online");
    params.set("prompt", "select_account");
  } else if (provider === "microsoft") {
    params.set("prompt", "select_account");
  }

  return `${config.authUrl}?${params.toString()}`;
}

export async function exchangeCodeForUserInfo(
  provider: SsoProvider,
  code: string,
  redirectUri: string,
): Promise<SsoUserInfo> {
  const config = getSsoConfig(provider);
  if (!config.isConfigured) {
    throw new Error(`SSO provider ${provider} is not configured with CLIENT_ID and CLIENT_SECRET.`);
  }

  const tokenParams = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  const tokenRes = await fetch(config.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: tokenParams.toString(),
  });

  if (!tokenRes.ok) {
    const errorBody = await tokenRes.text().catch(() => "");
    throw new Error(`Token exchange failed for ${provider} (${tokenRes.status}): ${errorBody}`);
  }

  const tokenData = (await tokenRes.json()) as { access_token: string };
  const accessToken = tokenData.access_token;

  const userRes = await fetch(config.userInfoUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!userRes.ok) {
    const errorBody = await userRes.text().catch(() => "");
    throw new Error(`Failed to fetch user info from ${provider} (${userRes.status}): ${errorBody}`);
  }

  const userData = (await userRes.json()) as Record<string, unknown>;

  if (provider === "microsoft") {
    const mail = (userData.mail as string) || (userData.userPrincipalName as string) || "";
    return {
      email: mail.trim().toLowerCase(),
      name: (userData.displayName as string) || null,
      provider: "microsoft",
      providerId: (userData.id as string) || undefined,
    };
  } else {
    const mail = (userData.email as string) || "";
    return {
      email: mail.trim().toLowerCase(),
      name: (userData.name as string) || null,
      provider: "google",
      providerId: (userData.sub as string) || undefined,
    };
  }
}
