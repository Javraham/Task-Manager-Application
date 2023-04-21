import React from 'react';
import { View, StyleSheet } from 'react-native';

function ProgressBar(props) {
    return (
        <View style = {styles.bar}>
            <View style = {[styles.progress, {width: props.percent, backgroundColor: props.color}]}/>
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
        height: 10,
    }
})