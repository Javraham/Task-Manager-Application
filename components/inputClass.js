import React from 'react';
import {useState} from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function TodoInputClass({deleteInput = () => {}, auto, ...props}) {
    
    return (
        <View style = {styles.input}>
             <TextInput  maxLength = {40}  {...props} autoFocus = {auto}
              onBlur = {() => deleteInput()}
                style = {{ fontSize: 16, alignItems: 'center', alignItems: 'center'}} />
        </View>
    );
}

export default TodoInputClass;

const styles = StyleSheet.create({
    input: {
        marginBottom: 30,
        flexGrow: 1,
    },
})