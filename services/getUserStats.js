import { supabase } from "@/lib/supabase";

// Yardımcı fonksiyon: Süre string'ini (HH:MM:SS veya MM:SS) saniyeye çevirir
const parseDurationToSeconds = (durationStr) => {
    if (!durationStr) return 0;
    if (typeof durationStr === 'number') return durationStr;

    const parts = durationStr.split(':').map(Number);
    if (parts.some(isNaN)) return 0;

    // HH:MM:SS
    if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    // MM:SS
    else if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    }
    return 0;
};

// Yardımcı fonksiyon: Verileri toplayıp istatistik döner
const calculateStats = (data) => {
    if (!data || data.length === 0) {
        return { totalDistance: 0, totalDuration: 0, totalCalories: 0, totalSteps: 0, totalWorkouts: 0 };
    }

    const totalDistance = data.reduce((total, workout) => total + (workout.distance || 0), 0);

    // Duration string olabileceği için parse ediyoruz
    const totalDuration = data.reduce((total, workout) => {
        return total + parseDurationToSeconds(workout.duration);
    }, 0);

    const totalSteps = data.reduce((total, workout) => total + (workout.steps || 0), 0);
    const totalCalories = data.reduce((total, workout) => total + (workout.calories || 0), 0);
    const totalWorkouts = data.length;

    return { totalDistance, totalDuration, totalCalories, totalSteps, totalWorkouts };
};

// Tüm verileri çekip JS tarafında filtrelemek (Timezone sorununu önlemek için)
const fetchAllUserWorkouts = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from('workout_history')
        .select('*')
        .eq('user_id', user.id);

    if (error) {
        console.log('Error fetching all workouts:', error);
        return [];
    }
    return data;
};

// Günlük İstatistikler
export async function getDailyUserStats() {
    const data = await fetchAllUserWorkouts();

    const now = new Date();
    // Local zamana göre gün başlangıcı
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const filtered = data.filter(item => {
        const itemDate = new Date(item.created_at);
        return itemDate >= startOfDay;
    });

    return calculateStats(filtered);
}

// Haftalık İstatistikler (Pazartesi'den itibaren)
export async function getWeeklyUserStats() {
    const data = await fetchAllUserWorkouts();

    const now = new Date();
    const day = now.getDay() || 7; // Pazar=0 -> 7
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day + 1);

    const filtered = data.filter(item => {
        const itemDate = new Date(item.created_at);
        return itemDate >= startOfWeek;
    });

    return calculateStats(filtered);
}

// Aylık İstatistikler
export async function getMonthlyUserStats() {
    const data = await fetchAllUserWorkouts();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const filtered = data.filter(item => {
        const itemDate = new Date(item.created_at);
        return itemDate >= startOfMonth;
    });

    return calculateStats(filtered);
}