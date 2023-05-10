import React from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';


class PriorityPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            emptylist: props.list[0].length > 0 ||  props.list[1].length > 0 ? false : true,
            // showCompleted: Array(props.list.length).fill(false),
            complete: false,
        };
    }

    renderPriorityList = (item, index) => {
        hasLength = this.props.list[index].some(val => val.todo.length) > 0
        lowHasLength = this.props.list[1].some(val => val.todo.length) > 0
        if(hasLength){
            return (
                <View style = {{gap: 10, paddingVertical: 10, borderBottomWidth: index === 0 && lowHasLength ? 2 : 0, borderColor: 'lightgrey'}}>
                    <View style = {{flexDirection: 'row', gap: 10, alignItems: 'center', marginLeft: 20}}>
                        <Icon name={index === 0 ? 'exclamation-circle' : 'star-o'} size={20} color={index === 0 ? '#0074B7' : '#CD6155'}/>
                        <Text style = {{fontSize: 20, color: index === 0 ? '#0074B7' : '#CD6155', fontWeight: 600}}>
                            {index === 0 ? 'High-Priority' : 'Low-Priority'}
                        </Text>
                    </View>
                    {this.renderTodos(item, index)}
                </View>
            )
        }
    }

    renderTodos = (item, i) => {
        return item.map((val, index) => {
            return val.todo.map((task, index_2) => {
                return (
                    <View key={index_2}>
                        <View style = {[styles.input, {borderBottomWidth:  0.5}]}>
                            <Icon name = {task.completed ? 'check-circle' : 'circle-thin'} size = {26} color = {i === 0 ? '#0074B7' : '#CD6155'} />
                            <View>
                                <Text style = {{ fontSize: 16, color: task.completed ? '#A8A8A8' : 'black'}} >{task.name}</Text>
                                <Text style = {{color: 'grey'}}>{val.category}</Text>
                            </View>
                        </View>
                    </View>
                )
            })
            }
        )
    }
    render() {
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
                {!this.state.emptylist &&
                <View style = {{flex: 1}}>
                <FlatList
                    data={list}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => (this.renderPriorityList(item, index))}/>
                </View>
                }
                {this.state.emptylist &&
                    <View style = {{alignItems: 'center'}}>
                        <Icon name = {this.props.icon} size={70} color={this.props.color}/>
                    </View>
                }
                <View></View>
                </View>
            </SafeAreaView>
        )
    }
}

export default PriorityPage;

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