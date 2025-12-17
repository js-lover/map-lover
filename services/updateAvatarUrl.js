import { supabase } from "../lib/supabase";

export async function updateAvatarUrl(userId, filePath) {
  const { error } = await supabase
    .from("profiles")
    .update({ avatar_url: filePath })
    .eq("id", userId);

  if (error) throw error;
}
