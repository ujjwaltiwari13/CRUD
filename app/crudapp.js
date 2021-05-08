'use strict';
import React, { Component } from 'react';
import {
    
    
    TextInput,
    TouchableHighlight,
    ScrollView,
    StyleSheet,
    Text,
    View,

} from 'react-native';

export default class crudapp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            naData:[],
        }
        this.dataId = null;
        this.name = null;
        this.address = null;
    }
    obtain_employee = () => {        
        fetch("api link", { method: "GET" })
            .then((responseData) => {
                return responseData.json();
            })
            .then((jsonData) => {
                console.log(jsonData);
                this.setState({ apiData: jsonData })
                console.log(this.state.apiData);
            })
            .done();
        this.dataId = null;

    }

    forward_data = () => {         
        fetch("api link", {
            method: "POST", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.name, address: this.address })
        })
            .then((responseData) => {
                return responseData.json();
            })
            .then((jsonData) => {
                
                this.setState({ naData: jsonData })
                console.log(this.state.naData);
            })
            .done();
        this.name = null;
        this.address = null;
    }

    recieve_databyID = () => {    
        if (this.dataId != null || this.dataId != "") {
            fetch("api link"+(this.dataId) , { method: "GET" })
                .then((responseData) => {
                    return responseData.json();
                })
                .then((jsonData) => {
                    console.log(jsonData);
                    this.setState({ apiData: jsonData })
                })
                .done();
        }
            this.dataId = null;
    }

    new_employeeUpdate = () => {         
        fetch("api link", {
            method: "put", headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.name, address: this.address, id: this.dataId})
        })
            .then((responseData) => {
                return responseData.json();
            })
            .done();
        this.dataId = null;
        this.name = null;
        this.address = null;
    }

    delete_employee = () => {     
        if (this.dataId != null || this.dataId != "") {
            fetch("api link"+(this.dataId) , { method: "delete" })
                .then((responseData) => {
                    console.log(responseData.rows);
                })
                .done();
        }
            this.dataId = null;
    }

  



    render() {
        const data = this.state.apiData;
        let dataDisplay = data.map(function (jsonData) {
           
            return (
                <View key={jsonData.id}>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{ color: "#511099" }}>{jsonData.id} </Text>
                        <Text style={{ color: "#511099" }}>{jsonData.name}</Text>
                    </View>
                    <View style={styles.separator} />
                </View>
            )
        });
        return (
            <View style={styles.container}>
                <Text>Fetching Data From API URL</Text>
                <View>
                    <Text>Enter to read data</Text>
                    <TextInput style={styles.input}         
                        onChangeText={(text) => {
                                this.dataId = text
                        }}
                        value={this.dataId}
                    />
                    <Text>Name</Text>
                    <TextInput style={styles.input}         
                        onChangeText={(text) => {
                                this.name = text
                        }}
                        value={this.name}
                    />
                    <Text>Address</Text>
                    <TextInput style={styles.input}         
                        onChangeText={(text) => {
                                this.address = text
                        }}
                        value={this.address}
                    />
                    <View style={{flexDirection:"row", flexWrap:"wrap"}}>
                    <TouchableHighlight onPress={this.obtain_employee} style={styles.button}>
                        <Text>GET All Data</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.recieve_databyID} style={styles.button}>
                        <Text>GET Data By ID</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.forward_data} style={styles.button}>
                        <Text>Send Data</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.delete_employee} style={styles.button}>
                        <Text>Delete Data</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.new_employeeUpdate} style={styles.button}>
                        <Text>Update Data</Text>
                    </TouchableHighlight>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {dataDisplay}
                </ScrollView>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
       
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        backgroundColor: '#eeeeee',
        padding: 10,
        marginRight: 5,
        marginLeft: 5,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },

    contentContainer: {
        paddingVertical: 20
    },
    input: {
        height: 36,
        padding: 4,
        marginRight: 5,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48afdb',
        borderRadius: 4,
        color: '#48BBEC'
    },
});
