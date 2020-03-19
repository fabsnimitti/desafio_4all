import React, { useEffect, useState } from 'react';
import { StyleSheet,  View, Dimensions } from 'react-native';
import Mapview, { Marker} from 'react-native-maps';  //importação para o mapa

const widthK=(Dimensions.get('window').width)/360;// calculo da constante de proporção para diferentes tamanhos de telas
const heightK=(Dimensions.get('window').height)/592;// calculo da constante de proporção para diferentes tamanhos de telas


export default function Map({ loc }) {

    const [geoloc, setGeoloc] = useState(null); //estado para armazenar a localização e futuramente exibir no map
    const [mapConf, setmapConf] = useState(null);// armazena as configurações do mapa

    useEffect(() => {// useeffect para setar as variaveis de localização e configuração do mapa (esse trecho de código rodará apenas uma vez)

        setGeoloc(loc);// seta a localização do marcador no mapa
        const latitude = loc.latitude;// variavel de latitude
        const longitude = loc.longitude;// varivel de longitude

        setmapConf( //seta a configuração do mapa
            {
                latitude,
                longitude,
                latitudeDelta: 0.004,//delta do mapa
                longitudeDelta: 0.04,//delta do mapa
            }
        );
    }, []);

    if (!geoloc || !mapConf) { //caso a a localização ou a configuração do mapa nao tiverem sido carregadas, ele retorna null para q o mapa nao carregue sem essas informações(o que pode gerar erros) 
        return null;
    }
    // quando localização e configurações forem carregadas, o mapa é renderizado na sua view
    //marker faz a marcação do ponto no mapa
    return (
        <View style={styles.container}>
            < Mapview initialRegion={mapConf} style={styles.map}> 
                <Marker coordinate={geoloc} />
            </Mapview>
        </View>
    );
}

//  aqui temos a estilização dos componentes renderizados
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: 110*heightK,
    },

})