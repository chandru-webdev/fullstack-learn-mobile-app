import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSession } from '../context/Session';
import { colors } from '../theme';

const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? '';
const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ?? '';
const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? '';

export function LoginScreen() {
  const { login, register, loginGoogle } = useSession();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [googleEmailOpen, setGoogleEmailOpen] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');

  const clientId = webClientId || androidClientId || iosClientId;

  async function submit() {
    setError(null);
    setPending(true);
    try {
      if (mode === 'login') await login(username, password);
      else await register(username, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not continue');
    } finally {
      setPending(false);
    }
  }

  async function onGoogle() {
    setError(null);
    if (!clientId) {
      setGoogleEmailOpen(true);
      return;
    }
    try {
      setPending(true);
      const redirect = Linking.createURL('google');
      const authUrl =
        'https://accounts.google.com/o/oauth2/v2/auth' +
        `?client_id=${encodeURIComponent(clientId)}` +
        `&redirect_uri=${encodeURIComponent(redirect)}` +
        '&response_type=token&scope=email%20profile';
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirect);
      if (result.type !== 'success' || !('url' in result)) {
        throw new Error('Google sign-in was cancelled');
      }
      const hash = result.url.split('#')[1] ?? result.url.split('?')[1] ?? '';
      const token = new URLSearchParams(hash).get('access_token');
      if (!token) throw new Error('Google did not return a token');
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profile = (await res.json()) as { email?: string; name?: string };
      if (!profile.email) throw new Error('Google did not return an email');
      await loginGoogle(profile.email, profile.name);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Google sign-in failed');
    } finally {
      setPending(false);
    }
  }

  async function confirmGoogleEmail() {
    setError(null);
    setPending(true);
    try {
      await loginGoogle(googleEmail);
      setGoogleEmailOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Google sign-in failed');
    } finally {
      setPending(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrap}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.hero}>
        <Text style={styles.logo}>StudyPath</Text>
        <Text style={styles.title}>Your smart gateway to better learning</Text>
        <Text style={styles.sub}>Full stack topics, 30-day sprint, and a plan that stays on this phone.</Text>
      </View>

      <View style={styles.card}>
        <Pressable
          accessibilityRole="button"
          disabled={pending}
          onPress={onGoogle}
          style={styles.google}
        >
          <Ionicons name="logo-google" size={18} color="#EA4335" />
          <Text style={styles.googleText}>Continue with Google</Text>
        </Pressable>
        <Text style={styles.or}>or use email</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Username"
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={colors.muted}
          style={styles.input}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable accessibilityRole="button" onPress={submit} disabled={pending} style={styles.btn}>
          <Text style={styles.btnText}>
            {pending ? 'Please wait…' : mode === 'login' ? 'Get started' : 'Create account'}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            setMode(mode === 'login' ? 'register' : 'login');
            setError(null);
          }}
        >
          <Text style={styles.switch}>
            {mode === 'login' ? 'Create a new account' : 'Already have an account? Log in'}
          </Text>
        </Pressable>
      </View>

      <Modal visible={googleEmailOpen} transparent animationType="fade">
        <View style={styles.modalWrap}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Google account</Text>
            <Text style={styles.modalSub}>
              Add EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID for real Google OAuth. Until then, sign in with
              your Gmail — a new Google user still starts with empty courses.
            </Text>
            <TextInput
              value={googleEmail}
              onChangeText={setGoogleEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="you@gmail.com"
              placeholderTextColor={colors.muted}
              style={styles.input}
            />
            <Pressable accessibilityRole="button" onPress={confirmGoogleEmail} style={styles.btn}>
              <Text style={styles.btnText}>Continue with Google</Text>
            </Pressable>
            <Pressable onPress={() => setGoogleEmailOpen(false)}>
              <Text style={styles.switch}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.bg, justifyContent: 'flex-end' },
  hero: { paddingHorizontal: 24, paddingBottom: 18 },
  logo: { color: colors.purple, fontWeight: '800', letterSpacing: 0.4 },
  title: { fontSize: 32, fontWeight: '800', color: colors.ink, marginTop: 10, lineHeight: 38 },
  sub: { color: colors.muted, marginTop: 10, lineHeight: 20 },
  card: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    paddingBottom: 36,
  },
  google: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 16,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  googleText: { fontWeight: '700', color: colors.ink },
  or: { textAlign: 'center', color: colors.muted, marginVertical: 12 },
  input: {
    backgroundColor: colors.lilac,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: colors.ink,
    fontSize: 16,
    marginBottom: 10,
  },
  error: { color: '#C0392B', marginBottom: 8 },
  btn: {
    backgroundColor: colors.purpleDeep,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700' },
  switch: { textAlign: 'center', color: colors.purple, marginTop: 14, fontWeight: '600' },
  modalWrap: {
    flex: 1,
    backgroundColor: 'rgba(28,22,64,0.4)',
    justifyContent: 'center',
    padding: 22,
  },
  modalCard: { backgroundColor: colors.card, borderRadius: 22, padding: 18 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: colors.ink },
  modalSub: { color: colors.muted, marginVertical: 10, lineHeight: 20 },
});
