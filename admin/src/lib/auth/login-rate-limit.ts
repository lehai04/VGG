const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const forgotPasswordAttempts = new Map<string, { count: number; resetAt: number }>();

const LOGIN_LIMIT = 20;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

const FORGOT_PASSWORD_LIMIT = 5;
const FORGOT_PASSWORD_WINDOW_MS = 15 * 60 * 1000;

export function allowLoginAttempt(ip: string) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return true;
  }
  if (entry.count >= LOGIN_LIMIT) return false;
  entry.count += 1;
  return true;
}

export function clearLoginAttempts(ip: string) {
  loginAttempts.delete(ip);
}

export function allowForgotPasswordAttempt(key: string) {
  const now = Date.now();
  const entry = forgotPasswordAttempts.get(key);
  if (!entry || entry.resetAt <= now) {
    forgotPasswordAttempts.set(key, { count: 1, resetAt: now + FORGOT_PASSWORD_WINDOW_MS });
    return true;
  }
  if (entry.count >= FORGOT_PASSWORD_LIMIT) return false;
  entry.count += 1;
  return true;
}

export function clearForgotPasswordAttempts(key: string) {
  forgotPasswordAttempts.delete(key);
}
