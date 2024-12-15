import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          'http://192.168.29.106:3001/api/events/all-events',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const renderEventItem = ({item}) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => navigation.navigate('EventDetails', {eventId: item.id})}>
      <LinearGradient
        colors={['#F9F6F1', '#D1B39E']}
        style={styles.eventGradient}>
        <Text style={styles.eventName}>{item.event_title}</Text>
        <Text style={styles.eventDate}>
          {new Date(item.event_date).toLocaleDateString()}
        </Text>
        <Text style={styles.eventDetails}>{item.event_description}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderUpcomingEventItem = ({item}) => (
    <View style={styles.upcomingEventItem}>
      <Text style={styles.upcomingEventText}>
        {item.event_title} - {new Date(item.event_date).toLocaleDateString()}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#D9C8A1" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.notificationBar}>
        <Text style={styles.notificationText}>Upcoming Events:</Text>
        <FlatList
          data={events}
          horizontal
          renderItem={renderUpcomingEventItem}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.upcomingEventList}
        />
      </View>

      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.eventList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4E9',
  },
  notificationBar: {
    backgroundColor: '#D9C8A1',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#D1B39E',
  },
  notificationText: {
    color: '#3C3C3C',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  upcomingEventList: {
    marginTop: 10,
  },
  upcomingEventItem: {
    backgroundColor: '#F9F6F1',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    shadowColor: '#D1B39E',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  upcomingEventText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3C3C3C',
  },
  eventList: {
    padding: 10,
  },
  eventItem: {
    marginBottom: 15,
  },
  eventGradient: {
    backgroundColor: '#F9F6F1',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#D1B39E',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3C3C3C',
  },
  eventDate: {
    fontSize: 14,
    color: '#6C6A5B',
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 14,
    color: '#4A4A44',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});
