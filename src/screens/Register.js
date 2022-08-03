import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, SafeAreaView, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { launchImageLibrary } from 'react-native-image-picker';
import  axios  from 'axios';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  inter_500Medium,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';



export function Register() {
  useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    inter_500Medium,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [nameBorder, setNameBorder] = useState('#dddddd');
  const [addressBorder, setAddressBorder] = useState('#dddddd');
  const [ isLoading, setIsLoading] = useState(false);


  const pickImageFromGalleryAsync = async () => {

    const options = {
      imageType: 'photo',
    }
  
    const result = await launchImageLibrary(options);
  
    if(result.assets) {
      setImage(result.assets[0]);
    }
  }
  
  const resetImageSelection = () => {
    setImage(null);
  }
  
  const handleCreate = async () => {
    setIsLoading(true);
    const data = new FormData();
    data.append('name', name);
    data.append('address', address);
    data.append('file', {
      name: image.fileName,
      type: image.type,
      uri: image.uri
    });
  
    try{
      response = await axios({
        url: 'http://10.0.0.105:3000/alumns', 
        headers: {
          'Authorization': '',
          'Content-Type': 'multipart/form-data'
        },
        data: data,
        method: 'POST'
      });
    } catch(error){
    console.error(error);
  }
  finally {
    setIsLoading(false);
    }
  }
  
  return (
      <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
        style={styles.container}
      >
        <Text style={styles.text}>Cadastre um novo aluno</Text>
          <TextInput 
            keyboardAppearance='dark'
            style={[styles.input, {borderColor: nameBorder}]} 
            placeholderTextColor={`${nameBorder === '#cf3c3f' ? '#cf3c3f' : '#dddddd'}`} 
            placeholder={`${nameBorder === '#cf3c3f' ? '*este campo é obrigatório' : 'Digite o endereço do aluno'}`} 
            onChangeText={setName} 
            onFocus={() =>  setNameBorder('#4c46c8')} 
            onBlur={() => {
              if (name == '') {
                setNameBorder('#cf3c3f');

              } else {
              setNameBorder('#dddddd');
              }
            }}
          />
          <TextInput 
            keyboardAppearance='dark'
            style={[styles.input, {borderColor: addressBorder}]} 
            placeholderTextColor={`${addressBorder === '#cf3c3f' ? '#cf3c3f' : '#dddddd'}`} 
            placeholder={`${addressBorder === '#cf3c3f' ? '*este campo é obrigatório' : 'Digite o endereço do aluno'}`} 
            onChangeText={setAddress} 
            onFocus={() =>  setAddressBorder('#4c46c8')} 
            onBlur={() => {
              if (address == '') {
                setAddressBorder('#cf3c3f');

              } else {
              setAddressBorder('#dddddd');
              }
          }}
          />
        <View>
          {image ? 
            <Image style={styles.image} source={{uri: image.uri}}/> : 
            <Image style={styles.image} source={require('../assets/image-placeholder.png')} />
          }
          {image ? 
            <MaterialIcons name='delete' size={40} style={styles.icon} onPress={resetImageSelection} /> : null
          }
        </View>
        <TouchableOpacity 
        disabled={image}
          style={image ? styles.buttonDisabled : styles.buttonPrimary}
          onPress={pickImageFromGalleryAsync}
        >
          <Text style={image ? styles.textFaded : styles.textSecundary}>Escolher foto</Text>
        </TouchableOpacity>
        <TouchableOpacity
        disabled={!image}
        style={(!image || name == '' || address == '') ? styles.buttonDisabled : styles.buttonSecundary}
          onPress={handleCreate}
        >
          { isLoading ? <ActivityIndicator color='#eeeeee'/>
          : <Text style={(!image || name == '' || address == '') ? styles.textFaded : styles.textPrimary}>Upload</Text>}
        </TouchableOpacity>
      </ScrollView>
  );
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18191A',
    paddingVertical: 50,

  },
  text: {
    color: '#eeeeee',
    fontWeight: 'bold',
    fontFamily: 'inter_700bold',
    letterSpacing: 0.5,
    fontSize: 20,
  },
  textPrimary: {
    color: '#eeeeee',
    fontWeight: 'bold',
    fontFamily: 'inter_700bold',
    letterSpacing: 0.5,
    fontSize: 16,
  },
  textSecundary: {
    color: '#4c46c8',
    fontWeight: 'bold',
    fontFamily: 'inter_700bold',
    letterSpacing: 0.5,
    fontSize: 16,
  },
  textFaded: {
    color: '#dddddd',
    fontWeight: 'bold',
    fontFamily: 'inter_700bold',
    letterSpacing: 0.5,
    fontSize: 16,
  },
  buttonPrimary: {
    marginTop: 20,
    width: '50%',
    backgroundColor: '#18191A',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4c46c8',
  },
  buttonSecundary: {
    marginTop: 20,
    width: '50%',
    backgroundColor: '#4c46c8',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    width: '50%',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#3e3e3e',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    opacity: 0.3,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 25,
    margin: 10
  },
  input: {
    width: '70%',
    height: 50,
    margin: 12,
    borderWidth: 1.5,
    borderColor: '#dddddd',
    borderRadius: 5,
    padding: 10,
    color: '#dddddd',
    fontFamily: 'Inter_700Bold'
  },
  icon: {
    color: '#cf3c3f',
    position: 'absolute',
    left: 155,
    bottom: 4

  }
});
