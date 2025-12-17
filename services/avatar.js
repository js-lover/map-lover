import * as ImagePicker from 'expo-image-picker';

export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1], // kare kırpma
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri; // seçilen fotoğrafın yolu
  }

  return null;
}

import { supabase } from '@/lib/supabase';
import * as FileSystem from 'expo-file-system';

export async function uploadAvatar(uri, userId) {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const filePath = `users/${userId}.jpg`;

  const { error } = await supabase.storage
    .from('avatars')
    .upload(filePath, Buffer.from(base64, 'base64'), {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) throw error;

  return filePath;
}


export async function updateUserAvatar(userId, filePath) {
  const { error } = await supabase
    .from('profiles')
    .update({ avatar_url: filePath })
    .eq('id', userId);

  if (error) throw error;
}
