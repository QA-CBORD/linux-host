import { Injectable } from "@angular/core";
import { MUserInfo } from "../models/user/user-info.interface";

Injectable()
export class BaseProvider{


    private static userInfo: MUserInfo;

    constructor(
    ) {
    }

    public static getUserInfo(): MUserInfo {
        return BaseProvider.userInfo;
    }

    public static setUserInfo(userInfo :MUserInfo) {
        BaseProvider.userInfo = userInfo;
    }

}