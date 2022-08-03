import React, { useState } from 'react';
import { TextInput, Modal, TouchableOpacity, StyleSheet, Text, Pressable, View, Image, ActivityIndicator } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { launchImageLibrary } from 'react-native-image-picker';

import axios from 'axios';
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

export function UpdateModal(props) {

  const [modalVisible, setModalVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [name, setName] = useState(props.name);
  const [address, setAddress] = useState(props.address);
  const [nameBorder, setNameBorder] = useState('#dddddd');
  const [addressBorder, setAddressBorder] = useState('#dddddd');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleUpdate = async () => {
    setIsLoading(true);
    console.log(props.id);

    let abortController = new AbortController()
    const timeout = setTimeout(() => {
        abortController.abort()
        console.log("Aborted")
        setIsLoading(false)
    }, 4000);

    const data = new FormData();
    data.append('name', name);
    data.append('address', address);
    if (image) {
      data.append('file', {
        name: image.fileName,
        type: image.type,
        uri: image.uri
      
      })
    };
  
    try{
      response = await axios({
        url: `http://10.0.0.105:3000/alumns/${props.id}`, 
        headers: {
          'Authorization': '',
          'Content-Type': 'multipart/form-data'
        },
        data: data,
        method: 'PUT',
        signal: abortController.signal,
      });
    } catch(error){
      setIsLoading(false);
    console.error(Error);

    } finally{
      props.refresh();
      clearTimeout(timeout);
      setIsLoading(false);
      setModalVisible(!modalVisible);

    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
        { !formVisible ?
          <View style={styles.modalView}>
            <Text style={styles.modalTextTitle}>Deseja atualizar o aluno?</Text>
            <Text style={styles.modalTextName}>{props.name}</Text>
            <View style={{flexDirection: 'row', borderTopColor:'#eeeeee', borderTopWidth: 1, width: '90%'}}>
              <Pressable
                style={styles.button}
                onPress={() => setFormVisible(!formVisible)}
              >
                <Text style={styles.modalTextButtonConfirm}>Atualizar</Text>
              </Pressable>
              <View style={{backgroundColor: '#eeeeee', width: 1, height: '80%'}} />
              <Pressable
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalTextButtonCancel}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
           :
          <View style={styles.formView}>
            <Text style={styles.modalTextTitle}>Preencha os campos que deseja atualizar</Text>
            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderTopColor:'#eeeeee', borderTopWidth: 1}}>
              <TextInput 
                keyboardAppearance='dark'
                style={[styles.input, {borderColor: nameBorder}]} 
                placeholderTextColor='#d6d6d6' 
                placeholder='Digite o nome do aluno' 
                onChangeText={setName} 
                defaultValue={name}
                onFocus={() =>  setNameBorder('#4c46c8')} 
                onBlur={() => setNameBorder('#dddddd')}
              />
              <TextInput 
                keyboardAppearance='dark'
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
              <View style={{flexDirection: 'row', borderTopColor:'#eeeeee', borderTopWidth: 1}}>
                <Pressable
                  style={styles.button}
                  onPress={handleUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? <ActivityIndicator color='#4c46c8'/> : <Text style={styles.modalTextButtonConfirm}>Upload</Text>}
                </Pressable>
                <View style={{backgroundColor: '#eeeeee', width: 1, height: '80%'}} />

                <Pressable
                  style={styles.button}
                  onPress={() => {
                    setFormVisible(!formVisible)
                    setModalVisible(!modalVisible)
                  }}
                >
                  <Text style={styles.modalTextButtonCancel}>fechar</Text>

                </Pressable>
              </View>
            </View>
          </View>
        }
        </View>
      </Modal>
        <MaterialIcons name='cloud-upload' size={32} style={styles.icon} 
        onPress={() => setModalVisible(true)}/>
    </View>
  );
};

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
  buttonPrimary: {
    marginVertical: 25,
    width: '60%',
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#4c46c8',
    borderWidth: 1.5,
  
    alignItems: 'center',
  },
  text: {
    color: '#4c46c8',
    fontFamily: 'Inter_600SemiBold'
  },
  buttonDisabled: {
    display: 'none',
  },
  icon: {
    color: '#08f26e',
    marginLeft: 20,
  },
  iconDelete: {
    color: '#4c46c8',
    position: 'relative',
    bottom: 25,
    left: 100,
  },
  image: {
    marginTop: 25,
    width: 120,
    height: 120,
    borderRadius: 20
  },
  button: {
    padding: 15,
    backgroundColor: 'transparent',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTextTitle: {
    fontSize: 18,
    paddingHorizontal: 35,
    marginBottom: 15,
    textAlign: 'center',
    color: '#eeeeee',
    fontFamily: 'Inter_300Light'
  },
  modalTextName: {
    fontSize: 18,
    paddingHorizontal: 35,
    marginBottom: 20,
    textAlign: 'center',
    color: '#797ef6',
    fontFamily: 'inter_500Medium'
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
    color: '#eeeeee',
    fontFamily: 'Inter_600SemiBold'
  },
  formView: {
    width: 350,
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
  input: {
    marginTop: 20,
    width: 220,
    height: 40,
    borderWidth: 1.5,
    borderRadius: 5,
    padding: 10,
    color: '#dddddd',
    fontSize: 16
  },

});

