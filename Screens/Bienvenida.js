// Bienvenida.js
import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Bienvenida = ({ navigation }) => {
  const handlePlatosPress = () => {
    navigation.navigate('Platos');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/originals/57/29/13/572913b8033d44655099414f3eddbdbc.jpg' }}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Image source={{ uri: 'https://manodechef.cl/wp-content/uploads/2023/09/cropped-ico_mano_chef_blanco.png' }} style={styles.icon} />

          <Text style={styles.title}>¡Bienvenido a EncuentraTuSabor!</Text>

          <TouchableOpacity style={styles.button} onPress={handlePlatosPress}>
            <Text style={styles.buttonText}>Ver Platos</Text>
          </TouchableOpacity>

          <Text style={styles.categoriesTitle}>CATEGORIÁS:</Text>

          <View style={styles.categoryContainer}>
            <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('Entradas')}>
              <ImageBackground source={{ uri: 'https://elcomercio.pe/resizer/NDNkVY7l6K2PwvM5TTZjbswMUZE=/1200x675/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/4FJNQPHRKJDR5DH3K3K3DJLQ5U.png' }} style={styles.categoryImage}>
                <View style={styles.imageOverlay} />
                <Text style={styles.categoryText}>Entradas</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.categoryContainer}>
            <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('Principal')}>
              <ImageBackground source={{ uri: 'https://www.elmueble.com/medio/2022/04/10/recetas-de-almuerzos-saludables_7d12ce86_674x379.png' }} style={styles.categoryImage}>
                <View style={styles.imageOverlay} />
                <Text style={styles.categoryText}>Plato Principal</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.categoryContainer}>
            <TouchableOpacity style={styles.category} onPress={() => navigation.navigate('Postres')}>
              <ImageBackground source={{ uri: 'https://e.rpp-noticias.io/xlarge/2022/01/17/312131_1203425.jpg' }} style={styles.categoryImage}>
                <View style={styles.imageOverlay} />
                <Text style={styles.categoryText}>Postres</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Cambia el valor de la opacidad aquí
  },
  gradient: {
    flex: 1,
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFC300',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  categoryContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  category: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1, // Ancho del borde
    borderColor: 'white', // Color del borde
  },
  categoryImage: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  categoryText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default Bienvenida;
