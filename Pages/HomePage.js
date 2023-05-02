import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Categories from '../components/Categories';
import AddCategory from './AddCategory';
import Summary from '../components/Summary';
import TodayTasks from '../components/Information';
import {db} from '../firebase'
import {query, collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc, Timestamp, serverTimestamp} from 'firebase/firestore'

const Today = {
    category: 'Todays List',
    color: 'black',
    icon: 'calendar',
    id: 1,
    todo: []
}

class HomePage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            addCategory: false,
            lists: [],
            today: Today
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
        console.log('hello')
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

    updateList = async (list) => {
        const updated = doc(db, 'lists', list.id)
        await updateDoc(updated, {
            todo: list.todo
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

    render(){
        console.log(this.state.lists)
        return (
            <SafeAreaView style = {styles.container}>
                <Modal animationType='slide' visible = {this.state.addCategory} onRequestClose={this.state.addCategory}>
                    <AddCategory close = {() => this.toggleModal()} add = {this.addCategory}/>
                </Modal>
                <View>
                    <Text style = {styles.title}>Welcome Back,</Text>
                    <Text style = {styles.name}>Jonathan Avraham</Text>
                </View>
                <View>
                    <TodayTasks list = {this.state.today} updateList = {() => this.updateList(list)}/>
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
                            data={this.state.lists}
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
                         <Summary title = 'All' color = "black" iconName = 'inbox' list = {this.state.lists}/>           
                         <Summary title = 'Completed' iconName = 'check' color = "#009B77" list = {this.state.lists}/>
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