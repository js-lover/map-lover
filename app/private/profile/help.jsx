import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeProvider';

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
    const { colors } = useTheme();
    return (
        <View style={styles.faqItem}>
            <TouchableOpacity
                style={styles.faqHeader}
                onPress={onToggle}
                activeOpacity={0.7}
            >
                <Text style={[styles.faqQuestion, { color: colors.text }]}>{question}</Text>
                <Feather name={isOpen ? "chevron-up" : "chevron-down"} size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            {isOpen && <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>{answer}</Text>}
        </View>
    );
};

const Help = () => {
    const { colors } = useTheme();
    const [expandedIndex, setExpandedIndex] = useState(null);

    const faqs = [
        {
            question: "Bildirimler gelmiyor",
            answer: "Cihazınızın sistem ayarlarından Menza için bildirim izinlerinin açık olduğundan emin olun. Ayrıca 'Düşük Güç Modu' bazen bildirimleri geciktirebilir."
        },
        {
            question: "Rota yanlış görünüyor",
            answer: "GPS hassasiyeti bina içlerinde veya kapalı havalarda düşebilir. En iyi sonuç için açık havada ve 'Yüksek Hassasiyetli Konum' ayarı açıkken yürüyüşe başlayın."
        },
        {
            question: "Hangi veriler toplanıyor?",
            answer: "Menza, sadece yürüyüş rotanızı, mesafenizi ve temponuzu hesaplamak için konum verilerinizi kullanır. Bu veriler profilinizde güvenli bir şekilde saklanır."
        },
        {
            question: "Antrenmanı nasıl silebiliriz?",
            answer: "Geçmiş ekranında silmek istediğiniz antrenmanın üzerine uzun süre basılı tutarak veya üzerindeki çöp kutusu ikonunu kullanarak kaydı silebilirsiniz."
        },
        {
            question: "Tempo (Pace) ne anlama geliyor?",
            answer: "Tempo, 1 kilometreyi kaç dakikada yürüdüğünüzü gösteren bir ölçüdür. Örneğin 10:00 tempo, 1 km'yi 10 dakikada tamamladığınız anlamına gelir."
        },
        {
            question: "Kalori hesabı nasıl yapılıyor?",
            answer: "Kalori hesabı, yürüdüğünüz mesafe ve temponuz temel alınarak standart yürüyüş algoritmaları ile yaklaşık olarak hesaplanmaktadır."
        },
        {
            question: "Çevrimdışı çalışıyor mu?",
            answer: "Yürüyüş takibi için GPS aktif olmalıdır. Ancak verilerinizi buluta kaydetmek ve geçmişinizi görüntülemek için internet bağlantısına ihtiyaç duyulur."
        }
    ];

    const handleToggle = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
            {/* Custom Header */}
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>Yardım & Destek</Text>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>Sıkça Sorulan Sorular</Text>

                <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    {faqs.map((faq, index) => (
                        <React.Fragment key={index}>
                            <FAQItem
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={expandedIndex === index}
                                onToggle={() => handleToggle(index)}
                            />
                            {index < faqs.length - 1 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
                        </React.Fragment>
                    ))}
                </View>

                <Text style={[styles.sectionHeader, { color: colors.textSecondary }]}>İletişim</Text>

                <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.contactItem}>
                        <View style={[styles.helpIconContainer, { backgroundColor: colors.primarySubtle }]}>
                            <Ionicons name="mail-outline" size={22} color={colors.primary} />
                        </View>
                        <View style={styles.helpContent}>
                            <Text style={[styles.helpTitle, { color: colors.text }]}>E-posta Adresimiz</Text>
                            <Text style={[styles.helpDescription, { color: colors.primary }]}>destek@menzaapp.com</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.appInfo}>
                    <MaterialCommunityIcons name="lightning-bolt" size={40} color={colors.primary} />
                    <Text style={[styles.appName, { color: colors.text }]}>Menza</Text>
                    <Text style={styles.versionText}>Versiyon 1.0.0</Text>
                    <Text style={styles.copyrightText}>© 2026 Menza Studio.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Help;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
        padding: 16,
        paddingBottom: 40,
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 12,
        marginLeft: 4,
        marginTop: 8,
    },
    card: {
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 24,
        borderWidth: 1,
    },
    faqItem: {
        padding: 16,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        fontSize: 16,
        fontWeight: '700',
        flex: 1,
        marginRight: 10,
    },
    faqAnswer: {
        fontSize: 14,
        marginTop: 10,
        lineHeight: 20,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    helpIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    helpContent: {
        flex: 1,
    },
    helpTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    helpDescription: {
        fontSize: 14,
        fontWeight: '600',
    },
    divider: {
        height: 1,
    },
    appInfo: {
        alignItems: 'center',
        marginTop: 20,
        paddingBottom: 20,
    },
    appName: {
        fontSize: 24,
        fontWeight: '900',
        marginTop: 8,
    },
    versionText: {
        fontSize: 13,
        color: '#64748b',
        marginTop: 4,
    },
    copyrightText: {
        fontSize: 11,
        color: '#475569',
        marginTop: 12,
    },
});
