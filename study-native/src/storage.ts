import AsyncStorage from '@react-native-async-storage/async-storage';
import type { MockUser, UserProgress } from './types';

const USERS = 'sp.users.v1';
const SESSION = 'sp.session.v1';

function progressKey(username: string) {
  return `sp.progress.v1.${username.trim().toLowerCase()}`;
}

export async function getUsers(): Promise<MockUser[]> {
  const raw = await AsyncStorage.getItem(USERS);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as MockUser[];
  } catch {
    return [];
  }
}

async function setUsers(users: MockUser[]) {
  await AsyncStorage.setItem(USERS, JSON.stringify(users));
}

export async function getSession(): Promise<string | null> {
  return AsyncStorage.getItem(SESSION);
}

export async function login(username: string, password: string) {
  const name = username.trim();
  const users = await getUsers();
  const match = users.find(
    (u) => u.username.toLowerCase() === name.toLowerCase() && u.password === password,
  );
  if (!match) throw new Error('Invalid username or password');
  await AsyncStorage.setItem(SESSION, match.username);
  return match.username;
}

export async function register(username: string, password: string) {
  const name = username.trim();
  if (name.length < 3) throw new Error('Username must be at least 3 characters');
  if (password.length < 6) throw new Error('Password must be at least 6 characters');
  const users = await getUsers();
  if (users.some((u) => u.username.toLowerCase() === name.toLowerCase())) {
    throw new Error('That username is already taken');
  }
  const user: MockUser = {
    username: name,
    password,
    createdAt: new Date().toISOString(),
  };
  await setUsers([...users, user]);
  await AsyncStorage.setItem(progressKey(name), JSON.stringify({}));
  await AsyncStorage.setItem(SESSION, name);
  return name;
}

export async function loginWithGoogle(email: string, displayName?: string) {
  const clean = email.trim().toLowerCase();
  if (!clean.includes('@')) throw new Error('A Google email is required');
  const username = `google:${clean}`;
  const users = await getUsers();
  const existing = users.find((u) => u.username.toLowerCase() === username);
  if (!existing) {
    const user: MockUser = {
      username,
      password: '__google__',
      createdAt: new Date().toISOString(),
      provider: 'google',
      email: clean,
    };
    await setUsers([...users, user]);
    await AsyncStorage.setItem(progressKey(username), JSON.stringify({}));
  }
  await AsyncStorage.setItem(SESSION, username);
  return displayName?.trim() || clean.split('@')[0];
}

export async function logout() {
  await AsyncStorage.removeItem(SESSION);
}

export async function loadProgress(username: string): Promise<UserProgress> {
  const raw = await AsyncStorage.getItem(progressKey(username));
  if (!raw) return {};
  try {
    return JSON.parse(raw) as UserProgress;
  } catch {
    return {};
  }
}

export async function saveProgress(username: string, progress: UserProgress) {
  await AsyncStorage.setItem(progressKey(username), JSON.stringify(progress));
}
