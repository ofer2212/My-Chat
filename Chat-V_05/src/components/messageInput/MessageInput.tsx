import * as React from "react";
import {RefObject} from "react";
import {actions,IGlobalState} from "../../appStore";
import {connect} from "react-redux";
import {Component} from "react";
import {store} from "../../index";


class MessageInput extends Component<any, {}> {

    public messageInputElement: RefObject<HTMLTextAreaElement>;

    constructor(props: any) {
        super(props);
        this.messageInputElement = React.createRef();

    }

    public handleSendClick = () => {
        if (this.messageInputElement.current.value !== "") {
            const storeData: IGlobalState = store.getState();
            this.props.sendMessage(storeData.app.user._id, storeData.tree.selectedEntity._id, this.messageInputElement.current.value);
            this.messageInputElement.current.value = ""
        }
    };


    public render() {
        return <div className="messageInput">
                 <textarea className="inputBox"
                           name="text"
                           ref={this.messageInputElement}
                           rows={1}/>
            <button className="btnSend"
                    onClick={this.handleSendClick}
                    disabled={this.props.isMember}>
                Send
            </button>

        </div>;
    }
}

function mapStateToProps(state: IGlobalState) {
    return {
        //    chatWith :state.tree.selectedEntity,
        isMember: state.tree.isMemberOfGroup
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendMessage: (fromId, toId, content) => dispatch(actions.sendMessage(fromId, toId, content))

    }
};


export default connect(null, mapDispatchToProps)(MessageInput);


