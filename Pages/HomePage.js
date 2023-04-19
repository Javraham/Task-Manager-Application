import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tempData from '../tempData';
import Categories from '../components/Categories';
import AddCategory from './AddCategory';

class HomePage extends React.Component {
    state= {
        addCategory: false,
        lists: tempData
    }

    toggleModal() {
        this.setState({addCategory: !this.state.addCategory})
    }

    addCategory = list => {
        this.setState({lists: [...this.state.lists, {...list, id: this.state.lists.length + 1}]})
        console.log(this.state.lists)
    }

    updateList = list => {
        console.log(this.state.lists)
        this.setState({
            lists: this.state.lists.map(item => {
                return item.id === list.id ? list : item
            })
        })
    }

    render(){
        return (
            <SafeAreaView style = {styles.container}>
                <Modal animationType='slide' visible = {this.state.addCategory} onRequestClose={this.state.addCategory}>
                    <AddCategory close = {() => this.toggleModal()} add = {this.addCategory}/>
                </Modal>
                <View>
                    <Text style = {styles.title}>Good Afternoon,</Text>
                    <Text style = {styles.name}>Jonathan Avraham</Text>
                </View>
                <View style = {{ gap: 20, height: '20%'}}>
                    <Text style= {{ color: 'navy', fontSize: 20}}>List Category</Text>
                    <View>
                        <FlatList
                            data={this.state.lists}
                            keyExtractor={item => item.id}
                            horizontal = {true}
                            showsHorizontalScrollIndicator = {false}
                            renderItem={({item}) => (
                                <Categories list = {item} updateList = {() => this.updateList(list)}/>
                        )}
                        />
                    </View>
                </View>
                <View>
                    <Text style= {{ color: 'navy', fontSize: 20}}>Summary</Text>
                </View>
                <View style = {{position: 'absolute', bottom: 20, right: 20}}>
                    <TouchableOpacity style = {styles.addCat} onPress = {() => this.toggleModal()}>
                            <Icon name = {'plus'} color = 'white'/>
                    </TouchableOpacity>
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
        marginHorizontal: 12,
    },

    title: {
        fontSize: 35,
        fontWeight: '200',
        color: 'navy'
    },

    addCat: {
        padding: 20,
        borderRadius: 30,
        backgroundColor: 'purple'
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
    }
})