import React, { createRef, useEffect, useRef } from 'react';
import {useState} from 'react'
import {Text, StyleSheet, SafeAreaView, View, TouchableOpacity, FlatList, 
        KeyboardAvoidingView, Button, TextInput, Animated, Alert, Keyboard, 
        TouchableWithoutFeedback, Pressable, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable} from 'react-native-gesture-handler';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DetailPage from './Details';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../components/CustomInput';
import EditCategory from './EditCategory';


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
            priorityLevel: null,
            showCompleted: false,
            fade: new Animated.Value(0),
            emptyCompletedList: this.props.list.todo.some(val => val.completed) ? false: true,
            editVisibility: false
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
        this.setState({focus: false})
        let list = this.props.list;
        list.todo[index].completed = !list.todo[index].completed
        this.props.updateList(list)
        this.props.list.todo.every(val => !val.completed) ? this.setState({fade: new Animated.Value(0)}) : null
    }

    handleCompletedDelete = (list) => {
        this.setState({fade: new Animated.Value(0)})
        const newlist = list.todo.filter((todo) => !todo.completed);
        this.props.list.todo = newlist
        this.props.updateList(this.props.list);
        if(this.props.list.todo.length == 0){
            this.setState({emptylist: true})
        }
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

    alertDeleteCompleted = () => {
        Alert.alert('Delete All Completed Items?', null, [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
        },
        {text: 'Delete', onPress: () => this.handleCompletedDelete(this.props.list), style: 'destructive'},
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
        this.setState({editVisibility: true, visible: false})
    }

    renderList = (item, index) => {
        const date = item.Date !== null ? (!(item.Date instanceof Date) ? item.Date.toDate() : item.Date) : null
        const isToday = date !== null ? (date.getDate() === new Date().getDate() && 
                        date.getMonth() === new Date().getMonth() && 
                        date.getFullYear() === new Date().getFullYear()) : null

        return (
            <Swipeable 
                        renderRightActions={(_, drag) => this.rightView(drag, index, item)} 
                        onSwipeableWillOpen={() => this.setState({edit: false})}
                        onSwipeableWillClose={() => this.setState({edit: true})}
                        ref={(swipe) => this.state.swipeRef[index] = swipe}>
                        <View style = {{paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'lightgrey'}}>
                            <View style = {{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                                <TouchableOpacity 
                                    onPress={() => this.toggleCompleted(index)}>
                                    <Icon name = {item.completed ? 'check-circle' : 'circle-thin'} size = {26} color = {list.color} />
                                </TouchableOpacity>
                                <View style = {{flexDirection: 'row', flexGrow: 1}}>
                                    {item.priority === 'High' && <Text style = {{fontSize: 16, color: '#0E86D4'}}>!!! </Text>}
                                    <TextInput  maxLength = {40} autoFocus = {this.state.focus}
                                        onBlur = {() => this.checkInput(item, index)}
                                        onChangeText = {text => this.handleInput(text, item)} 
                                        defaultValue =  {item.name}
                                        editable = {this.state.edit && !item.completed}
                                        style = {{ fontSize: 16, flexGrow: 1, color: item.completed ? 'grey' : 'black'}} 
                                        />
                                </View>
                            </View>
                                {date && 
                                    <View style = {{flexDirection: 'row', gap: 5, alignItems: 'center', paddingHorizontal: 31}}>
                                        <Icon name='calendar' color = {this.props.list.color} size = {15}/>
                                        <Text style = {{paddingVertical: 3, color: 'grey'}}>
                                            {isToday ? 'Today' : date.getFullYear() + '-' + (date.getMonth()+1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')}
                                        </Text>
                                    </View>
                                }
                        </View>
                    </Swipeable>
        )    
    }

    renderCompleted = (list) => {
        return list.todo.map((item, i) => {
            if(!item.completed) return
            const date = item.Date !== null ? (!(item.Date instanceof Date) ? item.Date.toDate() : item.Date) : null
            const isToday = date !== null ? (date.getDate() === new Date().getDate() && 
                            date.getMonth() === new Date().getMonth() && 
                            date.getFullYear() === new Date().getFullYear()) : null
    
            return (
                <View key={i} style = {{paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'lightgrey'}}>
                    <View style = {{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                        <TouchableOpacity 
                            onPress={() => this.toggleCompleted(i)}>
                            <Icon name = {item.completed ? 'check-circle' : 'circle-thin'} size = {26} color = {this.props.list.color} />
                        </TouchableOpacity>
                        <View style = {{flexDirection: 'row', flexGrow: 1}}>
                            {item.priority === 'High' && <Text style = {{fontSize: 16, color: '#0E86D4'}}>!!! </Text>}
                            <Text
                                style = {{ fontSize: 16, flexGrow: 1, color: item.completed ? 'grey' : 'black'}} 
                            >{item.name}</Text>
                        </View>
                    </View>
                        {date && 
                            <View style = {{flexDirection: 'row', gap: 5, alignItems: 'center', paddingHorizontal: 31}}>
                                <Icon name='calendar' color = {this.props.list.color} size = {15}/>
                                <Text style = {{paddingVertical: 3, color: 'grey'}}>
                                    {isToday ? 'Today' : date.getFullYear() + '-' + date.getMonth().toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')}
                                </Text>
                            </View>
                        }
                </View>
            )
        })
    }

    fadeIn = () => {
        Animated.timing(this.state.fade, {
            toValue: 0.5,
            duration: 500,
            useNativeDriver: true
        }).start()
    }


    renderListFooter = () => {
        this.fadeIn()
        return (
            <Animated.View style = {{opacity: this.state.fade}}>
                <View style = {{paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity style = {{flexDirection: 'row', gap: 10, alignItems: 'center'}} onPress={() => this.setState({showCompleted: !this.state.showCompleted})}>
                        <Icon name={this.state.showCompleted ? 'eye-slash' : 'eye'} size={15}/>
                        <Text style = {{fontWeight: 400}}>{this.state.showCompleted ? 'Hide Completed' : 'Show Completed'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={this.alertDeleteCompleted}>
                        <Text style = {{fontWeight: 400, paddingRight: 20}}>Clear Completed</Text>
                    </TouchableOpacity>
                </View>
                {this.state.showCompleted && this.renderCompleted(list)}
            </Animated.View>
        )
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
                <Modal visible = {this.state.editVisibility} animationType='slide'>
                    <EditCategory list = {list} close = {() => this.setState({editVisibility: false})} editCategory = {(list) => this.props.updateCategory(list)}/>
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
                {!this.state.emptylist && 
                <View style = {{flex: 1}}>
                    
                    <KeyboardAwareFlatList
                        data={list.todo.filter(val => !val.completed)}
                        keyExtractor={(item) => item.key}
                        renderItem={({item, index}) => 
                                    (<CustomInput item = {item} index={index}
                                                  list={list} handleDelete = {(index) => this.handleDelete(index)}
                                                  checkInput = {(item, index) => this.checkInput(item, index)}
                                                  handleInput = {(text, item) => this.handleInput(text, item)}
                                                  toggleCompleted = {index => this.toggleCompleted(index)}
                                                  swipeRef = {this.state.swipeRef}
                                                  focus = {this.state.focus}
                                                  updateList = {this.props.updateList}
                                                  subtext={'date'}
                                    />)}
                        ListFooterComponent={
                            list.todo.some(val => val.completed) &&
                            this.renderListFooter(list)
                        }
                    />
                </View>
               
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