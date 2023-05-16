import React, {useEffect, useRef} from 'react';
import { View, StyleSheet, Animated } from 'react-native';

function ProgressBar(props) {
    const animate = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(animate, {
            toValue: props.percent,
            duration: 2000,
            useNativeDriver: false
        }).start();
    }, [props.percent])

    const progress = animate.interpolate({
        inputRange: [0, props.percent + 1],
        outputRange: ["0%", props.percent + 1 +'%']
    })

    return (
        <View style = {styles.bar}>
            <Animated.View style = {[styles.progress, {width: progress, backgroundColor: props.color}]}/>
        </View>
    );
}

export default ProgressBar;

const styles = StyleSheet.create({
    bar:{
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        height: 10
    },

    progress: {
        borderRadius: 5,
        height: '100%',
    }
})