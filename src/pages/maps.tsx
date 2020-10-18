import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import api from '../services/api';

import { Feather } from '@expo/vector-icons';
import mapMarker from '../images/map-local.png';

interface Orph {
  id: number,
  name: string,
  latitude: number,
  longitude: number
}


export default function Map() {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<Orph[]>([]);

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);

    });
  });

  function handleNavOrph(id: number) {
    navigation.navigate('OrphanageDetails', {id});

  }

  function HandleCreateOrphanage() {
    navigation.navigate('OrphPosition');
    
  }

    return (
        <View style={styles.container}>
      <MapView 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -20.0793302,
          longitude: -51.0879282,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
      }}>
        
        {orphanages.map(orph => {
          return (
            <Marker
              key={orph.id}
              icon={mapMarker} 
              coordinate={{latitude: orph.latitude, longitude: orph.longitude}}
              calloutAnchor={{x: 0.52, y: -0.1}}
            >
              <Callout tooltip={true} onPress={() => handleNavOrph(orph.id)}>

                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orph.name}</Text>

                </View>

              </Callout>
            </Marker>
          )
        })}

      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} Orfanatos encontrados.</Text>

        <RectButton style={styles.createOrph} onPress={HandleCreateOrphanage}>
          <Feather name="plus" size={16} color="#fff"></Feather>

        </RectButton>

      </View>

    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
  
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
  
      paddingHorizontal: 16,
  
      backgroundColor: 'rgba(255, 255, 255, .8)',
  
      borderRadius: 16,
  
      justifyContent: 'center',
  
    },
  
    calloutText: {
      color: '#0089a5',
  
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
  
      textAlign: 'center'
  
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#fff',
  
      borderRadius: 28,
  
      height: 46,
  
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 5
  
    },
  
    footerText: {
      color: '#8fa7b3',
  
      fontFamily: 'Nunito_700Bold'
  
    },
  
    createOrph: {
      width: 56,
      height: 56,
  
      backgroundColor: '#15c3d6',
  
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
  
      elevation: 1
  
    }
  });