import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, ScrollView, Dimensions, Platform } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

const PlatosScreen = () => {
    const [platos, setPlatos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigation = useNavigation();

    const handlePlatoPress = (plato) => {
        navigation.navigate('DetallePlato', { plato });
    };

    useEffect(() => {
        const fetchPlatos = async () => {
            try {
                const response = await axios.get('http://44.212.30.203:4000/api/platos');
                setPlatos(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                console.error('Error details:', error.response); // Muestra detalles adicionales del error
            }
        };

        fetchPlatos();
    }, []);

    const renderPlatoItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePlatoPress(item)}>
            <View style={[styles.box, styles.floatingContainer]}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image.url }} style={styles.image} />
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Nombre:</Text>
                    <Text style={styles.infoText}>{item.name}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Puntuación:</Text>
                    <Text style={styles.infoText}>{item.rating}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Categoria:</Text>
                    <Text style={styles.infoText}>{item.category}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Precio:</Text>
                    <Text style={styles.infoText}>{item.price}</Text>
                </View>

            </View>
        </TouchableOpacity>
    );

    const numColumns = windowWidth >= 600 ? 7 : 2;

    const filteredPlatos = platos.filter(
        (plato) =>
            (plato.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                plato.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
            plato.type.toLowerCase() === 'entrada'
    );


    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: 'https://img.freepik.com/foto-gratis/fondo-azul-degradado-lujo-abstracto-azul-oscuro-liso-banner-estudio-vineta-negra_1258-108775.jpg',
                }}
                style={styles.backgroundImage}
            />
            <View style={styles.welcomeContainer}>
                <Image
                    source={{
                        uri: 'https://png.pngtree.com/thumb_back/fw800/background/20190221/ourmid/pngtree-food-food-snack-eating-goods-image_14522.jpg',
                    }}
                    style={styles.welcomeBackground}
                />
                <View style={styles.welcomeTextContainer}>
                    <Image
                        source={{
                            uri: 'https://manodechef.cl/wp-content/uploads/2023/09/cropped-ico_mano_chef_blanco.png',
                        }}
                        style={styles.logoImage}
                    />
                    <Text style={styles.welcomeText}> SISTEMA DE RECOMENDACIÓN EncuentraTuSabor</Text>
                </View>
            </View>




            <ScrollView style={styles.scrollView}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar por nombre o descripción"
                    onChangeText={(text) => setSearchTerm(text)}
                    value={searchTerm}
                />

                <FlatList
                    data={filteredPlatos}
                    keyExtractor={(item) => item.id}
                    numColumns={numColumns}
                    renderItem={renderPlatoItem}
                    contentContainerStyle={styles.flatListContainer}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: 'transparent',
    },
    welcomeContainer: {
        marginBottom: 16,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 10,
        zIndex: -1,
    },
    welcomeTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row', // Alinear elementos en fila
        alignItems: 'center', // Centrar verticalmente los elementos en la fila
    },
    logoTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoImage: {
        width: 40, // Ancho del logo
        height: 40, // Altura del logo
        marginRight: 10, // Espacio entre el logo y el texto del título
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },

    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        color: 'white'
    },
    box: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginBottom: 16,
        borderRadius: 8,
        margin: 5,// Alinear al centro
    },
    imageContainer: {
        width: '100%',
        height: 150, // Ajusta la altura de la imagen según tu preferencia
        marginBottom: 8,
        overflow: 'hidden',
        borderRadius: 8,
    },
    image: {
        height: 170,
        width: 150,
    },
    infoLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
    infoText: {
        fontSize: 16,
        color: 'white',
    },
    flatListContainer: {
        flex: 1,
    },
    floatingContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Ajusta la transparencia modificando el último valor (0.5)
        borderWidth: 1,
        borderColor: 'rgba(204, 204, 204, 0.5)', // Ajusta la transparencia del borde
        borderRadius: 8,
        margin: 5,
    },
    /*scrollView: {
        flexGrow: 1,
    },*/
});

export default PlatosScreen;
