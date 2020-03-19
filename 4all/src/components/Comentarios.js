import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import favoritos from '../assets/favoritos.png';

const widthK=(Dimensions.get('window').width)/360;// calculo da constante de ajuste para diferentes telas 
const heightK=(Dimensions.get('window').height)/592;// calcuo da constante de ajuste para diferentes telas
var quadrada=heightK;
if(widthK>heightK){
quadrada=widthK
}
export default function Comentarios({ data }) {
    createButtons = () => { // função para criar as estrelas de notas na tela dos comentarios
        let buttons = [];
        for (let i = 0; i < data.nota; i++) {
            buttons.push(< Image source={favoritos} style={styles.estrelas} />);
        }
        return buttons;
    }


    return (
        <View>
            <View style={styles.container}>
                <View style={styles.containerFoto}>
                    <Image source={{ uri: data.urlFoto }} style={styles.foto}></Image>
                </View>
                <View style={styles.containerComent}>
                    <View style={styles.containerLetras}>
                        <Text style={styles.colorTexto}>{data.nome}</Text>
                        <Text style={styles.colorTexto}>{data.titulo}</Text>
                        <Text style={styles.colorTexto}>{data.comentario}</Text>
                        <View style={styles.starsView}>
                            <View style={styles.starShow}>
                                {createButtons()}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View
                style={styles.hairLine}
            />
        </View >
    );
}
// estilização dos componentes utilizados, são multiplicados pelos fatores de conversão de tamanho de tela para que possam se 
//ajustar a diferentes telas
const styles = StyleSheet.create({

    estrelas: {
        width: 20*widthK,
        height: 20*heightK,
        resizeMode: 'cover',
        borderRadius: 100
    },

    container: {
        width: Dimensions.get('window').width,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    containerFoto: {
        width: 100*widthK,
        alignItems: 'center',
        justifyContent: 'center'
    },
    foto: {
        width: 80*quadrada,
        height: 80*quadrada,
        resizeMode: 'cover',
        borderRadius: 150
    },
    containerComent: {
        width: 260*widthK,
    },
    containerLetras: {
        marginTop: 20*heightK
    },
    colorTexto: {

        color: '#D98719'
    },
    starsView: {
        position: 'absolute',
        top: 25*heightK,
        left: 130*widthK,
        right: 0,
        bottom: 200*heightK,
    },
    starShow: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    hairLine: {
        borderBottomColor: '#a9a9a9',
        marginHorizontal: 0,
        borderBottomWidth: 1,
    }


});
