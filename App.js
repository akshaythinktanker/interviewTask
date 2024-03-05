import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
const App = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async () => {
    setIsLoading(true);
    try {
      setProgress(progress + 0.1);
      await AsyncStorage.setItem('files', JSON.stringify(selectedFiles));
      setIsLoading(false);
      const data = await AsyncStorage.getItem('files');
      console.log('data', JSON.parse(data));
    } catch (error) {
      console.log('errAsync', err);
      setIsLoading(false);
    }
  };

  const documentPicker = async () => {
    await DocumentPicker.pick({allowMultiSelection: true})
      .then(res => {
        console.log('res', res);
        setSelectedFiles(res);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const renderItem = (item, index) => {
    console.log(item, 'item', index);
    return (
      <View style={styles.flatlistView}>
        <Text>{item?.item?.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <FlatList
        keyExtractor={item => item.id}
        data={selectedFiles}
        renderItem={renderItem}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          documentPicker();
        }}>
        <Text style={styles.buttonText}>Button</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          uploadFile();
        }}>
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>
      <View>
        <Progress.Bar progress={progress} width={200} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistView: {
    padding: 25,
    margin: 25,
  },
  button: {
    // height: 40,
    width: '25%',
    padding: 15,
    backgroundColor: 'blue',
    alignSelf: 'center',
    margin: 25,
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: 25,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default App;

/*  
Develop a file upload component to upload multiple files simultaneously.
 It should display progress
indicators for each file and should display a success or error message after the upload is complete.ˀ
*/
