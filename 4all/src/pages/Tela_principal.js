import React, { useState } from 'react';
import { Dimensions, View, Text, Linking, SafeAreaView, Image, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dialog, { DialogContent } from 'react-native-popup-dialog';


import Map from '../components/Map';// importa o componente map anteriormente criado
import Comentarios from '../components/Comentarios' // importa o componente comentarios anteriomente criado

// importa as imagens para criarmos os botões
import ligar from '../assets/ligar.png';
import servicos from '../assets/servicos.png';
import enderecos from '../assets/endereco.png';
import comentarios from '../assets/comentarios.png';
import favoritos from '../assets/favoritos.png';
import enderecos_branco from '../assets/endereco_branco.png';
import pesquisa from '../assets/pesquisa.png';



// cria as constantes de proporção para diferentes tipos de telas
const widthK = (Dimensions.get('window').width) / 360;
const heightK = (Dimensions.get('window').height) / 592;
var quadrada = heightK;
if (widthK > heightK) {
    quadrada = widthK
}

// inicia a criação da tela
export default function Tela_principal({ navigation }) {


    // estado para setar quando deve-se mostrar a  popup o endereço
    // deve ser mostrando um popup com endereço quando selecionar o botão de endereço
    var [pop, setPop] = useState({ isVisible: false });


    //  recebe a variavel  com as informaçoes das tarefas
    // requisitadas via get/tarefas/id vindas da tela anterior
    const received = (navigation.getParam('response'));
    
    //função executada para ir para tela de serviço quando
    //  botão de serviço é selecionado  
    function goToServicos() {
        navigation.navigate('Servicos');
    }

    //  função para fazer a ligação telefonica com o numero vindo do servidor ,quando botão de ligar é selecionada
    function goToCall() {
        Linking.openURL(`tel:${received.data.telefone}`)
    }

    //  cria uma referencia para scrollview(usada para scroll automatico para os comentarios)
    scrollView = React.createRef();

    return (
        <SafeAreaView  >

            <Dialog
                visible={pop.isVisible}
                onTouchOutside={() => {
                    setPop({ isVisible: false });
                }}>
                <DialogContent>
                    <View style={styles.popup}>
                        <Text></Text>
                        <Text>{received.data.endereco}</Text>
                    </View>
                </DialogContent>
            </Dialog>

            <ScrollView ref={scrollView} >
                <View style={styles.containerPri}>
                    <View style={styles.barra}>
                        <View style={styles.internBarra} >
                            <View style={styles.showNomeDaCidadeESimboloGPS}>
                                <ImageBackground source={enderecos_branco} style={styles.miniIconGPS}>
                                </ImageBackground>
                                <Text style={styles.LetrasDaCidade}>{received.data.cidade + ' - ' + received.data.bairro}</Text>
                            </View>
                            <View style={styles.ViewBtnPesquisa}>
                                <TouchableOpacity style={styles.btnPesquisa}>
                                    <ImageBackground source={pesquisa} style={styles.imagePesquisa}>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Image style={styles.foto} source={{ uri: received.data.urlFoto }}></Image>
                        <View style={styles.nome}>
                            <View style={styles.insideName} >
                                <Text style={styles.textName}>{((received.data.titulo).split(" "))[0]}</Text>
                                <ImageBackground source={{ uri: received.data.urlLogo }} style={styles.showLogo}>
                                </ImageBackground>
                            </View>
                            <View>
                            </View>
                        </View>
                        <View style={styles.BtnAndResumo}>
                            <View style={styles.internalBtnResumo} >
                                <View style={styles.fiveBtnlittleline}>
                                    <View style={styles.viewfiveBtn} >
                                        <TouchableOpacity onPress={goToCall} style={styles.bigBtn}>
                                            <ImageBackground source={ligar} style={styles.imageBigBtn}>
                                            </ImageBackground>
                                            <View style={styles.viewOfTextFiveBtn}>
                                                <Text style={styles.textFiveBtn}>Ligar</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={goToServicos} style={styles.bigBtn}>
                                            <ImageBackground source={servicos} style={styles.imageBigBtn}>
                                            </ImageBackground>
                                            <View style={styles.viewOfTextFiveBtn}>
                                                <Text style={styles.textFiveBtn}>Serviços</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setPop({ isVisible: true })} style={styles.bigBtn}>
                                            <ImageBackground source={enderecos} style={styles.imageBigBtn}>
                                            </ImageBackground>
                                            <View style={styles.viewOfTextFiveBtn}>
                                                <Text style={styles.textFiveBtn}>Endereços</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => scrollView.current.scrollToEnd({ animated: true })} style={styles.bigBtn}>
                                            <ImageBackground source={comentarios} style={styles.imageBigBtn}>
                                            </ImageBackground>
                                            <View style={styles.viewOfTextFiveBtn}>
                                                <Text style={styles.textFiveBtn}>Comentários</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.bigBtn}>
                                            <ImageBackground source={favoritos} style={styles.imageBigBtn}>
                                            </ImageBackground>
                                            <View style={styles.viewOfTextFiveBtn}>
                                                <Text style={styles.textFiveBtn}>Favoritos</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.hairLine} />
                                </View>
                                <Text style={styles.textResumo}>{received.data.texto}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.mapBox} >
                        <Map loc={{
                            latitude: received.data.latitude,
                            longitude: received.data.longitude
                        }}></Map>
                    </View>
                    <View style={styles.barMapBox}>
                        <View style={styles.viewMapTextRua}>
                            <Text style={styles.mapTextRua} >{received.data.endereco}</Text>
                        </View>
                        <ImageBackground source={enderecos} style={styles.littleGPSMap}>
                        </ImageBackground>
                    </View>
                </View>
                {received.data.comentarios.map(element => <Comentarios data={element}></Comentarios>)}
            </ScrollView>
        </SafeAreaView>
    );
}
// estilizações, com dimensoes multiplicadas pelas constante de proporção para q se ajustem em diferentes tamanhos de telas
const styles = StyleSheet.create({
    popup: {
        alignItems: 'center'
    },
    containerPri: {
        flex: 1,
    },
    barra: {
        height: 75 * heightK,
        padding: 0,
    },
    internBarra: {
        backgroundColor: '#D98719',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    showNomeDaCidadeESimboloGPS: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    miniIconGPS: {
        marginTop: 30 * heightK,
        width: 35 * widthK,
        height: 35 * heightK,
        resizeMode: 'cover',
        borderRadius: 150
    },
    LetrasDaCidade: {
        marginTop: 37 * heightK,
        color: '#ffff'
    },
    ViewBtnPesquisa: {
        position: 'absolute',
        top: 35 * heightK,
        left: 328 * widthK,
        right: 0,
        bottom: 0
    },
    btnPesquisa: {
        width: 28 * widthK,
        height: 28 * heightK,
        borderRadius: 150
    },
    imagePesquisa: {
        width: 25 * widthK,
        height: 25 * heightK,
        resizeMode: 'cover'
    },
    foto: {
        width: 400 * widthK,
        height: 150 * heightK,
        resizeMode: 'cover'
    },
    nome: {
        height: 55 * heightK,
        padding: 0,
    },
    insideName: {
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: '#dcdcdc',
        flex: 1
    },

    textName: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#D98719'
    },
    showLogo: {
        position: 'absolute',
        top: 0,
        left: 250 * widthK,
        right: 0,
        bottom: 0,
        marginTop: -70 * heightK,
        width: 90 * quadrada,
        height: 90 * quadrada,
        resizeMode: 'cover',
        backgroundColor: '#fff',
        borderRadius: 150,
    },
    BtnAndResumo: {
        height: 155 * heightK,
        padding: 0,
    },
    internalBtnResumo:
    {
        flex: 1,
    },
    fiveBtnlittleline: {
        height: 70 * heightK,
        marginHorizontal: 5,
    },
    viewfiveBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'flex-start',
        justifyContent: "center"
    },

    bigBtn: {
        height: 60 * heightK,
        marginHorizontal: 10 * widthK
    },
    imageBigBtn: {
        width: 50 * widthK,
        height: 50 * heightK
    },
    viewOfTextFiveBtn: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        flexDirection: "row",
        alignItems: 'flex-end'
    },
    textFiveBtn: {
        fontSize: 8,
        color: "#D98719"
    },
    hairLine: {
        borderBottomColor: '#a9a9a9',
        marginHorizontal: 12 * widthK,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    textResumo: {
        color: "#D98719",
        marginHorizontal: 12 * widthK,
        textAlign: 'justify',
    },
    mapBox:
    {
        height: 120 * heightK,
        flex: 1
    },
    barMapBox: {
        backgroundColor: "#D98719",
        marginTop: -25 * heightK,
    },
    viewMapTextRua: {
        marginRight: 45 * widthK,
    },
    mapTextRua: {
        color: '#fff',
        textAlign: 'right'

    },
    littleGPSMap: {
        position: 'absolute',
        top: 0,
        left: 315 * widthK,
        right: 0,
        bottom: 0,
        marginTop: -28 * heightK,
        width: 40 * widthK,
        height: 40 * heightK,
        resizeMode: 'cover',
        backgroundColor: '#fff',
        borderRadius: 150,
    },
});