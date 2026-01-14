import { supabase } from "@/lib/supabase";

/**
 * WorkoutHistoryService: Antrenman verilerini yöneten merkezi servis.
 */
export const WorkoutHistoryService = {
  
  /**
   * CREATE: Yeni bir antrenman kaydı oluşturur.
   * user_id otomatik olarak aktif oturumdan alınır.
   */
  async createWorkout(workoutData) {
    try {
      // Aktif kullanıcı oturumunu kontrol et
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("Oturum doğrulanamadı. Lütfen tekrar giriş yapın.");
      }

      const { data, error } = await supabase
        .from('workout_history')
        .insert([
          {
            ...workoutData,
            user_id: user.id // Güvenli ID ataması
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Create Workout Error:", error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * READ: Kullanıcının sadece kendisine ait antrenmanlarını listeler.
   */
  async getUserWorkouts() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('workout_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  /**
   * READ: Tek bir antrenman detayını getirir.
   */
  async getWorkoutById(workoutId) {
    const { data, error } = await supabase
      .from('workout_history')
      .select('*')
      .eq('id', workoutId)
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data };
  },

  /**
   * UPDATE: Antrenman bilgilerini günceller.
   */
  async updateWorkout(workoutId, updates) {
    const { data, error } = await supabase
      .from('workout_history')
      .update(updates)
      .eq('id', workoutId)
      .select()
      .single();

    if (error) return { success: false, error: error.message };
    return { success: true, data };
  },

  /**
   * DELETE: Antrenmanı siler.
   */
  async deleteWorkout(workoutId) {
    const { error } = await supabase
      .from('workout_history')
      .delete()
      .eq('id', workoutId);

    if (error) return { success: false, error: error.message };
    return { success: true };
  }
};