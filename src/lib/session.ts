export type LocalUser = {
  name: string;
  createdAt: number;
};

export type LocalSession = {
  name: string;
  expiresAt: number;
};

const USER_KEY = 'msb_user';
const SESSION_KEY = 'msb_session';
const APP_OPENED_KEY = 'msb_app_opened';

export function getLocalUser(): LocalUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as LocalUser) : null;
  } catch {
    return null;
  }
}

export function setLocalUser(user: LocalUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getLocalSession(): LocalSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as LocalSession;
    if (!session?.expiresAt || session.expiresAt < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

export function startLocalSession(name: string, ttlMs: number = 1000 * 60 * 60 * 24 * 7) {
  const session: LocalSession = { name, expiresAt: Date.now() + ttlMs };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearLocalSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function hasOpenedAppThisTab(): boolean {
  return sessionStorage.getItem(APP_OPENED_KEY) === '1';
}

export function markAppOpenedThisTab() {
  sessionStorage.setItem(APP_OPENED_KEY, '1');
}
