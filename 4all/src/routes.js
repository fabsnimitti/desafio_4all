import { createAppContainer } from 'react-navigation' // importação para criar os containers
import { createStackNavigator } from 'react-navigation-stack'// importação para criar as pilhas de nevegação


// importa nossas telas criadas 
import Tela_inicial from './pages/Tela_inicial';
import Tela_principal from './pages/Tela_principal';
import Servicos from './pages/Servicos';



// constante de rotas
// aqui são criadas as rotas das telas
const Routes = createAppContainer(
    createStackNavigator({
        Tela_inicial: {
            screen: Tela_inicial,
            navigationOptions: {
                headerTransparent: true,
                title:'',
            },
        },

        Tela_principal: {
            screen: Tela_principal,
            navigationOptions: {
                headerTransparent: true,
                title:'',
            },
        },
        Servicos: {
            screen: Servicos,
            navigationOptions: {
                headerTransparent: true,
                title:'',
            },
        },
    })



);

export default Routes;