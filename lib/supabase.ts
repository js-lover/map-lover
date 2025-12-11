// lib/supabase.ts

import { createClient } from '@supabase/supabase-js';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import Constants from 'expo-constants';

// ENV değerlerini çek (EAS Build veya app.config.js içine yazılmış)
const SUPABASE_URL = Constants.expoConfig?.extra?.supabaseUrl;
const SUPABASE_ANON_KEY = Constants.expoConfig?.extra?.supabaseAnonKey;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Supabase env variables missing!', {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
  });
}

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    console.debug('getItem', { key });
    return getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    if (value.length > 2048) {
      console.warn('Value stored in SecureStore exceeds 2048 bytes — may fail on some devices.');
    }
    return setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return deleteItemAsync(key);
  },
};

export const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
