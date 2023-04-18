import React, { useRef } from 'react';
import {useState} from 'react'
import {Text, StyleSheet, SafeAreaView, View, TouchableOpacity, FlatList, ScrollView, VirtualizedList, KeyboardAvoidingView} from 'react-native';
import TodoInput from '../components/customInput';
import Icon from 'react-native-vector-icons/FontAwesome';


function TodoPage({listTitle}) {
    const [listItems, setListItems] = useState([])
    const id = useRef(0)
    const [emptylist, setemptyList] = useState(true) 
    const addItem = () => {
        setemptyList(false)
        const newList = listItems.concat({name: '', key: id.current++})
        setListItems(newList);
    }

    const handleDelete = (id) => {
        const filtered = listItems.filter(item => item.key != id)
        setListItems(filtered)
        console.log(listItems)
        if(listItems.length == 1){
            setemptyList(true)
        }
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
            {!emptylist && <KeyboardAvoidingView behavior= {Platform.OS === 'ios' ? 'padding' : 'height'} style = {{flex: 1}}>
            <View style = {{width: '100%', height: '90%'}}>
            <FlatList
                data={listItems}
                renderItem={({item}) => (
                <View style = {{flexDirection: 'row'}}>
                    <TodoInput onChangeText = {text => handleInput(text, item)} deleteInput = {() => {if(item.name == "") handleDelete(item.key)}}/>
                    <TouchableOpacity onPress = {() => handleDelete(item.key)}>
                        <Icon name = 'minus-circle' size = {25} color = "red"/>
                    </TouchableOpacity>
                </View>)}
            />
            </View>
            </KeyboardAvoidingView>
            }   
            {emptylist &&
                <View>
                    <Text style = {{textAlign: 'center', fontSize: 20, color: 'grey'}}>Currently No Added Items</Text>
                </View>
            }
            <TouchableOpacity onPress = {() => addItem()} style = {styles.addItem}>
                <Icon name = 'plus-circle' color = 'orange' size={35}/>
                <Text style = {{fontWeight: 'bold', color: 'orange', fontSize: 30}}>List Item</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default TodoPage;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        width: '90%',
        flex: 1,
        justifyContent: 'space-between'
    },

    title: {
        fontSize: 35,
        color: 'green',
        fontWeight: 'bold',
        padding: 10,
    },

    addItem: {
        flexDirection: 'row', 
        gap: 10, 
        alignItems: 'center', 
    }
})