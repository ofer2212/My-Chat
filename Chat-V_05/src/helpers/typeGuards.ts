export function isGroup(obj: any) {
    return obj.items !== undefined;
}

export function isUser(obj: any) {
    return obj.password !== undefined;
}

export function isUserAuth(obj: any) {
    return obj.password !== undefined;
}
export function isClientUser(obj: any) {
    return obj.age !== undefined;
}
export function isMessage(obj: any) {
    return obj.content !== undefined;
}


