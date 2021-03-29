import { Faculty } from "../faculty/faculty.model"

export interface Course{
    name:string,
    topicCovered:string,
    typeOfTution:Tution[]
    faculty:Faculty[]
    class:string[]
}

class Tution{
    type:string
    fee:string
    available:boolean
}