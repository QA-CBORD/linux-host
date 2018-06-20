export interface MobileLocationInfo {
    locationId: string;
    name: string;
    type: string;
    latitude: number;
    longitude: number;
    distance: number;
    color: string;
    score: number;
}

export interface ActivateMobileLocationResult {
    validityTime: number;
    showBarCode: number;
    showTempCode: number;
    message: string;
    issuedCode: string;
    issuedDate: Date;

}