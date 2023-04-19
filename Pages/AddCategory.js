import React, { useState } from 'react';
import { Text, View , StyleSheet, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tempData from '../tempData';


function AddCategory(props){
    const BGcolor = ['#FAAB78', '#7FE9DE', '#E97777', '#7FB77E', '#B2A4FF', '#40DFEF']
    const [text, setText] = useState('');
    const [color, setColor] = useState(BGcolor[0])

    const renderColor = () => {
        return BGcolor.map((color) => {
            return(
                <TouchableOpacity key = {color} 
                style = {{height: 30, width: 30, borderRadius: 10, backgroundColor: color}}
                onPress={() => setColor(color)}
                />
            )
        })

    }

    const createCategory = () => {
        props.add({category: text, color: color, todo: []})
        setText('')
        props.close();
    }

    return (
        <KeyboardAvoidingView style = {styles.container} behavior='padding'>
            <View style = {{position: 'absolute', top: 60, right: 30}}>
                <TouchableOpacity onPress = {props.close} >
                    <Icon name = 'times' size = {30}/>
                </TouchableOpacity>
            </View>
            <View style = {{gap: 20, width: '80%'}}>
                <Text style = {styles.header}>Add List Category</Text>
                <TextInput placeholder='add todo...' style = {styles.input} onChangeText={text => setText(text)}/>
                <View style = {styles.color}>
                    {renderColor()}
                </View>
                <TouchableOpacity style = {[styles.button, {backgroundColor: color}]} onPress = {() => createCategory()}>
                    <Text style = {{textAlign: 'center', fontWeight: 'bold'}}>Create</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
    
}

export default AddCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    header: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    button: {
        backgroundColor: 'lightblue',
        paddingVertical: 10,
        borderRadius: 10
    },

    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },

    color: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})