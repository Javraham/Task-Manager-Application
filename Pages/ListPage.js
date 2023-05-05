import React, { createRef, useEffect, useRef } from 'react';
import {useState} from 'react'
import {Text, StyleSheet, SafeAreaView, View, TouchableOpacity, 
    FlatList, KeyboardAvoidingView, Button, TextInput, Animated, Alert, Keyboard, TouchableWithoutFeedback, Pressable, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable} from 'react-native-gesture-handler';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DetailPage from './Details';


class TodoScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            emptylist: this.props.list.todo.length > 0 ? false: true,
            focus: false,
            visible: false,
            edit: true,
            swipeRef: [],
            infoVisible: false,
            item: {},
            index: null,
            priorityLevel: null
        }
    }


    addItem = () => {
        this.setState({emptylist: false, focus: true});
        this.props.list.todo.push({name: '', completed: false, priority: 'None', Date: null, key: Date.now()})
        this.props.updateList(this.props.list)
    }

    handleDelete = (index) => {
        const newlist = this.props.list.todo.filter((todo, i) => i !== index);
        this.props.list.todo = newlist
        this.props.updateList(this.props.list);
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

    

    rightView(drag, index, item){
        const opacity = drag.interpolate({
            inputRange: [-80, -50, -25, 0],
            outputRange: [1, 0.6, 0.4, 0],
            extrapolate: 'clamp'
        })
        return (
                <>
                    <Pressable onPress={() => this.handleDelete(index)}>
                        <Animated.View style = {[styles.delete, {opacity: opacity}]}>
                            <Icon name = 'trash' color = 'white' size ={25}/>
                        </Animated.View>
                    </Pressable>
                    <Pressable onPress={() => {this.setState({infoVisible: true, item: item, index: index})}}>
                        <Animated.View style = {[styles.delete, {opacity: opacity, backgroundColor: list.color}]}>
                            <Ionicons name = 'information-circle-outline' color = 'white' size ={30} />
                        </Animated.View>
                    </Pressable>
                </>
        )
    }

    alertDelete = () => {
        this.setState({visible: false});
        Alert.alert('Delete "' + this.props.list.category+'"?', 'This will delete all of its content', [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
        },
        {text: 'Delete', onPress: () => this.editList(), style: 'destructive'},
        ]); 
    }

    editList(){
        this.props.deleteList(this.props.list);
        this.props.close();
    }

    checkInput = (item, index) => {
        if(item.name == ""){
            this.handleDelete(index)
        }
        else{
            this.props.updateList(this.props.list)
        }
    }

    closeSwipe = () => {
        this.state.swipeRef.forEach((swipeable) => {
                swipeable?.close()
            })
    }

    handleEdit = () => {
        this.setState({visible: false})
    }

    render(){
        list = this.props.list
        return (
            <SafeAreaView style = {[styles.container, {backgroundColor: '#F9F9F9'}]} onTouchStart={() => this.closeSwipe()}>
                <Modal visible = {this.state.infoVisible} animationType='slide' transparent>
                    <DetailPage list = {list} 
                        close = {() => this.setState({infoVisible: false})} 
                        item = {this.state.item} 
                        index = {this.state.index}
                        update = {this.props.updateList}/>
                </Modal>
                <View style = {{flex: 1, justifyContent: 'space-between', marginLeft: 20}}>
                <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                    <TouchableOpacity onPress={this.props.close}><Icon name = 'chevron-left' color={list.color} size = {30}/></TouchableOpacity>
                    <Text style = {[styles.title, {color: list.color}]} numberOfLines={1}>{list.category.length <= 20 ? list.category : list.category.substring(0,20) + '...'}</Text>
                        <TouchableOpacity onPress={() => this.setState({visible: true})} style = {{marginRight: 20}} >
                            <Ionicons name = 'ellipsis-horizontal-circle' color = {list.color} size = {30}/>
                        </TouchableOpacity>  
                        <Modal visible = {this.state.visible} transparent>
                            <TouchableOpacity style = {{flex: 1}} onPress={() => this.setState({visible: false})}/>
                                <SafeAreaView style = {styles.popup}>
                                    <TouchableOpacity style = {[styles.popupItem, {borderBottomWidth: 1, borderColor: 'grey'}]} onPress = {() => this.handleEdit()}>
                                        <Text style = {{fontSize: 17}}>Edit List</Text>
                                        <MaterialCommunityIcons name='playlist-edit' size={30}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style = {styles.popupItem} onPress = {this.alertDelete}>
                                        <Text style = {{color: 'red', fontSize: 17}}>Delete List</Text>
                                        <Ionicons name='trash-outline' color={'red'} size={25}/>
                                    </TouchableOpacity>
                                </SafeAreaView>
                        </Modal>   
                </View>
                {!this.state.emptylist && <KeyboardAvoidingView behavior= 'padding' style = {{flex: 1}}>
                <View style = {{height: '90%', }}>
                <FlatList
                    data={list.todo}
                    keyExtractor={(item) => item.key}
                    renderItem={({item, index}) => (
                    <Swipeable 
                        renderRightActions={(_, drag) => this.rightView(drag, index, item)} 
                        onSwipeableWillOpen={() => this.setState({edit: false})}
                        onSwipeableWillClose={() => this.setState({edit: true})}
                        ref={(swipe) => this.state.swipeRef[index] = swipe}>
                        <View style = {{flexDirection: 'row', gap: 10, alignItems: 'center', paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'lightgrey'}}>
                            <TouchableOpacity 
                                onPress={() => this.toggleCompleted(index)}>
                                <Icon name = {item.completed ? 'check-circle' : 'circle-thin'} size = {26} color = {list.color} />
                            </TouchableOpacity>
                            {item.priority !== 'None' && 
                                <Icon name = {item.priority === 'Low' ? 'star-o' : 'exclamation'} color = {item.priority === 'Low' ? 'gold' : '#0E86D4'}size={20}/>}
                            <TextInput  maxLength = {40} autoFocus = {this.state.focus}
                                onBlur = {() => this.checkInput(item, index)}
                                onChangeText = {text => this.handleInput(text, item)} 
                                defaultValue =  {item.name}
                                editable = {this.state.edit}
                                style = {{ fontSize: 16, flexGrow: 1, paddingVertical: 10}} 
                                />
                            {this.state.viewEdit && 
                                <TouchableOpacity style = {{marginRight: 20}} onPress={() => this.handleDelete(index)}>
                                    <Icon name='trash' color={'red'} size={20}/>
                                </TouchableOpacity>
                            } 
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
                    <Icon name = 'plus-circle' color = {list.color} size={25}/>
                    <Text style = {{fontWeight: 'bold', color: list.color, fontSize: 20}}>New Task</Text>
                </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

export default TodoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 10,
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
        flex: 1,
        width: 80
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
    },

    popup:{
        position: 'absolute',
        right: 20,
        top: 100,
        backgroundColor: 'white',
        borderRadius: 10,
        width: '50%'
    },

    popupItem: {
        padding: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})