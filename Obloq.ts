/*！
 * @file Obloq/Obloq.ts
 * @brief DFRobot's obloq makecode library.
 * @n [Get the module here](http://www.dfrobot.com.cn/goods-1577.html)
 * @n Obloq is a serial port of WIFI connection module, Obloq can connect 
 *    to Microsoft Azure IoT and other standard MQTT protocol IoT.
 *
 * @copyright	[DFRobot](http://www.dfrobot.com), 2016
 * @copyright	GNU Lesser General Public License
 *
 * @author [email](1035868977@qq.com)
 * @version  V1.0
 * @date  2018-03-20
 */



//wifi
let OBLOQ_SSID = ""
let OBLOQ_PASSWORD = ""
//mqtt
let OBLOQ_MQTT_PORT = 1883
let OBLOQ_MQTT_SERVER = "iot.dfrobot.com.cn"
let OBLOQ_IOT_PWD = ""
let OBLOQ_IOT_ID = ""
let OBLOQ_IOT_TOPIC = ""
//http
let OBLOQ_HTTP_IP = ""
let OBLOQ_HTTP_PORT = 8080

//Connect to the WiFi IP address.
let IP = "0.0.0.0"

let FIRST = true
let initmqtt = false
let defobloq = false
//http
let myip = ""
let myport = 80
//mqtt
let myhost = ""
let mymqport = 80
//callback function
let cb: Action
let mycb: Action

let param = ""
let e = ""

let serialinit = false

let icon = 1

let SubOk = false
/*
 *Fixed parameters are passed in.
 */
//%
enum Callback {
    //% block="callback"
    C1 = <number>1
}

/**
 *Obloq implementation method.
 */
//% weight=10 color=#008B00 icon="\uf1eb" block="Obloq"
namespace Obloq {
    const OBLOQ_STR_NONE = ""
    const OBLOQ_SUCCE_OK = 0
    const OBLOQ_TRUE = true
    const OBLOQ_FALSE = false

    export class Packeta {
        /**
         * The number payload if a number was sent in this packet (via ``sendNumber()`` or ``sendValue()``)
         * or 0 if this packet did not contain a number.
         */
        public mye: string;
        /**
         * The string payload if a string was sent in this packet (via ``sendString()`` or ``sendValue()``)
         * or the empty string if this packet did not contain a string.
         */
        public myparam: string;
    }


    //% advanced=true shim=Obloq::obloqreadString
    function obloqreadString(size: number): string {
        return OBLOQ_STR_NONE
    }

    //% advanced=true shim=Obloq::obloqgetRxBufferSize
    function obloqgetRxBufferSize(): number { 
        return OBLOQ_SUCCE_OK
    }

    //% advanced=true shim=Obloq::obloqSetTxBufferSize
    function obloqSetTxBufferSize(size: number): void {
        return 
    }

    //% advanced=true shim=Obloq::obloqSetRxBufferSize
    function obloqSetRxBufferSize(size: number): void {
        return 
    }    

    //% advanced=true shim=Obloq::obloqRxBufferedSize
    function obloqRxBufferedSize(): number {
        return OBLOQ_SUCCE_OK
    }    

    //% advanced=true shim=Obloq::obloqEventAfter
    function obloqEventAfter(len: number): void {
        return
    }

    //% advanced=true shim=Obloq::obloqEventOn
    function obloqEventOn(msg: string): void {
        return
    }       
    
    //% advanced=true shim=Obloq::obloqClearRxBuffer
    function obloqClearRxBuffer(): void {
        return
    } 

    //% advanced=true shim=Obloq::obloqClearTxBuffer
    function obloqClearTxBuffer(): void {
        return
    }     
    
    //% advanced=true shim=Obloq::obloqforevers
    function obloqforevers(a: Action): void {
        return
    }
    
    //% advanced=true shim=Obloq::obloqWriteString
    function obloqWriteString(text: string): void {
        return
    }

    function Obloq_wifiIconShow(): void { 
        switch (icon) { 
            case 1: {
                basic.clearScreen()
                led.plot(0, 4)
                icon += 1
            } break;
            case 2: { 
                led.plot(0, 2)
                led.plot(1, 2)
                led.plot(2, 3)
                led.plot(2, 4)
                icon += 1
            } break;
            case 3: {
                led.plot(0, 0)
                led.plot(1, 0)
                led.plot(2, 0)
                led.plot(3, 1)
                led.plot(4, 2)
                led.plot(4, 3)
                led.plot(4, 4)
                icon = 1
            } break;
        }
    }


    /**
	 * Two parallel stepper motors are executed simultaneously(DegreeDual).
     * @param SSID to SSID ,eg: "yourSSID"
     * @param PASSWORD to PASSWORD ,eg: "yourPASSWORD"
     * @param IOT_PWD to IOT_PWD ,eg: "yourIotPwd"
     * @param IOT_ID to SSID ,eg: "yourIotId"
     * @param IOT_TOPIC to SSID ,eg: "yourIotTopic"
    */
    //% weight=102
    //% blockId=Obloq_setup
    //% block="Obloq setup | WIFI: ↴| SSID: %SSID| PASSWORD: %PASSWORD| MQTT: ↴| IOT_PWD: %IOT_PWD| IOT_ID: %IOT_ID| IOT_TOPIC: %IOT_TOPIC"
    export function Obloq_setup(/*wifi*/SSID: string, PASSWORD: string,
                                /*mqtt*/IOT_PWD: string, IOT_ID: string, IOT_TOPIC: string):
    void { 
        OBLOQ_SSID = SSID
        OBLOQ_PASSWORD = PASSWORD
        OBLOQ_MQTT_SERVER = "iot.dfrobot.com.cn"
        OBLOQ_MQTT_PORT = 1883
        OBLOQ_IOT_PWD = IOT_PWD
        OBLOQ_IOT_ID = IOT_ID
        OBLOQ_IOT_TOPIC = IOT_TOPIC
    }

    /**
     * Initialization serial port
     * @param tx to tx, eg: SerialPin.P2
     * @param rx to tx, eg: SerialPin.P1
     * @param Baudrate to tx, eg: BaudRate.BaudRate9600
    */
    //% weight=101
    //% blockId=Obloq_serialInit
    //% block="serial redirect to tx %tx| rx %rx"
    export function Obloq_serialInit(tx: SerialPin, rx: SerialPin): void{ 
        let item = ""
        //First send data through usb, avoid the first data scrambled.
        obloqWriteString("123")  
        item = serial.readString()
        item = serial.readString()
        item = serial.readString()
        serial.redirect(
            tx,
            rx,
            BaudRate.BaudRate9600
        )
        obloqSetTxBufferSize(300)
        obloqSetRxBufferSize(300)
        obloqWriteString("\r")
        item = serial.readString()
        serialinit = OBLOQ_TRUE
        obloqClearRxBuffer()
        obloqClearTxBuffer()
    }

    /**
     * Disconnect the serial port.
    */
    //% weight=97
    //% blockGap=50
    //% blockId=Obloq_quit
    //% block="quit"
    //% advanced=true
    export function Obloq_quit(): void { 
        obloqWriteString("quit!\r")
    }

    /**
     * Send the ping.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */
    //% weight=49
    //% blockId=Obloq_sendPing
    //% block="sendPing timeout|%time"
    //% advanced=true
    export function Obloq_sendPing(time: number): string { 
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1)
        }
        obloqWriteString("|1|1|\r")
        if (!initmqtt) {
            let num = 0
            let item = ""
            while (OBLOQ_TRUE) {
                num = obloqRxBufferedSize()
                //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
                if (num >= 5) {
                    item = obloqreadString(num)
                    for (let i = 0; i < num; i++) {
                        if (item.charAt(i) == '1') {
                            if (item.charAt(i - 1) == '|' &&//|1|1|
                                item.charAt(i + 1) == '|' &&
                                item.charAt(i + 2) == '1' &&
                                item.charAt(i + 3) == '|'
                            ) {
                                return "true"
                            }
                        } else if (item.charAt(i) == 't'&&//timeout
                            item.charAt(i+1) == 'i' &&
                            item.charAt(i+2) == 'm' &&
                            item.charAt(i+3) == 'e' &&
                            item.charAt(i+4) == 'o' &&
                            item.charAt(i+5) == 'u' &&
                            item.charAt(i+6) == 't'
                        ) { 
                            return "timeout"
                        }
                    }
                    return "false"
                }
                basic.pause(100)
                _timeout += 1
                if (_timeout > timeout) {
                    return "timeout"
                }
            }  
        } else { 
            return "true"
        }
        return "true"
    }


    /**
     * Get the software version.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */
    //% weight=50
    //% blockId=Obloq_getVersion
    //% block="get version timeout %time"
    //% advanced=true
    export function Obloq_getVersion(time: number): string { 
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1)
        }
        obloqWriteString("|1|2|\r")
        if (!initmqtt) {
            let num = 0
            let item = ""
            while (OBLOQ_TRUE) {
                num = obloqRxBufferedSize()
                //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
                if (num >= 5) {
                    item = obloqreadString(num)
                    for (let i = 0; i < num; i++) {
                        if (item.charAt(i) == '1') {
                            if (item.charAt(i - 1) == '|' &&//|1|2|
                                item.charAt(i + 1) == '|' &&
                                item.charAt(i + 2) == '2' &&
                                item.charAt(i + 3) == '|'
                            ) {
                                let j = i + 4
                                let z = 0
                                for (i = i + 4; i < num; i++) {
                                    if (item.charAt(i) == '|') {
                                        break;
                                    } else {
                                        z = z + 1
                                    }
                                }
                                return item.substr(j, z)
                            }
                        } else if (item.charAt(i) == 't'&&//timeout
                            item.charAt(i+1) == 'i' &&
                            item.charAt(i+2) == 'm' &&
                            item.charAt(i+3) == 'e' &&
                            item.charAt(i+4) == 'o' &&
                            item.charAt(i+5) == 'u' &&
                            item.charAt(i+6) == 't'
                        ) { 
                            return "timeout"
                        }
                    }
                    return "err"
                }
                basic.pause(100)
                _timeout += 1
                if (_timeout > timeout) {
                    return "timeout"
                }
            }  
        } else { 
            return "true"
        }
        return "true"
    }    
    

    /**
     * Heartbeat request.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */
    //% weight=48
    //% blockId=Obloq_getHeartbeat
    //% block="get heartbeat timeout %time"
    //% advanced=true
    export function Obloq_getHeartbeat(time: number): string { 
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1)
        }
        obloqWriteString("|1|3|" + time + "|\r")
        if (!initmqtt) {
            let num = 0
            let item = ""
            while (OBLOQ_TRUE) {
                num = obloqRxBufferedSize()
                //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
                if (num >= 5) {
                    item = obloqreadString(num)
                    for (let i = 0; i < num; i++) {
                        if (item.charAt(i) == '1') {
                            if (item.charAt(i - 1) == '|' &&//|1|3|
                                item.charAt(i + 1) == '|' &&
                                item.charAt(i + 2) == '3' &&
                                item.charAt(i + 3) == '|'
                            ) {
                                return "OK"
                            }
                        } else if (item.charAt(i) == 't'&&//timeout
                            item.charAt(i+1) == 'i' &&
                            item.charAt(i+2) == 'm' &&
                            item.charAt(i+3) == 'e' &&
                            item.charAt(i+4) == 'o' &&
                            item.charAt(i+5) == 'u' &&
                            item.charAt(i+6) == 't'
                        ) { 
                            return "timeout"
                        }
                    }
                    return "err"
                }
                basic.pause(100)
                _timeout += 1
                if (_timeout > timeout) {
                    return "timeout"
                }
            }  
        } else { 
            return "true"
        }
        return "true"
    }

    /**
     * Stop the heartbeat request.
    */
    //% weight=47
    //% blockId=Obloq_stopHeartbeat
    //% block="stop heartbeat"
    //% advanced=true
    export function Obloq_stopHeartbeat(): boolean { 
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1)
        }
        obloqWriteString("|1|3|-1000|\r")
        return OBLOQ_TRUE
    }



    /**
     * Reconnect WiFi.time(ms): private long maxWait
     * @param time to timeout, eg: 10000
    */
    //% weight=99
    //% blockId=Obloq_reconnectWifi
    //% block="reconnectWifi timeout %time"
    //% advanced=true
    export function Obloq_reconnectWifi(time: number): boolean {
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1)
        }
        obloqWriteString("|2|2|\r")
        if (!initmqtt) {
            let item = ""
            let num = 0
            let j = 0
            while (OBLOQ_TRUE) {
                num = obloqRxBufferedSize()
                //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
                if (num >= 5) {
                    item = obloqreadString(num)
                    for (let i = 0; i < num; i++) {
                        if (item.charAt(i) == '2') {
                            if (item.charAt(i - 1) == '|' &&
                                item.charAt(i + 1) == '|' &&
                                item.charAt(i + 2) == '3' &&
                                item.charAt(i + 3) == '|'
                            ) {
                                j = i + 2
                                let z = 0
                                let ip = ""
                                for (i = i + 2; i < num; i++) {
                                    if (item.charAt(i) == '|') {
                                        break;
                                    } else {
                                        z = z + 1
                                    }
                                }
                                ip = ""
                                ip = item.substr(j, z)
                                IP = ip
                                FIRST = false
                                //serial.writeString(IP);
                                //serial.writeString("\r\n");
                                return OBLOQ_TRUE
                            }
                        }
                    }
                }
                basic.pause(100)
                _timeout += 1
                if (_timeout > timeout) {
                    return OBLOQ_FALSE
                }
            }
        } else { 
            return OBLOQ_TRUE
        }
        return OBLOQ_TRUE
    }
    /**
     * connect Wifi.SSID(string):account; PWD(string):password;
     * time(ms): private long maxWait
    */
    //% weight=100
    //% blockId=Obloq_connectWifi
    //% block="wifi connect"
    export function Obloq_connectWifi(): void { 
        let time = 10000
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (FIRST) { 
            //let item = ""
            //serial.writeString("123")
            //item = serial.readString()
            //item = serial.readString()
            //item = serial.readString()
            // serial.redirect(
            //    SerialPin.P2,
            //    SerialPin.P1,
            //    BaudRate.BaudRate9600
            //)
            //obloqSetTxBufferSize(60)
            //obloqSetRxBufferSize(60)
            if (!serialinit) { 
                Obloq_serialInit(SerialPin.P2, SerialPin.P1)
            }
            Obloq_wifiIconShow()
            for (let i = 0; i < 3; i++) {
                obloqWriteString("|1|1|\r")
                basic.pause(100)
            }  
            obloqreadString(obloqgetRxBufferSize())
            obloqWriteString("|2|1|"+OBLOQ_SSID+","+OBLOQ_PASSWORD+"|\r")
        }
        if (!initmqtt) {
            let item = ""
            let num = 0
            let j = 0
            while (OBLOQ_TRUE) {
                if ((_timeout+1) % 3 == 0) { 
                    Obloq_wifiIconShow()
                }
                num = obloqRxBufferedSize()
                //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
                if (num >= 5) {
                    item = obloqreadString(num)
                    for (let i = 0; i < num; i++) {
                        if (item.charAt(i) == '3') {
                            if (item.charAt(i + 1) == '|' && //|2|3|
                                item.charAt(i - 1) == '|' &&
                                item.charAt(i - 2) == '2' &&
                                item.charAt(i - 3) == '|'
                            ) {
                                j = i + 2
                                let z = 0
                                let ip = ""
                                for (i = i + 2; i < num; i++) {
                                    if (item.charAt(i) == '|') {
                                        break;
                                    } else {
                                        z = z + 1
                                    }
                                }
                                ip = item.substr(j, z)
                                IP = ip
                                FIRST = OBLOQ_FALSE
                                //serial.writeString(IP);
                                //serial.writeString("\r\n");
                                basic.showIcon(IconNames.Yes)
                                return
                            }
                        }
                    }
                }
                /* serial.writeNumber(num)
                 serial.writeString("\r\n");
                 item = obloqreadString(num)
                 for (let i = 0; i < num; i++) { 
                     serial.writeString(item.charAt(i));
                     if (item.charAt(i) == '3') {
                         basic.pause(1000)
                         return
                     }
                 }
                 serial.writeString("\r\n");*/
                basic.pause(100)
                _timeout += 1
                if (_timeout > timeout) {
                    basic.showIcon(IconNames.No)
                    return
                }
            }
        }
        return
    }

    /**
     * Get IP address.
    */
    //% weight=98
    //% blockId=Obloq_Obloq_ifconfig
    //% block="ipconfig"
    //% advanced=true
    export function Obloq_ipconfig(): string { 
        return IP
    }


    /**
     * Set the HTTP parameters.ip(string):ip address;port(number):The port number.
     * @param ip set ip addr, eg: 0.0.0.0
     * @param port set port, eg: 8080
    */
    //% weight=80
    //% blockId=Obloq_initHttp
    //% block="http set | ip %ip| port %port"
    //% advanced=true
    export function Obloq_initHttp(ip: string, port: number): void { 
        defobloq = true
        myip = ip
        myport = port
        initmqtt = OBLOQ_FALSE
    }

    /**
     * The HTTP get request.url(string):URL:time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //% weight=79
    //% blockId=Obloq_httpGet
    //% block="http get | url %url| timeout %time"
    //% advanced=true
    export function Obloq_httpGet(url: string, time: number): string[] { 
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1)
        }
        obloqWriteString("|3|1|http://" + myip + ":" + myport + "/" + url + "|\r")
        //while((strncmp(buf,"|1|3|\r",strlen(buf)) == 0)){
        //    buf = readbuf(mp_obj_get_int(time));
        //  }
        let item = ""
        let num = 0
        let j = 0
        while (OBLOQ_TRUE) {
            num = obloqRxBufferedSize()
            //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
            if (num >= 5) {
                item = obloqreadString(num)
                for (let i = 0; i < num; i++) {
                    if (item.charAt(i) == '3') {
                        if (item.charAt(i - 1) == '|' && //|3|200|
                            item.charAt(i + 1) == '|' &&
                            item.charAt(i + 2) == '2' &&
                            item.charAt(i + 3) == '0' &&
                            item.charAt(i + 4) == '0' &&
                            item.charAt(i + 5) == '|'
                        ) {
                            let z = 0
                            j = i + 6
                            for (i = i + 6; i < num; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            let list = ["200", item.substr(j, z)]
                            return list
                        } else if (item.charAt(i - 1) == '|' && //|3|err|
                            item.charAt(i + 1) == '|'
                        ) {
                            let z = 0
                            j = i + 2
                            for (i = i + 2; i < num; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            let err = item.substr(j, z)
                            let list = [err, ""]
                            return list
                        }
                    } else if (item.charAt(i) == '2') {
                        if (item.charAt(i - 1) == '|' && //|2|1|
                            item.charAt(i + 1) == '|' &&
                            item.charAt(i + 2) == '1' &&
                            item.charAt(i + 3) == '|'
                        ) {
                            let list = ["999", "disconnet wifi"]
                            return list
                        }
                    }
                }
            }
            basic.pause(100)
            _timeout += 1
            if (_timeout > timeout) { 
                let list = ["408", "time out"]
                return list
            }
        }
        let list = ["408", "time out"]
        return list
    }






    /**
     * The HTTP post request.url(string): URL; content(string):content
     * time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //% weight=78
    //% blockId=Obloq_httpPost
    //% block="http post | url %url| content %content| timeout %time"
    //% advanced=true
    export function Obloq_httpPost(url: string, content: string, time: number): string[] { 
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1)
        }
        obloqWriteString("|3|2|http://" + myip + ":" + myport + "/" + url + "," + content + "|\r")
        //while((strncmp(buf,"|1|3|\r",strlen(buf)) == 0)){
        //    buf = readbuf(mp_obj_get_int(time));
        //  }
        let item = ""
        let num = 0
        let j = 0
        while (OBLOQ_TRUE) {
            num = obloqRxBufferedSize()
            //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
            if (num >= 5) {
                item = obloqreadString(num)
                for (let i = 0; i < num; i++) {
                    if (item.charAt(i) == '3') {
                        if (item.charAt(i - 1) == '|' && //|3|200|
                            item.charAt(i + 1) == '|' &&
                            item.charAt(i + 2) == '2' &&
                            item.charAt(i + 3) == '0' &&
                            item.charAt(i + 4) == '0' &&
                            item.charAt(i + 5) == '|'
                        ) {
                            let z = 0
                            j = i + 6
                            for (i = i + 6; i < num; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            let list = ["200", item.substr(j, z)]
                            return list
                        } else if (item.charAt(i - 1) == '|' && //|3|err|
                            item.charAt(i + 1) == '|'
                        ) {
                            let z = 0
                            j = i + 2
                            for (i = i + 2; i < num; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            let err = item.substr(j, z)
                            let list = [err, ""]
                            return list
                        }
                    } else if (item.charAt(i) == '2') {
                        if (item.charAt(i - 1) == '|' && //|2|1|
                            item.charAt(i + 1) == '|' &&
                            item.charAt(i + 2) == '1' &&
                            item.charAt(i + 3) == '|'
                        ) {
                            let list = ["999", "disconnet wifi"]
                            return list
                        }
                    }
                }
            }
            basic.pause(100)
            _timeout += 1
            if (_timeout > timeout) { 
                let list = ["408", "time out"]
                return list
            }
        }
        let list = ["408", "time out"]
        return list
    }


    /**
     * The HTTP put request,Obloq.put() can only be used for http protocol!
     * url(string): URL; content(string):content; time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */
    //% weight=77
    //% blockId=Obloq_httpPut
    //% block="http put | url %url| content %content| timeout %time"
    //% advanced=true
    export function Obloq_httpPut(url: string, content: string, time: number): string[] {
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1)
        }
        obloqWriteString("|3|3|http://"+myip+":"+myport+"/"+url+","+content+"|\r")
        let item = ""
        let num = 0
        let j = 0
        while (OBLOQ_TRUE) {
            num = obloqRxBufferedSize()
            //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
            if (num >= 5) {
                item = obloqreadString(num)
                for (let i = 0; i < num; i++) {
                    if (item.charAt(i) == '3') {
                        if (item.charAt(i - 1) == '|' && //|3|200|
                            item.charAt(i + 1) == '|' &&
                            item.charAt(i + 2) == '2' &&
                            item.charAt(i + 3) == '0' &&
                            item.charAt(i + 4) == '0' &&
                            item.charAt(i + 5) == '|'
                        ) {
                            let z = 0
                            j = i + 6
                            for (i = i + 6; i < num; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            let list = ["200", item.substr(j, z)]
                            return list
                        } else if (item.charAt(i - 1) == '|' && //|3|err|
                            item.charAt(i + 1) == '|'
                        ) {
                            let z = 0
                            j = i + 2
                            for (i = i + 2; i < num; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            let err = item.substr(j, z)
                            let list = [err, ""]
                            return list
                        }
                    } else if (item.charAt(i) == '2') {
                        if (item.charAt(i - 1) == '|' && //|2|1|
                            item.charAt(i + 1) == '|' &&
                            item.charAt(i + 2) == '1' &&
                            item.charAt(i + 3) == '|'
                        ) {
                            let list = ["999", "disconnet wifi"]
                            return list
                        }
                    }
                }
            }
            basic.pause(100)
            _timeout += 1
            if (_timeout > timeout) { 
                let list = ["408", "time out"]
                return list
            }
        }
        let list = ["408", "time out"]
        return list
    }




    /**
     * Delete an HTTP connection.url(string): URL; content(string):content
     * time(ms): private long maxWait
     * @param time set timeout, eg: 10000
    */ 
    //% weight=76
    //% blockGap=50
    //% blockId=Obloq_httpDelete
    //% block="http delete | url %url| content %content| timeout %time"
    //% advanced=true
    export function Obloq_httpDelete(url: string, content: string, time: number): string[] {
        if (time < 100) { 
            time = 100
        }
        let timeout = time / 100
        let _timeout = 0
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1)
        }
        obloqWriteString("|3|4|http://"+myip+":"+myport+"/"+url+","+content+"|\r")
        let item = ""
        let num = 0
        let j = 0
        while (OBLOQ_TRUE) {
            num = obloqRxBufferedSize()
            //item = serial.readUntil(serial.delimiters(Delimiters.NewLine))
            if (num >= 5) {
                item = obloqreadString(num)
                for (let i = 0; i < num; i++) {
                    if (item.charAt(i) == '3') {
                        if (item.charAt(i - 1) == '|' && //|3|200|
                            item.charAt(i + 1) == '|' &&
                            item.charAt(i + 2) == '2' &&
                            item.charAt(i + 3) == '0' &&
                            item.charAt(i + 4) == '0' &&
                            item.charAt(i + 5) == '|'
                        ) {
                            let z = 0
                            j = i + 6
                            for (i = i + 6; i < num; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            let list = ["200", item.substr(j, z)]
                            return list
                        } else if (item.charAt(i - 1) == '|' && //|3|err|
                            item.charAt(i + 1) == '|'
                        ) {
                            let z = 0
                            j = i + 2
                            for (i = i + 2; i < num; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            let err = item.substr(j, z)
                            let list = [err, ""]
                            return list
                        }
                    } else if (item.charAt(i) == '2') {
                        if (item.charAt(i - 1) == '|' && //|2|1|
                            item.charAt(i + 1) == '|' &&
                            item.charAt(i + 2) == '1' &&
                            item.charAt(i + 3) == '|'
                        ) {
                            let list = ["999", "disconnet wifi"]
                            return list
                        }
                    }
                }
            }
            basic.pause(100)
            _timeout += 1
            if (_timeout > timeout) { 
                let list = ["408", "time out"]
                return list
            }
        }
        let list = ["408", "time out"]
        return list
    }
    
/*  readbuf
    function readbuf(timeout: number): string { 
        let item = " "
        let num = 0
        let time = 0
        while (true) { 
            num = obloqRxBufferedSize()
            if (num) { 
                item = obloqreadString(num)
                break
            }
            basic.pause(1)
            time += 1
            if (time > timeout) { 
                item = "timeout"
                break
            }
        }
        return item
    }
*/
 
    /**
     * Connect the MQTT.
     * @param Iot_id set Iot_id, eg: Iot_id
     * @param Iot_pwd set Iot_pwd, eg: Iot_pwd
    */
    //% weight=69
    //% blockId=Obloq_connectMqtt
    //% block="mqtt connect"
    export function Obloq_connectMqtt(): void {
        let _timeout = 0
        defobloq = OBLOQ_TRUE
        mycb = cb
        myhost = OBLOQ_MQTT_SERVER;
        mymqport = OBLOQ_MQTT_PORT;
        initmqtt = OBLOQ_TRUE;
        onEvent()

        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1)
        }
        obloqWriteString("|4|1|1|" + myhost + "|" + mymqport + "|" + OBLOQ_IOT_ID + "|" + OBLOQ_IOT_PWD + "|\r")
        
        while (_timeout<10000) { 
            if (e == "MqttConneted") { 
                break
            }
            basic.pause(1)
            _timeout += 1
        }
        if (_timeout >= 10000) { 
            basic.showString("timeout!")
            return
        }
        Obloq_subTopic()
        _timeout = 0
        while (_timeout<10000) { 
            if (e == "SubOk") { 
                break
            }
            basic.pause(1)
            _timeout += 1
        }
        if (_timeout >= 10000) { 
            basic.showString("timeout!")
            return
        }
        basic.showString("ok")
    } 

    /**
     * Reconnect the MQTT.
    */
    //% weight=65
    //% blockId=Obloq_reconnectMqtt
    //% block="mqtt reconnect"
    //% advanced=true
    export function Obloq_reconnectMqtt(): void {
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1)
        }
        obloqWriteString("|4|1|5|\r")
    }  

    /**
     * Disconnect the MQTT connection.
    */
    //% weight=66
    //% blockId=Obloq_disconnectMqtt
    //% block="mqtt disconnect"
    //% advanced=true
    export function Obloq_disconnectMqtt(): void { 
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1)
        }
    }   

    /**
     * Send a message.
     * @param top set top, eg: top
     * @param mess set mess, eg: mess
    */
    //% weight=68
    //% blockId=Obloq_sendMessage
    //% block="pubLish | %mess"
    export function Obloq_sendMessage(mess: string): void { 
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1)
        }
        let _timeout = 0
        while (!SubOk) { 
            basic.pause(100)
            _timeout += 1
            if (_timeout > 100) { 
                return
            }
        }
        obloqWriteString("|4|1|3|"+OBLOQ_IOT_TOPIC+"|"+mess+"|\r")
    }  

    /**
     * Subscribe to a Topic
     * @param top set top, eg: top
    */
    //% weight=67
    //% blockId=Obloq_subTopic
    //% block="subTopic"
    //% advanced=true
    export function Obloq_subTopic(): void { 
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1)
        }
        obloqWriteString("|4|1|2|"+OBLOQ_IOT_TOPIC+"|\r")
    }  

    function obloq_mqttCallback(a: Action): void{
        cb = a
    }

    /**
     * This is an MQTT listener callback function, which is very important.
     * The specific use method can refer to "example/ObloqMqtt.ts"
    */
    //% weight=62
    //% blockGap=50
    //% mutate=objectdestructuring
    //% mutateText=Packeta
    //% mutateDefaults="myparam:message"
    //% blockId=obloq_mqttCallbackUser block="on obloq received"
    //% advanced=true
    export function obloq_mqttCallbackUser(cb: (packet: Packeta) => void) {
        obloq_mqttCallback(() => {
            const packet = new Packeta();
            packet.mye = e
            packet.myparam = param;
            cb(packet)
        });
    }
    
    function obloqRecevice(): void {
        let size = obloqRxBufferedSize()
        //serial.writeNumber(size)
        if (size > 5) { // serial.writeNumber(1);
            let item = obloqreadString(size)
            //if (size > 10) {serial.writeString(item) }
            for (let i = 0; i < size; i++) {
                if (item.charAt(i) == '1') {
                    if (item.charAt(i - 1) == '|' &&
                        item.charAt(i + 1) == '|'
                    ) {
                        if (item.charAt(i + 2) == '1') { //|1|1|
                            e = "Pingok"
                            param = ""
                            return
                        } else if (item.charAt(i + 2) == '2') { //|1|2|
                            let z = 0
                            let j = i + 4
                            for (i = i + 4; i < size; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            e = "getVersion"
                            param = item.substr(j, z)
                            return
                        } else if (item.charAt(i + 2) == '3') { //|1|3|
                            e = "Heartbeat"
                            param = "OK"
                            return
                        } 
                    }
                } else if (item.charAt(i) == '2') {
                    if (item.charAt(i - 1) == '|' &&
                        item.charAt(i + 1) == '|'
                    ) {
                        if (item.charAt(i + 2) == '3') { //|2|3|
                            let z = 0
                            let j = i + 4
                            for (i = i + 4; i < size; i++) {
                                if (item.charAt(i) == '|') {
                                    break;
                                } else {
                                    z = z + 1
                                }
                            }
                            e = "WifiConnected"
                            param = item.substr(j, z)
                            return
                        } else if (item.charAt(i + 2) == '4') { //|2|4|
                            e = "DisConnected"
                            param = "fail"
                            return
                        } 
                    }
                } else if (item.charAt(i) == '4') { // serial.writeNumber(2);
                    if (item.charAt(i + 1) == '|') {
                        if (item.charAt(i + 2) == '1') {   //|4|1|1|1|
                            if (item.charAt(i + 3) == '|' &&
                                item.charAt(i + 4) == '1' &&
                                item.charAt(i + 5) == '|' &&
                                item.charAt(i + 6) == '1' &&
                                item.charAt(i + 7) == '|'
                            ) {
                                e = "MqttConneted"
                                param = ""
                               // serial.writeNumber(size);
                               return
                            } else if (item.charAt(i + 3) == '|' &&
                                item.charAt(i + 4) == '2' && //|4|1|2|1|
                                item.charAt(i + 5) == '|' &&
                                item.charAt(i + 6) == '1' &&
                                item.charAt(i + 7) == '|'
                            ) {
                                e = "SubOk"
                                SubOk = true
                                param = ""
                                return
                            } else if (item.charAt(i + 3) == '|' &&
                                item.charAt(i + 4) == '3' && //|4|1|3|1|
                                item.charAt(i + 5) == '|' &&
                                item.charAt(i + 6) == '1' &&
                                item.charAt(i + 7) == '|'
                            ) {  //led.plot(0, 1)
                                e = "PulishOk"
                                param = ""
                                return
                            } else if (item.charAt(i + 3) == '|' &&
                                item.charAt(i + 4) == '5' && //|4|1|5|
                                item.charAt(i + 5) == '|'
                            ) {    //led.plot(0, 0)                    //serial.writeNumber(size)
                                let z = 0
                                let j = i + 6
                                for (i = i + 6; i < size; i++) {
                                    if (item.charAt(i) == '|') {
                                        break;
                                    } else {
                                        z = z + 1
                                    }
                                }
                                e = item.substr(j, z)
                                z = 0
                                j = i + 1
                                for (i = i + 1; i < size; i++) {
                                    if (item.charAt(i) == '|') {
                                        break;
                                    } else {
                                        z = z + 1
                                    }
                                }
                                param = item.substr(j, z)///?????????
                                break
                            }
                        } else if (item.charAt(i + 2) == '2') {
                            if (item.charAt(i + 3) == '|' &&  //|4|2|3|
                                item.charAt(i + 4) == '3' &&
                                item.charAt(i + 5) == '|'
                            ) {
                                e = "MqttConnectErr"
                                param = ""
                            } else if (item.charAt(i + 3) == '|') { //|4|2|
                                let z = 0
                                let j = i + 4
                                for (i = i + 4; i < size; i++) {
                                    if (item.charAt(i) == '|') {
                                        break;
                                    } else {
                                        z = z + 1
                                    }
                                }
                                e = "ConnectErr"
                                param = item.substr(j, z)
                                return
                            }
                        }
                    }
                }
            }
            //serial.writeNumber(n);
            // serial.writeString("\r\n");
            obloqforevers(mycb)
        }
        //onEvent()
    }

    function onEvent() {
        if (!serialinit) { 
            Obloq_serialInit(SerialPin.P2, SerialPin.P1)
        }
        //obloqClearRxBuffer()
        //obloqClearTxBuffer()
        //obloqEventAfter(1)
        obloqEventOn("\r")
        control.onEvent(<number>32, <number>1, obloqRecevice); // register handler
    }    

/* !myself test function.!
    //% weight=1
    //% blockId=Obloq_test
    //% block="test"
    export function test(): void { 
        onEvent()
    }  
*/
}