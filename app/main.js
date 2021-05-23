// Using curl for sending email but can use Nodemailer for NodeJS

import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    ScrollView
} from 'react-native';

import {
    Header,
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import MyView from './MyView';
import QRCodeScanner from 'react-native-qrcode-scanner';

// const curl = new (require( 'curl-request' ))();
// curl.setHeaders([
//   'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
// ])

class main extends React.Component {
    // export default class main extends React.Component {

    constructor(props) {
        super(props);

        // const [scan, setScan] = useState(false)
        // const [result, setResult] = useState()

        // For testing isLoggedIn is turned to true. turn it false for final app. 
        this.state = {
            username: "",
            password: "",
            role: "",
            department: "",
            API_URL: "https://work--force-api.herokuapp.com",
            // API_URL: "http://192.168.1.121:5000",
            activity_controller: Boolean(false),
            updatespin: Boolean(false),
            textValue: "", //REF: https://stackoverflow.com/a/45057728
            update:"",
            textCommand: "",
            isLoggedIn: false,
            scan: false,
            scanned_text:"",
            result: "",
            isHidden: true,
            scan_command: "Scan QR Code!",
        }
    }

    authenticate = async () => {

        try {
            this.setState({ textValue: 'Processing your request...' })
            this.setState({ activity_controller: !this.state.activity_controller })

            // Get output in json
            await fetch(`${this.state.API_URL}/api/authenticate?username=${this.state.username}&password=${this.state.password}`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST"
            })
                .then((response) => response.json())
                .then((json) => {
                    // console.log(json)

                    if (json.success) {
                        this.setState({ textValue: 'SUCCESS: Logging you in...' })
                        this.setState({ role: json.role })
                        this.setState({ department: json.department })
                        this.setState({ isLoggedIn: true })
                    }
                    else {
                        this.setState({ textValue: 'Response: ' + json.message + '. Try Again!' })
                        // alert("Response:" + json.message);
                        this.setState({ isLoggedIn: false })
                        this.setState({ activity_controller: Boolean(false) })

                    }
                })

            // // Get output in string
            // await fetch(`${API_URL}/api/authenticate?username=ceo&password=ceo`, {
            //   headers: {
            //     "Content-Type": "application/x-www-form-urlencoded"
            //   },
            //   method: "POST"
            //   }).then(function (body) {
            //     return body.text(); // <--- REF: https://stackoverflow.com/a/45427456
            //   }).then(function (data) {
            //     var json = JSON.stringify(data)
            //     console.log('json:' + json);
            //     console.log('data:' + data);
            //   });

            // // Check if API is working or now
            // await fetch(`${API_URL}`)
            //   .then(function (body) {
            //     return body.text();
            //   }).then(function (data) {
            //     console.log(data);
            //   });

        } catch (error) {
            console.error('error: qr.js Line 76:' + error);
        }
    }

    onSuccess = (e) => {
        // update()
        // console.log(this.authenticate())
        this.setState({ textCommand: `Scanned ${e.data}. Choose from below or scan again!` })
        this.setState({ scanned_text: e.data})
        this.setState({ isHidden: !this.state.isHidden })
        this.setState({ scan: Boolean(false) })

        if (this.state.scan) {
            this.setState({ scan_command: "Scan QR Code!" })
        } else {
            this.setState({ scan_command: "Cancel Scanning!" })
        }

        // this.state.scan = false;
        // setScan(false)
    }


    startScan = () => {

        this.setState({ scan: !this.state.scan })
        if (!this.state.isHidden) {
            // Hides the checkin buttons when scanning again
            this.setState({ isHidden: !this.state.isHidden })
            this.setState({ textCommand: '' })
        }

        // this.setState({scan: Boolean(true)})
        // this.setState({result: Boolean(true)})

        if (this.state.scan) {
            this.setState({ scan_command: "Scan QR Code!" })
        } else {
            this.setState({ scan_command: "Cancel Scanning!" })
        }


        // this.state.scan = true;
        // setScan(true)
        // this.state.result = true;
        // setResult()
    }

    checkin = async () => {
        this.setState({update: 'Processing your request...' })
        this.setState({updatespin: !this.state.updatespin})

        switch(this.state.scanned_text){
            case 'CheckIn':
                this.setState({update: `Checking in` })
                this.updatedb_in_out(this.state.username, this.state.department ,'CheckIn', 'CheckIn')
                break;

            case 'ForkLift1':
                this.fk(true);
                break;

            case 'ForkLift2':
                this.fk(true);
                break;

            case 'ForkLift3':
                this.fk(true);
                break;
        }
    }

    checkout = () => {
        this.setState({update: 'Processing your request...' })
        this.setState({updatespin: Boolean(false)})

        switch(this.state.scanned_text){
            case 'CheckOut':
                this.setState({update: `Checking Out` })
                this.updatedb_in_out(this.state.username, this.state.department ,'CheckOut', 'CheckOut')
                break;
            case 'ForkLift1':
                this.fk(false);
                break;
            case 'ForkLift2':
                this.fk(false);
                break;
            case 'ForkLift3':
                this.fk(false);
                break;
        }
    }

    updatedb_in_out = async (name,department, command, device) =>{
        // Get output in json
        await fetch(`${this.state.API_URL}/api/update?user=${name}&department=${department}&command=${command}&device=${device}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        })
        .then((response) => response.json())
        .then((json) => {
            // console.log(json)

            if (json.success) {
                this.setState({ update: 'SUCCESS: Updated records.' })
                this.setState({ updatespin: Boolean(false) })
            }
            else {
                this.setState({ textValue: 'Response: ' + json.message + '. Try Again!' })
                // alert("Response:" + json.message);
                this.setState({
                    username: "",
                    password: "",
                    role: "",
                    department: "",
                    activity_controller: Boolean(false),
                    updatespin: Boolean(false),
                    textValue: "", //REF: https://stackoverflow.com/a/45057728
                    update:"",
                    textCommand: "",
                    isLoggedIn: Boolean(false),
                    scan: false,
                    scanned_text:"",
                    result: "",
                    isHidden: true,
                    scan_command: "Scan QR Code!",
                })

            }
        })
    }

    logout = () =>{
        this.setState({
            username: "",
            password: "",
            role: "",
            department: "",
            activity_controller: Boolean(false),
            updatespin: Boolean(false),
            textValue: "", //REF: https://stackoverflow.com/a/45057728
            update:"",
            textCommand: "",
            isLoggedIn: Boolean(false),
            scan: false,
            scanned_text:"",
            result: "",
            isHidden: true,
            scan_command: "Scan QR Code!",
        })
    }
 
    fk = (checkin) =>{
        if(checkin){
            if(this.state.department == 'forklift'){
                this.setState({update: `Checking into ${this.state.scanned_text}` })
                this.updatedb_in_out(this.state.username, this.state.department ,'CheckIn', this.state.scanned_text)
            }
            else{
                this.setState({update: `Sorry you are authorised to checkin. Try Again!` })
                this.setState({updatespin: Boolean(false)})
            }
        }
        else{
            if(this.state.department == 'forklift'){
                this.setState({update: `Checking out from ${this.state.scanned_text}` })
                this.updatedb_in_out(this.state.username, this.state.department ,'CheckOut', this.state.scanned_text)
            }
            else{
                this.setState({update: `Sorry you are authorised to checkin. Try Again!` })
                this.setState({updatespin: Boolean(false)})
            }
        }
    }

    /*
    * Simple routing.
    * If the user is authenticated (isLoggedIn) show the LoginScreen, otherwise show the otherscreen
    * https://github.com/mmazzarolo/react-native-login-animation-example/blob/master/src/app.js
    */

    render() {


        if (!this.state.isLoggedIn) {
            return (
                <>
                    <View style={styles.container}>
                        {/* <Image style={styles.image} source={require('./logo_size.jpg')} /> */}
                        <Text style={styles.logo}>WorkForce</Text>
                        <View style={styles.inputView} >
                            <TextInput
                                style={styles.inputText}
                                placeholder="Enter Username"
                                placeholderTextColor="white"

                                onChangeText={text => this.setState({ username: text })} />
                        </View>
                        <View style={styles.inputView} >
                            <TextInput
                                secureTextEntry
                                style={styles.inputText}
                                placeholder="Enter Password"
                                placeholderTextColor="white"
                                onChangeText={text => this.setState({ password: text })} />
                        </View>
                        {/* <TouchableOpacity>
                        <Text style={styles.forgot}>Forgot Password?</Text>
                    </TouchableOpacity> */}

                        <TouchableOpacity style={styles.loginBtn} onPress={() => this.authenticate()}>
                            <Text style={styles.loginText}>LOGIN</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity>
                        <Text style={styles.loginText}>Signup</Text>
                    </TouchableOpacity> */}

                        <Text>{this.state.textValue}</Text>

                        {/* Ref: https://reactnative.dev/docs/activityindicator */}
                        <ActivityIndicator size="large" color="#0000ff" animating={this.state.activity_controller} />
                    </View>
                </>
            );
        }
        else {
            return (
                <View style={styles.container_new}>


                    {/* <TouchableOpacity style={styles.tileScanBtn} onPress={() => this.setState({isHidden: !this.state.isHidden})}>
                            <Text style={styles.tileText}>Tap to hide</Text>
                </TouchableOpacity>

                <MyView>
                    <MyView>
                        <Text style={styles.tileText}>This is always visible</Text>
                    </MyView>
                    <MyView hide>
                        <Text style={styles.tileText}>This is always hidden</Text>
                    </MyView>
                    <MyView hide={this.state.isHidden}>
                        <Text style={styles.tileText}>This will be hidden when we clickon button</Text>
                    </MyView>
                </MyView> */}


                    <Text style={styles.tileText}>Welcome {this.state.username}! </Text>

                    <TouchableOpacity style={styles.tileScanBtn} onPress={() => this.startScan()}>
                        <Text style={styles.tileText}>{this.state.scan_command}</Text>
                    </TouchableOpacity>

                    <Text style={styles.tileText}>{this.state.textCommand}</Text>

                    <Text style={styles.tileText}>{this.state.update}</Text>



                    {/* Side by side buttons REF: https://www.codevscolor.com/react-native-two-buttons-side*/}
                    <MyView style={styles.parent} hide={this.state.isHidden}>
                        {/* Keyword disabled "disabled" */}
                        <TouchableOpacity style={styles.tileBtn} onPress={() => this.checkin()}>
                            <Text style={styles.tileText}>Check In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tileBtn} onPress={() => this.checkout()}>
                            <Text style={styles.tileText}>Check Out</Text>
                        </TouchableOpacity>
                    </MyView>

                    {/* Ref: https://reactnative.dev/docs/activityindicator */}
                    <ActivityIndicator size="large" color="#0000ff" animating={this.state.updatespin} />

                    {/* QR Code Scanner will come here */}

                    <SafeAreaView>
                        <ScrollView
                            contentInsetAdjustmentBehavior="automatic"
                            style={qrstyles.scrollView}>
                            <View style={qrstyles.body}>
                                {
                                    this.state.scan &&
                                    <View style={qrstyles.sectionContainer}>
                                        <QRCodeScanner
                                            reactivate={true}
                                            showMarker={true}
                                            ref={(node) => { this.scanner = node }}
                                            onRead={this.onSuccess}
                                        // topContent={
                                        //     <Text style={qrstyles.centerText}>
                                        //     Scan your QRCode!
                                        //     </Text>
                                        // }
                                        // bottomContent={
                                        //     <TouchableOpacity style={qrstyles.buttonTouchable} onPress={() => this.setState({scan: Boolean(false)})}>
                                        //     <Text style={styles.tileText}>Cancel Scan</Text>
                                        //     </TouchableOpacity>
                                        // }
                                        />
                                    </View>
                                }{
                                    /* {this.state.result &&
                                    <View style={qrstyles.sectionContainer}>
                                        <Text>{this.state.textCommand}</Text>
                                        <Text style={qrstyles.centerText}>{this.state.result}</Text>
                                    </View>
                                    } */
                                }{
                                    /* {!this.state.scan &&
                                    <View style={qrstyles.sectionContainer}>
                                        <Button
                                        title="Start Scaner"
                                        width="16%"
                                        color="#4d1e28"
                                        onPress={this.startScan}
                                        />
                                    </View>
                                    } */
                                }
                            </View>
                        </ScrollView>
                    </SafeAreaView>

                    <TouchableOpacity style={styles.tilelogout} onPress={() => this.logout()}>
                            <Text style={styles.tileText}>Logout</Text>
                    </TouchableOpacity>

                    {/* QR Code Scanner End */}

                </View>
            );
        }
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edc7b7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_new: {
        backgroundColor: "black",
        flex: 1,
    },
    parent: {
        backgroundColor: "black",
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#ac3b61",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#123c69",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#b1b2b5",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "black"
    },
    tileScanBtn: {
        width: '96%',
        backgroundColor: "#4d1e28",
        borderRadius: 25,
        height: "10%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginLeft: 10,
    },
    tileBtn: {
        width: '46%',
        backgroundColor: "#4d1e28",
        borderRadius: 25,
        height: "30%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginLeft: 10,
        marginBottom: 10,
    },
    tilelogout: {
        width: '96%',
        backgroundColor: "black",
        borderRadius: 25,
        height: '10%',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginLeft: 10,
        marginBottom: 10,
    },
    tileText: {
        color: 'white',
    },
});


const qrstyles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});


export default main;