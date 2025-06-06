import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function RecorderScreen() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [summaries, setSummaries] = useState<string[]>([]);

  const toggleRecording = () => {
    setRecording(!recording);
    if (!recording) {
      // placeholder transcript and summary generation
      const newSummary = `Summary point ${summaries.length + 1}`;
      setSummaries([...summaries, newSummary]);
    }
  };

  const renderSummary = ({ item, index }: { item: string; index: number }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity
          onPress={() =>
            setSummaries(summaries.filter((_, i) => i !== index))
          }
          style={styles.delete}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      )}
    >
      <View style={styles.summaryItem}>
        <Text>{item}</Text>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.recordButton, recording && styles.recording]}
        onPress={toggleRecording}
      >
        <Text style={styles.recordText}>{recording ? 'Stop' : 'Record'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadText}>Upload Audio File</Text>
      </TouchableOpacity>
      <View style={styles.transcriptBox}>
        <Text style={styles.transcript}>{transcript || 'Transcription...'}</Text>
      </View>
      <FlatList
        data={summaries}
        keyExtractor={(item, i) => `${item}-${i}`}
        renderItem={renderSummary}
        contentContainerStyle={{ paddingTop: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  recordButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  recording: {
    backgroundColor: '#ef4444',
  },
  recordText: {
    color: '#fff',
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  uploadText: {
    color: '#fff',
    fontWeight: '600',
  },
  transcriptBox: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  transcript: {
    color: '#6b7280',
  },
  summaryItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  delete: {
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 4,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
});
