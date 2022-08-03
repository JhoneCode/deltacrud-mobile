import React, { useState } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, Text, Pressable, View, Image, Modal } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { launchImageLibrary } from 'react-native-image-picker';


import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

export function Form(props) {
  const [name, setName] = useState(props.name);
  const [address, setAddress] = useState(props.address);
  const [nameBorder, setNameBorder] = useState('#dddddd');
  const [addressBorder, setAddressBorder] = useState('#dddddd');
  const [image, setImage] = useState(null);
  const [isShown, setIsShown] = useState(props.visible);


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

  return (
    <>
    { isShown ?
      <><Text style={styles.modalTextTitle}>Preencha os campos a serem atualizados</Text>
        <View style={{flexDirection: 'column', alignItems: 'center', width: '80%', justifyContent: 'center', borderTopColor:'gray', borderTopWidth: 1}}>
          <TextInput 
            style={[styles.input, {borderColor: nameBorder}]} 
            placeholderTextColor='#d6d6d6' 
            placeholder='Digite o nome do aluno' 
            onChangeText={setName} 
            defaultValue={name}
            onFocus={() =>  setNameBorder('#4c46c8')} 
            onBlur={() => setNameBorder('#dddddd')}
          />
          <TextInput 
            style={[styles.input, {borderColor: addressBorder}]} 
            placeholderTextColor='#d6d6d6' 
            placeholder={'Digite o endereço do aluno'} 
            onChangeText={setAddress} 
            defaultValue={address}
            onFocus={() =>  setAddressBorder('#4c46c8')} 
            onBlur={() => setAddressBorder('#dddddd')}
          />
          <View>
            {image ? 
              <Image style={styles.image} source={{uri: image.uri}}/> : 
              <Image style={styles.image} source={require('../assets/image-placeholder.png')} />
            }
            {image ? 
                <MaterialIcons name='delete' size={32} style={styles.iconDelete} onPress={resetImageSelection} /> : null
            } 
          </View>
          <TouchableOpacity 
            style={image ? styles.buttonDisabled : styles.buttonPrimary}
            onPress={pickImageFromGalleryAsync}
          >
            <Text style={styles.text}>Escolher foto</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={[styles.button, styles.buttonConfirm]}
              onPress={() => {
                //update code
              }}
            >
              <Text style={styles.modalTextButtonConfirm}>Upload</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setIsShown(!isShown);

              }}
            >
            <Text style={styles.modalTextButtonCancel}>Fechar</Text>
          </Pressable>
          </View>
        </View></> : null}
  </>
  )
}




const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#18191A',
    opacity: .95,
    borderRadius: 20,
    paddingTop: 35,
    paddingBottom: 0,
    alignItems: 'center',
    shadowColor: '#4c46c8',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  formView: {
    margin: 20,
    backgroundColor: '#18191A',
    opacity: .98,
    borderRadius: 20,
    paddingTop: 35,
    paddingBottom: 0,
    alignItems: 'center',
    shadowColor: '#4c46c8',
    shadowOffset: {
      width: 0,
      height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5
},
  buttonPrimary: {
    marginTop: 20,
    width: '60%',
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#4c46c8',
    borderWidth: 1,

    alignItems: 'center',
  },
  text: {
    color: '#4c46c8',
    fontFamily: 'Inter_600SemiBold'
  },
  buttonDisabled: {
    display: 'none',
  },
  iconDelete: {
    color: '#4c46c8',
    position: 'relative',
    bottom: 25,
    left: 100,
  },
  image: {
    marginTop: 20,
    width: 120,
    height: 120,
    borderRadius: 20
  },
  buttonConfirm: {
    padding: 10,
    backgroundColor: 'transparent',
    width: '30%',
  },
  buttonClose: {
    padding: 10,
    backgroundColor: 'transparent',
    width: '30%',
  },
  modalTextTitle: {
    fontSize: 18,
    paddingHorizontal: 35,
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Inter_300Light'
  },
  modalTextName: {
    fontSize: 16,
    paddingHorizontal: 35,
    marginBottom: 15,
    textAlign: 'center',
    color: '#4c46c8',
    fontFamily: 'Inter_400Regular'
  },
  modalTextButtonConfirm: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#08f26e',
    fontFamily: 'Inter_600SemiBold'

  },
  modalTextButtonCancel: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#cf3c3f',
    fontFamily: 'Inter_600SemiBold'
  },
  input: {
    marginTop: 20,
    width: 220,
    height: 40,
    borderWidth: 1.5,
    borderRadius: 5,
    padding: 10,
    color: '#dddddd',
  },
  })