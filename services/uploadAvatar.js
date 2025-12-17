import * as ImagePicker from "expo-image-picker";
import { supabase } from "../lib/supabase";

export async function pickAndUploadAvatar(userId) {
  try {
    // 1️⃣ Fotoğraf seç
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return null;

    const image = result.assets[0];

    // 2️⃣ ArrayBuffer al
    const response = await fetch(image.uri);
    const arrayBuffer = await response.arrayBuffer();

    // 3️⃣ SABİT dosya adı (overwrite)
    const fileName = `${userId}.jpg`;

    // 4️⃣ Upload (UPsert 🔥)
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, arrayBuffer, {
        contentType: image.mimeType ?? "image/jpeg",
        upsert: true, // 🔥 overwrite
      });

    if (uploadError) {
      console.log("Upload error:", uploadError);
      return null;
    }

    // 5️⃣ DB update (sabit path)
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: fileName })
      .eq("id", userId);

    if (updateError) {
      console.log("DB update error:", updateError);
      return null;
    }

    // 6️⃣ Cache busting public URL
    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    return `${data.publicUrl}?t=${Date.now()}`;

  } catch (error) {
    console.log("Avatar yükleme hatası:", error);
    return null;
  }
}
