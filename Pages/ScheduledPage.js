import React, { createRef } from 'react';
import {Text, StyleSheet, SafeAreaView, View, TouchableOpacity, 
    FlatList, KeyboardAvoidingView, Button, TextInput, Animated, Alert, Pressable, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable} from 'react-native-gesture-handler';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';


class ScheduledPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            emptylist: props.list.length > 0 ? false : true,
            showCompleted: Array(props.list.length).fill(false),
            complete: false,
        };
    }

    renderList = (item, i) => {
        return item.map((val, index) => {
            return val.todo.map((task, i) => {
                return(
                    <View key={i}>
                        <View style = {[styles.input, {borderBottomWidth:  0.5}]}>
                            <Icon name = {task.completed ? 'check-circle' : 'circle-thin'} size = {26} color = {val.color} />
                            <View>
                                <View style = {{flexDirection: 'row', flexGrow: 1}}>
                                    {task.priority === 'High' && <Text style = {{fontSize: 16, color: '#0E86D4'}}>!!! </Text>}
                                    <Text style = {{ fontSize: 16, color: task.completed ? '#A8A8A8' : 'black'}} >{task.name}</Text>
                                </View>
                                <Text style = {{color: 'grey'}}>{val.category}</Text>
                            </View>
                        </View>
                    </View>
                )
            })
        })
    }

    renderDates = (item, index) => {
        const moment = require('moment')
        const date = moment(item[0]).toDate()
        let month;
        let day;
        switch(date.getMonth()){
            case 0: month = 'Jan'; break;
            case 1: month = 'Feb'; break;
            case 2: month = 'Mar'; break;
            case 3: month = 'Apr'; break;
            case 4: month = 'May'; break;
            case 5: month = 'June'; break;
            case 6: month = 'July'; break;
            case 7: month = 'Aug'; break;
            case 8: month = 'Sep'; break;
            case 9: month = 'Oct'; break;
            case 10: month = 'Nov'; break;
            case 11: month = 'Dec'; break;
            default: month = 'Jan';
        }

        switch(date.getDay()){
            case 0: day = 'Sun'; break;
            case 1: day = 'Mon'; break;
            case 2: day = 'Tue'; break;
            case 3: day = 'Wed'; break;
            case 4: day = 'Thu'; break;
            case 5: day= 'Fri'; break;
            case 6: day = 'Sat'; break;
        }

        return (
            <View style = {{gap: 10, paddingVertical: 10, borderBottomWidth: index < this.props.list.length-1 ? 2 : 0, borderColor: 'lightgrey'}}>
                <View style = {{gap: 10 ,marginLeft: 20}}>
                    <Text style = {{fontSize: 17, color: 'grey', fontWeight: 600}}>{item[0] === new Date().toISOString().split('T')[0] ? 'Today' : day + ' ' + month + ' ' + date.getDate() + ', ' + date.getFullYear()}</Text>
                </View>
                {this.renderList(item[1], index)}
            </View>
        )
    }



    render(){
        list = this.props.list
        return (
            <SafeAreaView style = {styles.container}>
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
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => (this.renderDates(item, index))}/>
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

export default ScheduledPage;

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