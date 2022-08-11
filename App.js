/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const API_BASE_URL = 'https://cs-title-fetcher.herokuapp.com';

const CardRow = ({label, value}) => (
  <Text style={styles.cardRow}>
    <Text style={styles.cardRowLabel}>{label}: </Text> {value}
  </Text>
);

const Card = ({isDarkMode, title, imdbrating, type, genre, poster}) => (
  <View style={[styles.card, isDarkMode && styles.cardDark]}>
    <Image source={{uri: poster}} style={styles.cardImage} />
    <CardRow label="Title" value={title} />
    <CardRow label="Rating" value={imdbrating} />
    <CardRow label="Type" value={type} />
    <CardRow label="Genre" value={genre} />
  </View>
);

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [titles, setTitles] = useState([]);
  useEffect(() => {
    const fetchTitles = () =>
      fetch(`${API_BASE_URL}/api/titles?offset=0&limit=50`).then(res =>
        res.json(),
      );

    fetchTitles().then(({data}) => setTitles(data));
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter},
      ]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlatList
        ListHeaderComponent={
          <Text
            style={[
              styles.sectionTitle,
              {color: isDarkMode ? Colors.lighter : Colors.darker},
            ]}>
            Top Titles
          </Text>
        }
        data={titles}
        renderItem={({item}) => <Card {...item} isDarkMode={isDarkMode} />}
        keyExtractor={({id}) => id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 16,
    paddingHorizontal: 24,
  },
  card: {
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 8,
    borderColor: Colors.dark,
    borderWidth: 1,
    borderRadius: 4,
    color: Colors.light,
  },
  cardDark: {
    borderColor: Colors.lighter,
    color: Colors.dark,
    backgroundColor: Colors.light,
  },
  cardImage: {
    width: '30%',
    aspectRatio: 0.666,
    marginBottom: 10,
  },
  cardRow: {
    color: Colors.dark,
  },
  cardRowLabel: {
    fontWeight: '600',
  },
});

export default App;
