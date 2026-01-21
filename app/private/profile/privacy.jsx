import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeProvider';

const Privacy = () => {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Custom Header */}
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Gizlilik Politikası</Text>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>1. Giriş</Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        Menza olarak gizliliğinize önem veriyoruz. Bu politika, uygulamamızı kullandığınızda verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır. Menza, kullanıcı deneyimini en üst düzeyde tutarken gizlilik haklarınızı korumayı taahhüt eder.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>2. Konum Verileri</Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        Uygulamamızın temel işlevi olan yürüyüş takibi için yüksek hassasiyetli GPS verileri kullanılır. Bu veriler:
                        {"\n"}• Yürüyüş rotanızın harita üzerinde çizilmesi,
                        {"\n"}• Kat edilen mesafenin hesaplanması,
                        {"\n"}• Anlık ve ortalama temponunuzun belirlenmesi amacıyla toplanır.
                        {"\n"}{"\n"}Konum takibi sadece siz bir antrenman başlattığınızda aktif hale gelir ve antrenmanı bitirdiğinizde durdurulur.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>3. Sağlık ve Aktivite Verileri</Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        Yürüyüşleriniz sırasında adımlarınız ve yaktığınız tahmini kalori miktarı gibi aktivite verileri toplanır. Bu veriler tamamen cihazınızdaki sensörler ve matematiksel algoritmalar aracılığıyla hesaplanır ve sadece size özel istatistikler sunmak için kullanılır.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>4. Veri Depolama ve Güvenlik</Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        Profil bilgileriniz ve antrenman geçmişiniz, endüstri standardı güvenlik protokollerine sahip Supabase altyapısı üzerinde saklanır. Verileriniz şifrelenmiş olarak tutulur ve yetkisiz erişime karşı korunur.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>5. Veri Paylaşımı</Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        Kişisel verileriniz, konum geçmişiniz veya istatistikleriniz asla reklam verenlerle veya diğer üçüncü şahıslarla ticari amaçlarla paylaşılmaz. Menza, verilerinizi satmaz veya kiralamaz.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>6. Kullanıcı Hakları</Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        Dilediğiniz zaman geçmiş antrenman kayıtlarınızı silebilir veya profil ayarlarınızdan hesabınızı tamamen kapatabilirsiniz. Hesabınızı kapattığınızda, sunucularımızdaki tüm antrenman verileriniz kalıcı olarak silinir.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>7. Politika Değişiklikleri</Text>
                    <Text style={[styles.paragraph, { color: colors.textSecondary }]}>
                        Gizlilik politikamızda zaman zaman güncellemeler yapabiliriz. Önemli değişiklikler olması durumunda uygulama içi bildirimler aracılığıyla sizi bilgilendireceğiz.
                    </Text>
                </View>

                <View style={[styles.footer, { borderTopColor: colors.border }]}>
                    <Text style={[styles.updateText, { color: colors.textMuted }]}>Son Güncelleme: 20 Ocak 2026</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Privacy;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
    },
    paragraph: {
        fontSize: 15,
        lineHeight: 24,
        textAlign: 'justify',
    },
    footer: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        alignItems: 'center',
    },
    updateText: {
        fontSize: 12,
    },
});
