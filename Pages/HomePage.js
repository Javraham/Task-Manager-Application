import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tempData from '../tempData';
import Categories from '../components/Categories';
import AddCategory from './AddCategory';
import Summary from '../components/Summary';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodayTasks from '../components/Information';

const Today = {
    category: 'Todays List',
    color: '#E3DFFD',
    id: 1,
    todo: [
        {
            name: 'Go to Mall',
            completed: true,
            key: 0
        },
        {
            name: 'Go to Eat',
            completed: false,
            key: 1
        },
    ]
}

class HomePage extends React.Component {
    state= {
        addCategory: false,
        lists: tempData,
        today: Today
    }

    toggleModal() {
        this.setState({addCategory: !this.state.addCategory})
    }

    addCategory = list => {
        this.setState({lists: [...this.state.lists, {...list, id: this.state.lists.length + 1}]})
    }

    updateList = list => {
        this.setState({
            lists: this.state.lists.map(item => {
                return item.id === list.id ? list : item
            })
        })
    }

    render(){
        const {navigation} = this.props
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
                        <Text style= {{ color: 'navy', fontSize: 20, fontWeight: 500}}>My Projects</Text>
                        <TouchableOpacity style = {styles.addCat} onPress = {() => this.toggleModal()}>
                            <Icon name = {'plus'} color = 'white'/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            data={this.state.lists}
                            keyExtractor={item => item.id}
                            horizontal = {true}
                            showsHorizontalScrollIndicator = {false}
                            renderItem={({item}) => (
                                <Categories navigation = {navigation} list = {item} updateList = {() => this.updateList(list)}/>
                        )}
                        />
                    </View>
                </View>
                <View>
                    <Text style= {{ color: 'navy', fontSize: 20, paddingBottom: 20, fontWeight: 500}}>Summary</Text>
                    <View style = {styles.summary}>
                        <Summary title = 'Completed' iconName = 'check' color = "green" list = {this.state.lists}/>
                        <Summary title = 'Priority' color = "gold" iconName = 'star' list = {this.state.lists}/>           
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
        gap: 20,
    }
})