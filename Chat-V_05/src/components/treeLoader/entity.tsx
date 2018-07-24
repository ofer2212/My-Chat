import * as React from "react";
import {IMessage} from "../../../server";
import {actions, IGlobalState, ITreeStateProps} from "../../appStore";
import {connect} from "react-redux";
import {store} from "../../index";
import {IGroup, IUser} from "../../../server/sharedInterfaces";
import {RefObject} from "react";


interface IGroupEntityProps {
    entity: any,
    onClick: any,
    messageClicked: any,
    arrowDownClicked:any
}


// const processsubEtities= (subEtitiesArr: Array<IGroup | IUser>) => {
//     const storeData: IGlobalState = store.getState();
//     if (msgArr) {
//         return (<div className="messagesDiv">
//                 <ul className="chats">
//
//                     {
//                         msgArr.map((msg, index) =>
//                             <Message isMember={storeData.tree.isMemberOfGroup} key={index} message={msg}
//                                      currentUserId={storeData.app.user.id}/>
//                         )
//                     }
//                 </ul>
//             </div>
//         );
//     }
//     return (<ul/>)
// };
//


const Entity: React.SFC<IGroupEntityProps> = (props) => {

    return <div className={`entityDiv ${props.entity.type} ${props.entity._id}`} onClick={props.onClick}>
        {props.entity.type === "group" ? <img src="pics/groupAvatar.png" className={"userAvatar"}/>
            : <img src={`pics/${props.entity.gender}Avatar.png`} className={"userAvatar"}/>}
        <div className={"entityNameDiv"}>
            <p className={"name"}>{props.entity.name}</p>
            {props.entity.type === "user" ? <p className={"age"}>Age: {props.entity["age"]}</p> : null}
        </div>
        <img onClick={props.messageClicked} src="pics/i-message.png" className={"messageLink"}/>
        <div className={"onlineIndicator"}>
            <svg height="24" width="24">
                <circle className={"onlineCircle"} fill="#a0d36a" cx="12" cy="12" r="6"/>
            </svg>
            {props.entity.type === "group" ? <img onClick={props.arrowDownClicked}
                                                  src="pics/down-arrow.png" className={"downArrow"}/> : null}
        </div>
    </div>
};


// const Entity: React.SFC<IGroupEntityProps> = (props) => {
//     return <div className={`entityDiv ${props.entity.type} ${props.entity.id}`}>
//
//         <svg height="50" width="50">
//             <circle  fill="#a0d36a" cx="24" cy="24" r="20"></circle >
//             <text
//                 fill="#ffffff"
//                 font-size="12"
//                 text-anchor="middle"
//                 x="12"
//                 y="16">{props.entity.name}</text>
//         </svg>
//     </div>
// };
function imageLoader(path: string, className: string) {
    return <img src={path} className={className}/>

}

// function mapStateToProps(state: IGlobalState) {
//     return {
//
//     }
// }
//
// const mapDispatchToProps = dispatch => {
//     return {
// //        setSelection: (tree,selectionPath,currentUser,lastSelection) => dispatch(actions.setSelectedEntity(tree,selectionPath,currentUser,lastSelection)),
//
//
//     }
// };


export default Entity;