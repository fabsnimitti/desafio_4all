import React, { useState, useEffect } from 'react';
import { Dimensions,StyleSheet, Image, SafeAreaView, View } from 'react-native';
import api from '../services/api';// importa a api para fazer as requisições

import List from '../components/Lista'; // importa-se o componente lista que foi criado anteriormente
const widthK=(Dimensions.get('window').width)/360;// constante de proporção para se ajustar em diferentes tamanhos de telas
const heightK=(Dimensions.get('window').height)/592;// constante de proporção para se ajustar em diferentes tamanhos de telas

export default function Tela_inicial({ navigation }) {
   
  

    const [tarefa, setTarefa] = useState(null);//estado criado para armazenar as tarefas vindas da requisição get/tarefas

    useEffect(() => { // useefect para requisitar as informações do servidor e setar o estado com os valores recebidos do servidor
        async function loadData() {
            const response = await api.get('/tarefa');// requisição da lista de tarefas
            setTarefa(response.data.lista)// seta o estado com as tarefas
        }
        loadData();
    }, []);


    if (!tarefa) {// espera até que estado (tarefa) estejam carregados/setados, para assim renderizar componentes em tela
        return null;
    }


    return (
        <SafeAreaView style={styles.container}>
            <View >
                <Image style={styles.ima} source={require('../assets/4all.png')} />
                <List tf={tarefa} />
            </View>
        </SafeAreaView>
    );

}
// estilizações, com dimensoes multiplicadas pelas constante de proporção para q se ajustem em diferentes tamanhos de telas
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'


    },
    ima: {

        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 35*heightK



    },



});
