import { create } from "zustand";

const useWorkoutSummaryStore = create((set) => ({
  summary: null, // Başlangıçta boş
  isModalVisible: false,

  // Yürüyüş bittiğinde çağrılacak fonksiyon
  setSummary: (data) => set({
    summary: {
      workoutName: data.workoutName || `${new Date().toLocaleDateString()}`,
      distance: data.distance,   // Metre cinsinden
      duration: data.duration,   // Saniye cinsinden
      steps: data.steps,
      pace: data.pace,
      calories: data.calories,
      path: data.path,           // [{latitude, longitude, timestamp}, ...] dizisi
      completedAt: new Date().toISOString()
    },
    isModalVisible: true
  }),

  closeModal: () => set({ isModalVisible: false, summary: null })
}));

export default useWorkoutSummaryStore;