import { Injectable } from "@angular/core";
import { UserInfo } from "../models/user/user-info.interface";

Injectable()
export class BaseProvider{


    private static userInfo: UserInfo;

    constructor(
    ) {
    }

    public static getUserInfo(): UserInfo {
        return BaseProvider.userInfo;
    }

    public static setUserInfo(userInfo :UserInfo) {
        BaseProvider.userInfo = userInfo;
    }

}