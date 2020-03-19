import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';



export default function Servicos({ navigation }) {
    return (
        <SafeAreaView >
            <Text style={styles.texto}>TELA DE SERVIÇOS</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    texto: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 170
    }

})