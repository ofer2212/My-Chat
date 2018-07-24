import * as React from "react";
import {IMessage} from "../../../server";
// recomopse

interface IMessageProps {
    message: IMessage,
    currentUserId: string
    isMember: boolean
}

const Message: React.SFC<IMessageProps> = (props) => {
    return <div className={`chat ${props.message.from === props.currentUserId ? "right" : "left"} ${props.isMember}`}>
        {props.message.content}
    </div>
};


export default Message;