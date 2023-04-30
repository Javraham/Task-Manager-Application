import React, { createRef, useEffect, useRef } from 'react';
import {useState} from 'react'
import {Text, StyleSheet, SafeAreaView, View, TouchableOpacity, 
    FlatList, KeyboardAvoidingView, Button, TextInput, Animated, Alert, Keyboard} from 'react-native';
import TodoInputClass from '../components/inputClass';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable } from 'react-native-gesture-handler';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


class TodoScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            emptylist: this.props.list.todo.length > 0 ? false: true,
            focus: false
        }
        this.ref = createRef();
    }


    addItem = () => {
        this.setState({emptylist: false, focus: true});
        this.props.list.todo.push({name: '', completed: false, key: Date.now()})
        this.props.updateList(this.props.list)
    }

    handleDelete = (index) => {
        this.props.list.todo.splice(index, 1)
        this.props.updateList(this.props.list)
        if(this.props.list.todo.length == 0){
            this.setState({emptylist: true})
        }
    }

    handleInput = (text, index) => {
        index.name = text
    }

    toggleCompleted(index) {
        let list = this.props.list;
        list.todo[index].completed = !list.todo[index].completed
        this.props.updateList(list)
    }

    rightView(drag, index){
        const opacity = drag.interpolate({
            inputRange: [-80, -50, -25, 0],
            outputRange: [1, 0.6, 0.4, 0],
            extrapolate: 'clamp'
        })
        return (
            <TouchableOpacity onPress={()=> this.deleteItem(index)}>
                <Animated.View style = {[styles.delete, {opacity: opacity}]}>
                    <Icon name = 'trash' color = 'white' size ={25} style = {{paddingHorizontal: 30}}/>
                </Animated.View>
            </TouchableOpacity>
        )
    }

    deleteItem = (index) => {
        this.handleDelete(index)
    }

    alertDelete = () =>
    Alert.alert('Are you sure you want to delete ' + this.props.list.category, 'This will delete all of its content', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {text: 'Delete', onPress: () => this.editList(), style: 'destructive'},
    ]);

    editList(){
        this.props.deleteList(this.props.list);
        this.props.close();
    }

    checkInput = (item, index) => {
        if(item.name == ""){
            this.handleDelete(index);
        }
        else{
            this.props.updateList(this.props.list)
        }
    }

    render(){
        list = this.props.list
        return (
            <SafeAreaView style = {styles.container}>
                <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                    <TouchableOpacity onPress={this.props.close}><Icon name = 'chevron-left' color={list.color} size = {30}/></TouchableOpacity>
                    <Text style = {[styles.title, {color: list.color}]} numberOfLines={1}>{list.category}</Text>
                    <TouchableOpacity onPress={this.alertDelete} style = {{marginRight: 20}} >
                        <Ionicons name = 'ellipsis-horizontal-circle' color = {list.color} size = {30}/>
                    </TouchableOpacity>    
                </View>
                {!this.state.emptylist && <KeyboardAvoidingView behavior= {Platform.OS === 'ios' ? 'padding' : 'height'} style = {{flex: 1}}>
                <View style = {{width: '100%', height: '90%'}}>
                <FlatList
                    data={list.todo}
                    keyExtractor={(item, index) => item.key}
                    renderItem={({item, index}) => (
                    <Swipeable 
                        renderRightActions={(_, drag) => this.rightView(drag, index)} 
                        onSwipeableWillOpen={Keyboard.dismiss}>
                        <View style = {{flexDirection: 'row', gap: 10, alignItems: 'center', paddingVertical: 15}}>
                            <TouchableOpacity 
                                onPress={() => this.toggleCompleted(index)}>
                                <Icon name = {item.completed ? 'check-circle' : 'circle-thin'} size = {26} color = {list.color} />
                            </TouchableOpacity>
                            <TextInput  maxLength = {40} autoFocus = {this.state.focus}
                                onBlur = {() => this.checkInput(item, index)}
                                onChangeText = {text => this.handleInput(text, item)} 
                                defaultValue =  {item.name}
                                style = {{ fontSize: 16, flexGrow: 1}} 
                                ref = {this.ref}
                                />                             
                        </View>
                    </Swipeable>)}
                />
                </View>
                </KeyboardAvoidingView>
                }
                {this.state.emptylist &&
                    <View style = {{alignItems: 'center'}}>
                        <MaterialCommunityIcons name = {list.icon} size={70} color={list.color}/>
                    </View>
                }
                <TouchableOpacity onPress = {() => this.addItem()} style = {styles.addItem}>
                    <Icon name = 'plus-circle' color = {list.color} size={35}/>
                    <Text style = {{fontWeight: 'bold', color: list.color, fontSize: 30}}>New Task</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

export default TodoScreen;

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        flex: 1,
        justifyContent: 'space-between'
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 10,
        width: '70%'
    },

    addItem: {
        flexDirection: 'row', 
        gap: 10, 
        alignItems: 'center', 
    },

    button: {
        width: 25, 
        height: 25, 
        borderRadius: 12.5, 
        marginBottom: 5,
        borderColor: 'grey',
        marginRight: 5
    },

    delete: {
        backgroundColor: '#E55451',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },

    edit: {
        borderWidth: 2, 
        width: 24, 
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginRight: 20
    },

    deleteList: {
        color: 'red'
    }
})