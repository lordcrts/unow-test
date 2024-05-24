import { Position } from "./position.model";

export interface Employee {
    id:string;
    firstName:string;
    lastName:string;
    position:string;
    birthDay:Date | string;
}
  