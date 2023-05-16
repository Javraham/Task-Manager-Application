import React from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomInput from '../components/CustomInput';


class TodayPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            emptylist: props.list.length > 0 ? false : true,
            showCompleted: false,
            swipeRef: [],
            focus: false
        };
    }

    toggleCompleted = (index, i) => {
        this.setState({focus: false})
        let list = this.props.list;
        list[index].todo[i].completed = !list[index].todo[i].completed
        this.props.updateList(list[index], index, i)
    }

    handleDelete = (index, i) => {
        let list = this.props.list;
        this.props.deleteTodo(list[index], index, i);
    }


    handleInput = (text, item) => {
        item.name = text
    }

    checkInput = (item, index, i) => {
        if(item.name == ""){
            this.handleDelete(index)
        }
        else{
            this.props.updateList(this.props.list[index], index, i)
        }
    }

    closeSwipe = () => {
        this.state.swipeRef.forEach((swipeable) => {
                swipeable?.close()
            })
    }

    renderTodaysList = (item, index) => {
        return item.todo.map((task, i) => {
            if (!task.completed)
            return (
                <View key={i}>
                    <CustomInput 
                        item = {task} 
                        index={index}
                        secondIndex = {i}
                        list={item} 
                        handleDelete = {(index) => this.handleDelete(index, i)}
                        checkInput = {(item, index) => this.checkInput(item, index, i)}
                        handleInput = {(text, item) => this.handleInput(text, item)}
                        toggleCompleted = {index => this.toggleCompleted(index, i)}
                        swipeRef = {this.state.swipeRef}
                        focus = {this.state.focus}
                        subtext={'category'}
                        updateList = {(list, index, i) => this.props.updateList(list, index, i)}
                        todayFields = {true}
                    />
                </View>
            )
        })
    }

    renderCompleted = (list) => {
        return list.map((category, index) => {
            return category.todo.map((item, i) => {
                if(!item.completed) return
                return (
                    <View key={i} style = {[styles.input, {borderBottomWidth:  0.5, opacity: 0.5}]}>
                            <TouchableOpacity onPress={() => this.toggleCompleted(index, i)}>
                                <Icon name = {item.completed ? 'check-circle' : 'circle-thin'} size = {26} color = {category.color} />
                            </TouchableOpacity>
                            <View>
                                <View style = {{flexDirection: 'row', flexGrow: 1}}>
                                    {item.priority === 'High' && <Text style = {{fontSize: 16, color: '#0E86D4'}}>!!! </Text>}
                                    <Text
                                        style = {{ fontSize: 16, flexGrow: 1}} 
                                    >{item.name}</Text>
                                </View>
                                <Text style = {{color: 'grey'}}>{category.category}</Text>
                            </View>
                        </View>
                )
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.list !== prevProps.list){
            if(this.props.list.length === 0)
                this.setState({emptylist: true})
        }
    }

    renderListFooter = (list) => {
        return (
            <View style = {{opacity: this.state.fade}}>
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
            </View>
        )
    }

    render() {
        list = this.props.list
        return (
            <SafeAreaView style = {styles.container} onTouchStart={() => this.closeSwipe()}>
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
                
                <FlatList
                    data={list}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => (this.renderTodaysList(item, index))}
                    ListFooterComponent={
                        list.some(item => item.todo.some(val => val.completed)) &&
                        this.renderListFooter(list)
                    }
                    />
                    
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