import React, { useRef } from 'react';
import {useState} from 'react'
import {Text, StyleSheet, SafeAreaView, View, TouchableOpacity, FlatList} from 'react-native';
import TodoInput from '../components/customInput';
import Icon from 'react-native-vector-icons/FontAwesome';


function TodoPage({listTitle}) {
    const [listItems, setListItems] = useState([])
    const id = useRef(0)
    const addItem = () => {
        const newList = listItems.concat({name: '', key: id.current++})
        setListItems(newList);
    }

    const handleDelete = (id) => {
        const filtered = listItems.filter(item => item.key != id)
        setListItems(filtered)
    }

    const handleInput = (text, input) => {
        const index = listItems.indexOf(input)
        setListItems(prev => {
            const updatedList = [...prev]; 
            updatedList[index] = { ...updatedList[index], name: text }; 
            return updatedList; 
          });
    }

    

    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.title}>{listTitle}</Text>
            <View style = {{width: '100%'}}>
            <FlatList
                data={listItems}
                renderItem={({item}) => (
                <View style = {{flexDirection: 'row'}}>
                    <TodoInput onChangeText = {text => handleInput(text, item)}/>
                    <TouchableOpacity onPress = {() => handleDelete(item.key)}>
                        <Icon name = 'minus-circle' size = {25} color = "red"/>
                    </TouchableOpacity>
                </View>)}
            />
            </View>
            <View>
                <TouchableOpacity onPress = {() => addItem()} style = {{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                    <Icon name = 'plus-circle' color = 'orange' size={25}/>
                    <Text style = {{fontWeight: 'bold', color: 'orange', fontSize: 20}}>List Item</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default TodoPage;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        width: '85%'
    },

    title: {
        fontSize: 35,
        color: 'green',
        fontWeight: 'bold',
        padding: 20
    }
})