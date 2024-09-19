import { GusetInfo } from "../../entities/User";

export interface Guset{
    addinfo(data:GusetInfo):Promise<any|null>
}