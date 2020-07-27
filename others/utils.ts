export const createProperty = (): [(value: any)=> void, ()=> any] => {
    let savedValue:any;
    let setValue = (value: any) => savedValue = value;
    let getValue = ()=>savedValue;
    return [setValue, getValue]
}