export interface Search {
    data: Array<object>,
    request: Function,
    status: string,
    placeholder: string,
    error: string
}

export interface Item {
    result: string
    onSelect: Function
}