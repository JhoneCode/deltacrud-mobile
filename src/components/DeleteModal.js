import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, ActivityIndicator } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
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
import axios from 'axios';


export function DeleteModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteCompleted, setDeleteCompleted] = useState(false);


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


  handleExclude = () => {
    setIsLoading(true);
    let abortController = new AbortController()
    const timeout = setTimeout(() => {
        abortController.abort()
        console.log("Aborted")
        setIsLoading(false)
    }, 4000);

    axios.delete(
      `http://10.0.0.105:3000/alumns/${props.id}`,
      { signal: abortController.signal }
    )
    .then(() => {
      clearTimeout(timeout);
      setIsLoading(false);
      setDeleteCompleted(true);
    })
    .catch (error => {
      console.log(error);
    })
    .finally(() => {
    setModalVisible(!modalVisible);
    props.refresh();
    });
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
          <View style={styles.modalView}>
            {deleteCompleted ? 
                <>
                  <MaterialIcons name='cancel-presentation' size={36} style={{marginBottom: 10, color: '#cf3c3f'}}/>
                  <Text style={styles.modalTextTitle}>Exclusão realizada com sucesso</Text>
                </> :
              <>
                <Text style={styles.modalTextTitle}>Deseja excluir o aluno?</Text>
                <View style={{flexDirection: 'row', marginBottom: 20, alignContent: 'center', alignItems: 'center', marginHorizontal: 20}}>
                <MaterialIcons name='dangerous' color='#cf3c3f'/><Text style={{fontSize: 16, color: '#cf3c3f', marginLeft: 4}}>Esta ação não pode ser desfeita!</Text>
                </View>
                <Text style={styles.modalTextName}>{props.name}</Text>
                <View style={{flexDirection: 'row', borderTopColor:'#eeeeee', borderTopWidth: 1, width: '90%'}}>
                <Pressable
                  style={styles.button}
                  onPress={handleExclude}
                >
                  { isLoading ? <ActivityIndicator color='#cf3c3f'/> :
                  <Text style={styles.modalTextButtonConfirm}>Excluir</Text>}
                </Pressable>
                <View style={{backgroundColor: 'gray', width: 1, height: '80%'}} />
                <Pressable
                  style={styles.button}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.modalTextButtonCancel}>Cancelar</Text>
                </Pressable>
                </View>
              </>
            }
          </View>
        </View>
      </Modal>
        <MaterialIcons name='delete-forever' size={32} style={styles.icon} 
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
  button: {
    padding: 15,
    backgroundColor: 'transparent',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#cf3c3f'
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
    color: '#cf3c3f',
    fontFamily: 'Inter_600SemiBold'

  },
  modalTextButtonCancel: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#eeeeee',
    fontFamily: 'Inter_600SemiBold'
  },

});

