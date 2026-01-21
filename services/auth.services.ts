import { supabase } from '../lib/supabase';

//Register

export async function registerNewUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'menza://auth/callback',
    },
  });

  if (error) throw error;

  return data.user; // ← BURASI ÇOK ÖNEMLİ
}

//SignIn
export async function signInUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data.user; // Login olan kullanıcıyı geri dönder
}

//Log out

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}

//Current user

export async function getUserProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  if (error) throw error;

  return data;
}

// Delete account
export async function deleteUserAccount() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Oturum bulunamadı.');

  // Supabase RPC fonksiyonunu çağır (auth.users'dan siler)
  // Bu fonksiyonun Supabase SQL Editor'da oluşturulmuş olması gerekir.
  const { error: deleteError } = await supabase.rpc('delete_user');

  if (deleteError) throw deleteError;

  // Oturumu kapat (yerel temizlik için)
  await supabase.auth.signOut();

  return true;
}
