import * as React from "react";
import {IMessage} from "../../../server";
import {IGlobalState} from "../../appStore";
import {store} from "../../index";


interface IMessageProps {
    message: IMessage,
     currentUserId: string
    isMember: boolean
}








const UserEntity: React.SFC<IMessageProps> = (props) => {
     return <div className={`entity ${props.message.from === props.currentUserId ? "right" : "left"} ${props.isMember}`}>
        {props.message.content}
    </div>
};


export default UserEntity;