const attempts = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 20;
const WINDOW_MS = 15 * 60 * 1000;

export function allowLoginAttempt(ip: string) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= LIMIT) return false;
  entry.count += 1;
  return true;
}

export function clearLoginAttempts(ip: string) {
  attempts.delete(ip);
}

