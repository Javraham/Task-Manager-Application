import React, { createRef } from 'react';
import {Text, StyleSheet, SafeAreaView, View, TouchableOpacity, 
    FlatList, KeyboardAvoidingView, Button, TextInput, Animated, Alert, Pressable, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable} from 'react-native-gesture-handler';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


class SummaryPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            emptylist: props.list.length > 0 ? false : true,
            complete: false,
        };
    }

    renderList = (item, i) => {
        
        return item.todo.map((val, index) => {
            const date = val.Date !== null ? (!(val.Date instanceof Date) ? val.Date.toDate() : val.Date) : null
            const isToday = date !== null ? (date.getDate() === new Date().getDate() && 
                        date.getMonth() === new Date().getMonth() && 
                        date.getFullYear() === new Date().getFullYear()) : null
            return (
                <View key={index}>
                    <View style = {[styles.input, {borderBottomWidth: 0.5 }]}>
                        <Icon name = {val.completed ? 'check-circle' : 'circle-thin'} size = {26} color = {item.color} />
                        <View>
                            <View style = {{flexDirection: 'row', flexGrow: 1}}>
                                {val.priority === 'High' && <Text style = {{fontSize: 16, color: '#0E86D4'}}>!!! </Text>}
                                <TextInput
                                    defaultValue =  {val.name}
                                    editable = {false}
                                    style = {{ fontSize: 16, color: val.completed ? '#A8A8A8' : 'black'}} 
                                />
                            </View>
                            { date &&
                                <View style = {{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                                    <Icon name='calendar' color = {item.color} size = {15}/>
                                    <Text style = {{paddingVertical: 3, color: 'grey'}}>
                                        {isToday ? 'Today' : date.getFullYear() + '-' + (date.getMonth()+1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')}
                                    </Text>
                                </View>

                            }   
                        </View>    
                    </View>
                </View>
            )}
        )
    }

    renderCategories = (item, index) => {
        return (
            <View style = {{gap: 10, paddingVertical: 10, borderBottomWidth: index < this.props.list.length-1 ? 2 : 0, borderColor: 'lightgrey'}}>
                <View style = {{flexDirection: 'row', gap: 10, alignItems: 'center', marginLeft: 20}}>
                    <MaterialCommunityIcons name={item.icon} size={20} color={item.color}/>
                    <Text style = {{fontSize: 20, color: item.color, fontWeight: 600}}>{item.category}</Text>
                </View>
                {this.renderList(item, index)}
            </View>
        )
    }


    render(){
        list = this.props.list
        return (
            <SafeAreaView style = {[styles.container, {backgroundColor: this.props.color + 20}]}>
                <View style = {{flex: 1, justifyContent: 'space-between'}}>
                <View style = {{flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between', marginHorizontal: 20}}>
                    <TouchableOpacity onPress={this.props.close}><Icon name = 'chevron-left' color={this.props.color} size = {30}/></TouchableOpacity>
                    <Text style = {[styles.title, {color: this.props.color}]} numberOfLines={1}>{this.props.title}</Text>
                    <TouchableOpacity >
                            <Ionicons name = 'ellipsis-horizontal-circle' color = {this.props.color} size = {30}/>
                    </TouchableOpacity>
                </View>
                {!this.state.emptylist && <KeyboardAvoidingView behavior= {Platform.OS === 'ios' ? 'padding' : 'height'} style = {{flex: 1}}>
                <View style = {{flex: 1}}>
                <FlatList
                    data={list}
                    keyExtractor={(item) => item.id}
                    renderItem={({item, index}) => (this.renderCategories(item, index))}/>
                </View>
                </KeyboardAvoidingView>
                }
                {this.state.emptylist &&
                    <View style = {{alignItems: 'center'}}>
                        <MaterialCommunityIcons name = {this.props.icon} size={70} color={this.props.color}/>
                    </View>
                }
                <View></View>
                </View>
            </SafeAreaView>
        )
    }
}

export default SummaryPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center'
    },

    input: {
        flexDirection: 'row', 
        gap: 10, 
        paddingVertical: 10, 
        borderColor: 'lightgrey',
        marginLeft: 20
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