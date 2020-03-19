import React from 'react';
import {Dimensions, View, Text, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import api from '../services/api';

const widthK=(Dimensions.get('window').width)/360;// constante para ajuste em diferentes tamanhos de tela
const heightK=(Dimensions.get('window').height)/592;// constante para ajuste em diferentes  tamanhos de tela

function List({ tf, navigation }) {
    var data = [  // variavel que recebe o nome da  tareda e seu id
        {
            name: '',
            id: ''
        }
    ];
    
    for (let i = 0; i < tf.length; i++) { // loop para armazenar o nome das tarefas vindas da api via HTTP, uma casa posição
        data[i] = {
            name: tf[i].toString(),
            id: tf[i].toString()
        }
    }

    async function goToprincipal(id) {// função é chamada quando uma das tarefas da lista é selecionada
        const response = await api.get('/tarefa/' + id); // pega informações uma tarefa pela sua id via requisição GET
        navigation.navigate('Tela_principal', { response });// navega para tela principal passando as informações da tarefa selecionada
    }
// aui é criada a lista com os nomes vindo da requisição get/tarefa
    return (
        <FlatList
            styles={styles.list}
            data={data}
            vertical
            renderItem={({ item }) => (
                <View>
                    <TouchableOpacity onPress={() => goToprincipal(item.id)} style={styles.button}>
                        <Text style={styles.buttonText}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    );
}
// estilização com as dimensões sendo mutiplicadas pela constante de proporção da tela para se adaptar 

const styles = StyleSheet.create({
    button: {
        height: 60*heightK,
        backgroundColor: "#D98719",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginVertical: 5*heightK,
        marginHorizontal: 8*widthK
    },
})


export default withNavigation(List); // exporta list juntamente com a navigation(para podermos apartir de component chamar uma tela)