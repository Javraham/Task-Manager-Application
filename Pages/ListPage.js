import React, { createRef, useEffect, useRef } from 'react';
import {useState} from 'react'
import {Text, StyleSheet, SafeAreaView, View, TouchableOpacity, 
    FlatList, ScrollView, VirtualizedList, KeyboardAvoidingView, Button, TextInput} from 'react-native';
import TodoInputClass from '../components/inputClass';
import Icon from 'react-native-vector-icons/FontAwesome';


class TodoScreen extends React.Component {
    
    state = {
        viewDelete: false,
        emptylist: this.props.list.todo.length > 0 ? false: true,
        newTodo: '',
        focus: false
    }


    addItem = () => {
        this.setState({emptylist: false, newTodo: '', focus: true});
        this.props.list.todo.push({name: this.state.newTodo, completed: false, key: this.props.list.todo.length})
        this.props.updateList(this.props.list)
    }

    handleDelete = (index) => {
        this.props.list.todo.splice(index, 1)
        this.props.updateList(this.props.list)
        if(this.props.list.todo.length == 0){
            this.setState({emptylist: true, viewDelete: false})
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

    render(){
        list = this.props.list
        return (
            <SafeAreaView style = {styles.container}>
                <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                    <TouchableOpacity onPress={this.props.close}><Icon name = 'chevron-left' color={list.color} size = {20}/></TouchableOpacity>
                    <Text style = {[styles.title, {color: list.color}]} numberOfLines={1}>{list.category}</Text>
                    <Button title={this.state.viewDelete ? 'Done': 'Edit'} onPress={() => {if(list.todo.length > 0) this.setState({viewDelete: !this.state.viewDelete})}}/>
                </View>
                {!this.state.emptylist && <KeyboardAvoidingView behavior= {Platform.OS === 'ios' ? 'padding' : 'height'} style = {{flex: 1}}>
                <View style = {{width: '100%', height: '90%'}}>
                <FlatList
                    data={list.todo}
                    keyExtractor={item => item.key}
                    renderItem={({item, index}) => (
                    <View style = {{flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 30}}>
                        <TouchableOpacity 
                            onPress={() => this.toggleCompleted(index)}>
                            <Icon name = {item.completed ? 'check-circle' : 'circle-thin'} size = {26} color = {list.color} />
                        </TouchableOpacity>
                        <TextInput  maxLength = {40} autoFocus = {this.state.focus}
                            onBlur = {() => {if(item.name == "") this.handleDelete(index)}}
                            onChangeText = {text => this.handleInput(text, item)} 
                            defaultValue =  {item.name}
                            style = {{ fontSize: 16, flexGrow: 1}} />
                        {this.state.viewDelete &&
                        <TouchableOpacity onPress = {() => this.handleDelete(index)}>
                            <Icon name = 'minus-circle' size = {25} color = "red"/>
                        </TouchableOpacity>
                        }   
                    </View>)}
                />
                </View>
                </KeyboardAvoidingView>
                }
                {this.state.emptylist &&
                    <View style = {{alignItems: 'center'}}>
                        <Icon name = {list.icon} size={50} color={list.color}/>
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
        marginHorizontal: 20,
        width: '90%',
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
    }
})