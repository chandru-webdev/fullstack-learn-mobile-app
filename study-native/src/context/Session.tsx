import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  getSession,
  loadProgress,
  login as loginApi,
  loginWithGoogle as loginWithGoogleApi,
  logout as logoutApi,
  register as registerApi,
  saveProgress,
} from '../storage';
import type { UserProgress } from '../types';

type SessionValue = {
  booting: boolean;
  username: string | null;
  displayName: string | null;
  progress: UserProgress;
  login: (u: string, p: string) => Promise<void>;
  register: (u: string, p: string) => Promise<void>;
  loginGoogle: (email: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  setCompleted: (taskId: string, value: boolean) => void;
  setLearned: (taskId: string, value: boolean) => void;
};

const SessionContext = createContext<SessionValue | null>(null);

function prettyName(user: string) {
  if (user.startsWith('google:')) return user.slice(7).split('@')[0];
  return user;
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [booting, setBooting] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [progress, setProgress] = useState<UserProgress>({});
  const skipSave = useRef(true);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session) {
        const data = await loadProgress(session);
        skipSave.current = true;
        setProgress(data);
        setUsername(session);
        setDisplayName(prettyName(session));
      } else {
        skipSave.current = true;
        setUsername(null);
        setDisplayName(null);
        setProgress({});
      }
      setBooting(false);
    })();
  }, []);

  const login = useCallback(async (u: string, p: string) => {
    const name = await loginApi(u, p);
    const data = await loadProgress(name);
    skipSave.current = true;
    setProgress(data);
    setUsername(name);
    setDisplayName(prettyName(name));
  }, []);

  const register = useCallback(async (u: string, p: string) => {
    const name = await registerApi(u, p);
    skipSave.current = true;
    setProgress({});
    setUsername(name);
    setDisplayName(prettyName(name));
  }, []);

  const loginGoogle = useCallback(async (email: string, name?: string) => {
    const user = await loginWithGoogleApi(email, name);
    const data = await loadProgress(`google:${email.trim().toLowerCase()}`);
    skipSave.current = true;
    setProgress(data);
    setUsername(`google:${email.trim().toLowerCase()}`);
    setDisplayName(name?.trim() || user);
  }, []);

  const logout = useCallback(async () => {
    await logoutApi();
    skipSave.current = true;
    setUsername(null);
    setDisplayName(null);
    setProgress({});
  }, []);

  const setCompleted = useCallback((taskId: string, value: boolean) => {
    setProgress((prev) => {
      const current = prev[taskId] ?? { completed: false, todayILearned: false };
      return {
        ...prev,
        [taskId]: {
          completed: value,
          todayILearned: value ? current.todayILearned : false,
        },
      };
    });
  }, []);

  const setLearned = useCallback((taskId: string, value: boolean) => {
    setProgress((prev) => {
      const current = prev[taskId] ?? { completed: false, todayILearned: false };
      if (!current.completed) return prev;
      return {
        ...prev,
        [taskId]: { ...current, todayILearned: value },
      };
    });
  }, []);

  useEffect(() => {
    if (!username) return;
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    saveProgress(username, progress);
  }, [username, progress]);

  const value = useMemo(
    () => ({
      booting,
      username,
      displayName,
      progress,
      login,
      register,
      loginGoogle,
      logout,
      setCompleted,
      setLearned,
    }),
    [
      booting,
      username,
      displayName,
      progress,
      login,
      register,
      loginGoogle,
      logout,
      setCompleted,
      setLearned,
    ],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession required');
  return ctx;
}
