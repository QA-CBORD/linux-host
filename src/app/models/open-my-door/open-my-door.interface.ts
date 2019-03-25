export interface MMobileLocationInfo {
    locationId: string;
    name: string;
    type: string;
    latitude: number;
    longitude: number;
    distance: number;
    color: string;
    score: number;
}

export interface MActivateMobileLocationResult {
    validityTime: number;
    showBarCode: number;
    showTempCode: number;
    message: string;
    issuedCode: string;
    issuedDate: Date;
    responseCode: string;
}
