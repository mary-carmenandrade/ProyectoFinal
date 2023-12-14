import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, TextInput, Button, TouchableOpacity, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const DetallePlato = () => {
    const route = useRoute();
    const { plato } = route.params;

    const [platosMismoTipo, setPlatosMismoTipo] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState('');
    const [comentarios, setComentarios] = useState([]);
    const [selectedRating, setSelectedRating] = useState(0);

    const navigation = useNavigation();

    const handlePlatoPress = (plato) => {
        navigation.navigate('DetallePlato', { plato });
    };

    useEffect(() => {
        const fetchPlatosMismoTipo = async () => {
            try {
                const response = await axios.get(`https://api-dishes-5r7a.onrender.com/api/platos?type=${plato.tipo}`);
                const filteredPlatos = response.data.filter(item => item.type === plato.type);
                const platosExcluyendoActual = filteredPlatos.filter(item => item.id !== plato.id);
                const randomPlatos = platosExcluyendoActual.sort(() => 0.5 - Math.random()).slice(0, 3);
                setPlatosMismoTipo(randomPlatos);
                setComentarios(plato.comments || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPlatosMismoTipo();
    }, [plato]);

    const cometar = async () => {
        try {
            const data = {
                comment: nuevoComentario
            };
            const response = await axios.post(`https://api-dishes-5r7a.onrender.com/api/platos/${plato.id}/comment`, data);
            setComentarios(response.data.comments);
            setNuevoComentario('');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const submitRating = async () => {
        try {
            if (selectedRating > 0) {
                const ratingData = {
                    rating: selectedRating
                };
                const response = await axios.post(`https://api-dishes-5r7a.onrender.com/api/platos/${plato.id}/rating`, ratingData);
                if (response.status === 200) {
                    setComentarios(response.data.comments);
                    setSelectedRating(0);
                } else {
                    console.log('Error en la respuesta del servidor:', response);
                    Alert.alert('Error', 'Hubo un problema al calificar el plato. Por favor, inténtalo de nuevo.');
                }
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Hubo un problema al calificar el plato. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://c.wallhere.com/photos/e2/0b/food_strawberries_fork_knife_fruit_berries-1594429.jpg!s1' }}
            style={styles.backgroundImage}
        >
            <ScrollView style={styles.container}>
                <Image source={{ uri: plato.image.url }} style={styles.image} />
                <View style={styles.platoDetailsContainer}>
                    <View style={styles.platoDetailsBox}>
                        <Text style={styles.platoName}>{plato.name}</Text>

                        <View style={styles.ratingContainer}>
                            <View style={styles.ratingStarsContainer}>
                                {Array.from({ length: Math.floor(plato.rating) }).map(
                                    (_, index) => (
                                        <Ionicons key={index} name="star" size={24} color="#FFD700" />
                                    )
                                )}
                                {Array.from({ length: Math.ceil(5 - plato.rating) }).map(
                                    (_, index) => (
                                        <Ionicons
                                            key={index}
                                            name="star-outline"
                                            size={24}
                                            color="#FFD700"
                                        />
                                    )
                                )}
                            </View>
                        </View>

                        <Text style={styles.platoInfo}>Precio: ${plato.price}</Text>
                        <Text style={styles.platoInfo}>Descripción: {plato.description}</Text>
                        <Text style={styles.platoInfo}>Tipo: {plato.type}</Text>

                    </View>
                </View>
                <View style={styles.relatedPlatosContainer}>
                <View style={styles.relatedPlatosBox}>
                    <Text style={styles.relatedText}>Otros platos del mismo tipo:</Text>
                    <FlatList
                        data={platosMismoTipo}
                        keyExtractor={(item) => item.id}
                        horizontal
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handlePlatoPress(item)}>
                                <View style={styles.relatedPlatoItem}>
                                    <Image
                                        source={{ uri: item.image.url }}
                                        style={styles.relatedPlatoImage}
                                    />
                                    <Text style={styles.relatedPlatoName}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                </View>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingTitle}>Calificar el plato:</Text>

                    <View style={styles.ratingStarsContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity
                                key={star}
                                onPress={() => setSelectedRating(star)}
                            >
                                <Ionicons
                                    name={star <= selectedRating ? 'star' : 'star-outline'}
                                    size={24}
                                    color="#FFD700"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>


                    <TouchableOpacity
                        style={styles.submitRatingButton}
                        onPress={submitRating}
                    >
                        <Text style={styles.submitRatingButtonText}>Calificar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.commentContainer}>
                    <Text style={styles.commentTitle}>Comentarios:</Text>
                    {comentarios && comentarios.map((comentario, index) => (
                        <Text key={index} style={styles.comment}>
                            {comentario.comment}
                        </Text>
                    ))}
                </View>


                <View style={styles.addCommentContainer}>
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Agregar comentario..."
                        onChangeText={(text) => setNuevoComentario(text)}
                        value={nuevoComentario}
                    />
                    <Button title="Agregar Comentario" onPress={cometar} />
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
        borderRadius: 10,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    platoDetailsContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    platoDetailsBox: {
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        padding: 20,
        borderRadius: 10,
        margin: 20,
    },
    relatedPlatosBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 20,
        borderRadius: 10,
        margin: 20,
    },
    platoName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: 'white',
    },
    platoInfo: {
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',
        color: 'white',
    },
    ratingContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        
    },
    ratingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white',
    },
    ratingStarsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
    },
    star: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    selectedStar: {
        backgroundColor: '#FFD700', // Color dorado para estrellas seleccionadas
    },
    submitRatingButton: {
        backgroundColor: '#548C7E',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitRatingButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    relatedPlatosContainer: {
        padding: 16,
    },
    relatedText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    relatedPlatoItem: {
        marginRight: 10,
    },
    relatedPlatoImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    relatedPlatoName: {
        fontSize: 14,
        marginTop: 5,
        textAlign: 'center',
        color: 'white',
    },
    commentContainer: {
        padding: 16,
        color: 'white',
    },
    commentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white',
    },
    comment: {
        fontSize: 16,
        marginBottom: 4,
        color: 'white',
    },
    addCommentContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        color: 'white',
    },
    commentInput: {
        height: 40,
        borderColor: '#548C7E',
        borderWidth: 1,
        marginBottom: 8,
        paddingLeft: 8,
        color: 'white',
    },
    ratingStarsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
    },
    starContainer: {
        marginHorizontal: 4,
    },
    starImage: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
    },
    star: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    selectedStar: {
        backgroundColor: '#FFD700', // Color dorado para estrellas seleccionadas
    },
});

export default DetallePlato;