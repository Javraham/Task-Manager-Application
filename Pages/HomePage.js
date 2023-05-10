import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Modal, Button, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Categories from '../components/Categories';
import AddCategory from './AddCategory';
import Summary from '../components/Summary';
import TodayTasks from '../components/TodayTasks';
import {db} from '../firebase'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {query, collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc, Timestamp, serverTimestamp} from 'firebase/firestore'


class HomePage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            addCategory: false,
            lists: [],
        }
        this.unsubscribe = null;
        this.query = query(collection(db, 'lists'));
    }

    componentDidMount(){
        this.unsubscribe = onSnapshot(this.query, (querysnap) => {
            let listArray = []
            querysnap.forEach((doc) => {
                listArray.push({...doc.data(), id: doc.id})
            })
            this.setState({lists: listArray})
        })
    }

    componentWillUnmount() {
        this.unsubscribe;
    }

    toggleModal() {
        this.setState({addCategory: !this.state.addCategory})
    }

    addCategory = async (list) => {
        const newCat = await addDoc(collection(db, 'lists'), {
            category: list.category,
            color: list.color,
            icon: list.icon,
            todo: list.todo,
            timestamp: list.timestamp
        })
    }

    updateList = async () => {
        const updated = doc(db, 'lists', list.id)
        await updateDoc(updated, {
            todo: list.todo,
        })
    }

    deleteList = async (list) => {
        await deleteDoc(doc(db, 'lists', list.id))
    }

    renderEmptyList() {
        if(this.state.lists.length === 0){
            return (
                <View style = {{justifyContent: 'center', height: '100%', alignItems: 'center'}}>
                    <Text style = {{fontSize: 20, color: 'grey'}}>Currently No Added Lists</Text>
                </View>
            )
        }
    }

    getTodaysList = () => {
        let list = this.state.lists;
        const todayList = list.map(val => {
            return {...val, todo: val.todo.filter(value => {
                let date = value.Date === null ? null : !(value?.Date instanceof Date) ? value?.Date?.toDate() : value.Date
                return date === null ? false : (date.getMonth() === new Date().getMonth() && 
                    date.getFullYear() === new Date().getFullYear() && 
                    date.getDate() === new Date().getDate())
            })}
        });
        return todayList
    }

    getScheduledList = () => {
        let list = this.state.lists;
        const scheduledList = list.map(val => {
            return {...val, todo: val.todo.filter(value => {
                return value.Date !== null && !value.completed
            })}
        });
        return scheduledList.filter(object => object.todo.length > 0)
    }

    getPriorityList = () => {
        let list = this.state.lists;
        const highPriorityList = list.map(val => {
            return {...val, todo: val.todo.filter(value => {
                return value.priority === 'High' && !value.completed
            })}
        });
        const lowPriorityList = list.map(val => {
            return {...val, todo: val.todo.filter(value => {
                return value.priority === 'Low' && !value.completed
            })}
        });

        return [highPriorityList.filter(object => object.todo.length > 0), lowPriorityList.filter(object => object.todo.length > 0)]
    }

    getCompletedList = () => {
        let list = this.state.lists;
        const completedList = list.map(val => {
            return {...val, todo: val.todo.filter(value => {
                return value.completed
            })}
        });
        return completedList.filter(object => object.todo.length > 0)
    }

    getLists = () => {
        return this.state.lists
    }

    render(){
        console.log(this.getScheduledList())
        return (
            <SafeAreaView style = {styles.container}>
                <Modal animationType='slide' visible = {this.state.addCategory} onRequestClose={this.state.addCategory}>
                    <AddCategory close = {() => this.toggleModal()} add = {this.addCategory}/>
                </Modal>
                <View>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style = {styles.title}>Welcome Back,</Text>
                        <Pressable style = {{padding: 7}}>
                            <Ionicons name='search' size={25} />
                        </Pressable>
                    </View>
                    <Text style = {styles.name}>Jonathan Avraham</Text>
                </View>
                <View>
                    <TodayTasks list = {this.getTodaysList()} updateList = {() => this.updateList(list)}/>
                </View>
                
                <View style = {{ gap: 20, height: '30%'}}>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style= {{ color: 'navy', fontSize: 20, fontWeight: 500}}>My Lists</Text>
                        <TouchableOpacity style = {styles.addCat} onPress = {() => this.toggleModal()}>
                            <Icon name = {'plus'} color = 'white'/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {this.renderEmptyList()}
                        <FlatList
                            data={this.getLists()}
                            keyExtractor={item => item.id}
                            horizontal = {true}
                            showsHorizontalScrollIndicator = {false}
                            renderItem={({item}) => (
                                <Categories list = {item} updateList = {() => this.updateList(list)} deleteList = {() => this.deleteList(list)}/>
                        )}
                        />
                    </View>
                </View>
                  <View>
                     <Text style= {{ color: 'navy', fontSize: 20, paddingBottom: 20, fontWeight: 500}}>Summary</Text>
                     <View style = {styles.summary}>
                         <Summary title = 'All' color = "#2980B9" iconName = 'inbox' list = {this.getLists()}/>           
                         <Summary title = 'Completed' iconName = 'check' color = "#009B77" list = {this.getCompletedList()}/>
                         <Summary title = 'Priorities' iconName = 'star-o' color = '#F1C40F' list = {this.getPriorityList()}/>
                         <Summary title = 'Scheduled' iconName = 'calendar-o' color = "red" list = {this.getScheduledList()}/>
                     </View>
                 </View>
            </SafeAreaView>
            
        );
    }
}

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        marginHorizontal: 12
    },

    title: {
        fontSize: 35,
        fontWeight: '300',
        color: 'navy'
    },

    addCat: {
        padding: 10,
        borderRadius: 8,
        marginRight: 20,
        backgroundColor: 'red'
    },

    info: {
        height: '45%',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
    },

    name: {
        fontSize: 20,
        color: 'lightblue',
        fontWeight: 'bold'
    },

    summary: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '10%'
    }
})