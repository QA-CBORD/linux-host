export interface MMobileLocationInfo extends Favourite {
  locationId: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  distance: number;
  color: string;
  score: number;
}

export interface MMobileLocationParams {
  locationId: string;
  latitude: string;
  longitude: string;
  tranDate: string;
  accuracy: string;
  altitude: string;
  altitudeAccuracy: string;
  speed: string;
  heading: string;
  sourceInfo: string;
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

interface Favourite {
  isFavourite?: boolean;
}
