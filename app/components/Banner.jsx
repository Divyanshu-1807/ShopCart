import React from 'react';
import { Dimensions, Image, View, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { CarouselData } from '../data/CarouselData';

const Banner = () => {
    const width = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <Carousel
                loop
                width={width}
                height={width / 2.07}
                autoPlay={true}
                data={CarouselData}
                scrollAnimationDuration={1000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <Image
                            source={item.image}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display:"flex",
        flexDirection: "row",
        // position:"relative",
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default Banner;