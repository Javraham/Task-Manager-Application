import React, { useState } from 'react';
import { Text, View , StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Pressable, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


function EditCategory(props){
    const date = new Date();
    const timestamp = Date.now()
    const BGcolor = ['#E67E22', '#2980B9', '#1ABC9C', '#C0392B', '#2ECC71', '#A569BD', '#40DFEF', '#F4D03F', '#FF87B2', '#E74C3C']
    const icons = ['format-list-bulleted', 'weather-sunny', 'moon-waning-crescent', 'globe-model', 'briefcase-outline', 'run', 'weight-lifter'
                    ,'gamepad-variant-outline', 'camera-outline', 'food-outline', 'music', 'cards-heart-outline', 'car-hatchback', 'brush',
                    'home-outline', 'filmstrip', 'wrench-outline', 'shopping-outline', 'school-outline', 'airplane', 'shower', 'airballoon-outline'
                    , 'alarm', 'alert-circle-outline', 'anchor', 'android', 'angular', 'apple', 'arm-flex-outline', 'atom', 'baby-face-outline'
                    , 'baby-carriage', 'badge-account-horizontal-outline', 'bank', 'bash', 'basketball', 'bicycle', 'dog-side', 'camera',
                    'cart-outline', 'cash', 'chart-line']
    const [text, setText] = useState(props.list.category);
    const [color, setColor] = useState(props.list.color)
    const [icon, setIcon] = useState(props.list.icon)
    const [disable, setDisable] = useState(false)

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

    const renderIcons = () => {
        return icons.map((icon) => {
            return(
                <TouchableOpacity key = {icon} onPress={() => setIcon(icon)}>
                    <MaterialCommunityIcons name={icon} size = {25} color = 'grey'/>
                </TouchableOpacity>
            )
        })

    }

    const editCategory = (text) => {
        props.updateCategory({category: text, color: color, icon: icon, todo: props.list.todo, id: props.list.id})
        props.close();
    }

    const handleText = (text) => {
        setText(text)
        setDisable(text.length === 0 ? true : false)
    }

    return (
        <SafeAreaView style = {[styles.container, {backgroundColor: color + 20}]}>
            <View style = {styles.top}>
                <TouchableOpacity onPress = {props.close} >
                    <Icon name = 'times' size = {30}/>
                </TouchableOpacity>
                <MaterialCommunityIcons name = {icon} size = {50} color={color}/>
                <TouchableOpacity disabled = {disable} onPress = {() => editCategory(text)}>
                    <Text style = {{fontSize: 18, color: disable ? 'grey' : color, fontWeight: 600}}>Save</Text>
                </TouchableOpacity>
            </View>
            <View style = {{gap: 20, alignItems: 'center'}}>
                <Text style = {styles.header}>Edit Task List</Text>
                <View style = {{width: '90%'}}>
                    <TextInput maxLength = {30} placeholder='Title' style = {styles.input} onChangeText={text => handleText(text)} defaultValue = {text}/>
                </View>
                <View style = {styles.color}>
                    {renderColor()}
                </View>
                <View style = {styles.icon}>
                    {renderIcons()}
                </View>
            </View>
            <View/>
        </SafeAreaView>
    );
    
}

export default EditCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },

    top: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },

    header: {
        fontSize: 30,
        fontWeight: 500
    },

    button: {
        backgroundColor: 'lightblue',
        paddingVertical: 10,
        borderRadius: 10
    },

    input: {
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        fontSize: 20,
    },

    color: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },

    icon: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        width: '90%',
        justifyContent: 'center'
    }
})