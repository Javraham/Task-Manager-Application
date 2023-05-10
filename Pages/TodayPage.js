import React from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';


class TodayPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            emptylist: props.list.length > 0 ? false : true,
            showCompleted: false,
        };
    }


    renderTodaysList = (item) => {
        return item.todo.map((task, index) => {
            if (this.state.showCompleted || !task.completed)
            return (
                <View key={index}>
                    <View style = {[styles.input, {borderBottomWidth:  0.5}]}>
                        <Icon name = {task.completed ? 'check-circle' : 'circle-thin'} size = {26} />
                        <View>
                            <Text style = {{ fontSize: 16, color: task.completed ? 'grey' : 'black'}} >{task.name}</Text>
                            <Text style = {{color: 'grey'}}>{item.category}</Text>
                        </View>
                    </View>
                </View>
            )
        })
    }
    render() {
        list = this.props.list
        return (
            <SafeAreaView style = {styles.container}>
                <View style = {{flex: 1, justifyContent: 'space-between'}}>
                <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
                    <TouchableOpacity onPress={this.props.close}><Icon name = 'chevron-left' size = {30}/></TouchableOpacity>
                    <Text style = {styles.title} numberOfLines={1}>Today</Text>
                    <TouchableOpacity style = {{marginRight: 20}}>
                            <Ionicons name = 'ellipsis-horizontal-circle' color = {this.props.color} size = {30}/>
                    </TouchableOpacity>
                </View>
                {!this.state.emptylist &&
                <View style = {{flex: 1}}>
                <TouchableOpacity style = {{flexDirection: 'row', gap: 10, alignItems: 'center'}} onPress={() => this.setState({showCompleted: !this.state.showCompleted})}>
                        <Icon name={this.state.showCompleted ? 'eye-slash' : 'eye'} size={15}/>
                        <Text style = {{fontWeight: 400}}>{this.state.showCompleted ? 'Hide Completed' : 'Show Completed'}</Text>
                </TouchableOpacity>
                <FlatList
                    data={list}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => (this.renderTodaysList(item, index))}/>
                </View>
                }
                {this.state.emptylist &&
                    <View style = {{alignItems: 'center'}}>
                        <MaterialCommunityIcons name = {this.props.icon} size={70}/>
                    </View>
                }
                <TouchableOpacity style = {styles.addItem}>
                    <Icon name = 'plus-circle' color = {list.color} size={25}/>
                    <Text style = {{fontWeight: 'bold', color: list.color, fontSize: 20}}>New Task</Text>
                </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

export default TodayPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20
    },

    addItem: {
        flexDirection: 'row', 
        gap: 10, 
        alignItems: 'center', 
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