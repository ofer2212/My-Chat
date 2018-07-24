import * as React from "react";
import {Component} from 'react'
import MessageInput from '../messageInput/MessageInput'
import MessagesArea from '../MessagesArea/MessagesArea'
import SideBar from '../SideBar/SideBar'
import TitleBar from '../TitleBar/TitleBar'



class Layout extends Component<{}, {}> {

    constructor(props: any) {
        super(props)
    }


    public render() {
        return <div id="layout">
            <TitleBar/>
            <div id="sideAndChat">
                <SideBar/>
                <MessagesArea/>
            </div>
            <MessageInput/>

        </div>;
    }
}


export default Layout