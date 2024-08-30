export enum PhotoStatus {
  PENDING,
  ACCEPTED,
  REJECTED,
  REPLACED,
  DELETED,
}

export enum PhotoType {
  PROFILE_PENDING = -1,
  PROFILE = 0,
  GOVT_ID_FRONT = 1,
  GOVT_ID_BACK = 2,
  CURRENT = -2,
}
