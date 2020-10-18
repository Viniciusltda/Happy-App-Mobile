import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Maps from './pages/maps';
import Orphanage from './pages/Orphanage';
import OrphPosition from './pages/createOrph/OrphanagePosition';
import CreateOrphanage from './pages/createOrph/CreateOrphanage';;

import Header from './components/header';


const {Navigator, Screen} = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#f2f3f5'}}}>
                <Screen name="OrphanageMap" component={Maps}></Screen>

                <Screen 
                    name="OrphanageDetails" 
                    component={Orphanage} 
                    options={{headerShown: true, header: () => <Header showCancel={false} title="Orfanato" />}} 
                />

                <Screen 
                    name="OrphPosition" 
                    component={OrphPosition} 
                    options={{headerShown: true, header: () => <Header title="Adicionar Posição no Mapa" />}}
                />

                <Screen 
                    name="CreateOrph" 
                    component={CreateOrphanage} 
                    options={{headerShown: true, header: () => <Header title="Criar Orfanato" />}}
                />

            </Navigator>
        </NavigationContainer>
    )
}