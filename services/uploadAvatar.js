import * as ImagePicker from "expo-image-picker";
import { supabase } from "../lib/supabase";

export async function pickAndUploadAvatar(userId, oldAvatarPath) {
  try {
    // 1️⃣ Fotoğraf seç
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return null;

    const image = result.assets[0];

    // 2️⃣ Dosyayı arrayBuffer olarak al
    const response = await fetch(image.uri);
    const arrayBuffer = await response.arrayBuffer();

    // 3️⃣ Dosya adı
    const fileExt = image.uri.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;

    // 4️⃣ Storage’a YENİ avatarı yükle
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, arrayBuffer, {
        contentType: image.mimeType ?? "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      console.log("Upload error:", uploadError);
      return null;
    }

    // 5️⃣ profiles tablosunu güncelle
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: fileName })
      .eq("id", userId);

    if (updateError) {
      console.log("Database update error:", updateError);
      return null;
    }

    // 6️⃣ 🔥 ESKİ AVATAR’I SİL (EN KRİTİK KISIM)
    if (oldAvatarPath) {
      const { error: deleteError } = await supabase.storage
        .from("avatars")
        .remove([oldAvatarPath]);

      if (deleteError) {
        console.log("Old avatar delete error:", deleteError);
        // ⚠️ burada return etmiyoruz → yeni avatar zaten aktif
      }
    }

    // 7️⃣ Public URL döndür
    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    return urlData.publicUrl;

  } catch (error) {
    console.log("Avatar yükleme hatası:", error);
    return null;
  }
}
