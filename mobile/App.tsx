import { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'

type HealthStatus = 'checking' | 'online' | 'offline'

const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000'

export default function App() {
  const [status, setStatus] = useState<HealthStatus>('checking')

  async function checkHealth() {
    setStatus('checking')
    try {
      const response = await fetch(`${apiUrl}/health`)
      const result: { status?: string } = await response.json()
      setStatus(response.ok && result.status === 'ok' ? 'online' : 'offline')
    } catch {
      setStatus('offline')
    }
  }

  useEffect(() => {
    void checkHealth()
  }, [])

  const message = {
    checking: 'Checking the API…',
    online: 'API is online',
    offline: 'Could not reach the API',
  }[status]

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>SERVICEPILOT</Text>
        <Text style={styles.title}>Project foundation</Text>
        <Text style={styles.description}>
          A small starting point for learning IT Support and IT Service Management.
        </Text>
        <View style={styles.statusRow} accessibilityLiveRegion="polite">
          {status === 'checking' ? <ActivityIndicator color="#2563eb" /> : <View style={[styles.dot, status === 'online' ? styles.online : styles.offline]} />}
          <Text style={styles.statusText}>{message}</Text>
        </View>
        <Pressable style={styles.button} onPress={() => void checkHealth()} accessibilityRole="button">
          <Text style={styles.buttonText}>Check again</Text>
        </Pressable>
        <Text style={styles.address}>API: {apiUrl}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f1f5f9',
  },
  card: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    padding: 28,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    gap: 16,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
  },
  eyebrow: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  title: {
    color: '#0f172a',
    fontSize: 30,
    fontWeight: '700',
  },
  description: {
    color: '#475569',
    fontSize: 16,
    lineHeight: 24,
  },
  statusRow: {
    minHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusText: {
    color: '#1e293b',
    fontSize: 15,
    fontWeight: '600',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  online: {
    backgroundColor: '#16a34a',
  },
  offline: {
    backgroundColor: '#dc2626',
  },
  button: {
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#2563eb',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  address: {
    color: '#64748b',
    fontSize: 12,
  },
})
