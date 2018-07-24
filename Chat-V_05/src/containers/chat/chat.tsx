import * as React from "react";
import {Component} from 'react'
import Layout from "../../components/Layout/layout";


interface IChatState {

}

interface IChatProps {

}

class Chat extends Component<IChatProps, IChatState> {


    constructor(props: IChatProps) {
        super(props);

    }


    public render() {

        return <div id="chat">;
            <Layout/>
        </div>
    }
}


export default Chat