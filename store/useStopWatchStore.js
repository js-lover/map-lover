import { create } from 'zustand';

const useStopwatchStore = create((set, get) => ({
  // --- STATE ---
  isRunning: false,
  isVisible: false,
  isPaused: true,
  startTime: null,
  elapsedTime: 0,
  totalSeconds: 0,
  intervalId: null,

  // --- ACTIONS ---
  start: () => {
    set({ 
      isRunning: true, 
      isVisible: true, 
      isPaused: false, 
      startTime: Date.now() 
    });
    get()._startTick();
  },

  stop: () => {
    const { isRunning, startTime, elapsedTime, intervalId } = get();
    if (isRunning) {
      clearInterval(intervalId);
      set({ 
        elapsedTime: elapsedTime + (Date.now() - startTime), 
        startTime: null, 
        isRunning: false, 
        isPaused: true, 
        intervalId: null 
      });
    } else {
      set({ startTime: Date.now(), isRunning: true, isPaused: false });
      get()._startTick();
    }
  },

  // Alert anında duraklatma ve karar verme mekanizması
  finishWithPause: () => {
    const wasRunning = get().isRunning;
    if (wasRunning) {
      get().stop(); // Mevcut stop fonksiyonunu tetikler, süreyi kaydeder
    }
    return {
      confirm: () => get().reset(),
      cancel: () => { 
        if (wasRunning) get().start(); // Hayır denirse kaldığı yerden devam eder
      }
    };
  },

  reset: () => {
    if (get().intervalId) clearInterval(get().intervalId);
    set({ 
      isRunning: false, 
      isVisible: false, 
      isPaused: true, 
      startTime: null, 
      elapsedTime: 0, 
      totalSeconds: 0, 
      intervalId: null 
    });
  },

  // İç zamanlayıcı (Her saniye totalSeconds günceller)
  _startTick: () => {
    if (get().intervalId) clearInterval(get().intervalId);
    const id = setInterval(() => {
      const { startTime, elapsedTime } = get();
      const activeMs = startTime ? Date.now() - startTime : 0;
      set({ totalSeconds: Math.floor((elapsedTime + activeMs) / 1000) });
    }, 1000);
    set({ intervalId: id });
  },

  // UI için zamanı parçalara ayırma yardımcı fonksiyonu
  _calculateDisplayTime: (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return { hours: h, minute: m, second: s };
  }
}));

export default useStopwatchStore;