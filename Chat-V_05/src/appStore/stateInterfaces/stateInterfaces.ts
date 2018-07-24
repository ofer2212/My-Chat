import {IGroup, IUser,IClientData,  IMessage} from "../../../server/";


export interface IMessagesStateProps {
    messages: IMessage[];
    messageSentFlag:boolean;
    showMessages:boolean;
    showAddGroupModal:boolean;
    showDeleteGroupModal:boolean;
}


export interface ITreeStateProps {
    renderTree: boolean;
    treeArrowControl: boolean;
    tree:Array<IGroup | IUser>;
    tempData:IClientData;
    selectedEntity :any;
    isMemberOfGroup:boolean;
    updateTree:boolean;

    [key: string]: any;
}

export interface IDisplayStateProps {
    userDetailsLine: string;
    chatWithLine: string;
    newPublicGroupMode:boolean;
    showLendingModal:boolean;
    [key: string]: any;
}

export interface IAppStateProps {
    user: any ;
    error: string;

    [key: string]: any;
}

export interface ILoginStateProps {
    auth: boolean;
    btnLoginTxt: string;
    loginError: string;
    ageInputFieldState: boolean;
    inSignUpMode:boolean;
    isSignOutMode:boolean;

    [key: string]: any;
}

export interface IRootReducer {
    login: ILoginStateProps,
    app: IAppStateProps,
    tree: ITreeStateProps,
    messages: IMessagesStateProps,
    display: IDisplayStateProps

}

export interface IGlobalState {
    login: ILoginStateProps,
    app: IAppStateProps,
    tree:ITreeStateProps,
    messages:IMessagesStateProps,
    display:IDisplayStateProps

}