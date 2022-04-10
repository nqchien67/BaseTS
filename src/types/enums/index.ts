export enum ErrorCode {
  Unknown_Error = 'Unknown_Error',
  Invalid_Input = 'Invalid_Input',
  Update_Error = 'Update_Error',
  Update_Expired = 'Update_Expired',
  Username_Or_Password_Invalid = 'Username_Or_Password_Invalid',
  Password_Not_True = 'Password_Not_True',
  Email_Already_exist = 'Email_Already_exist',
  Email_Not_exist = 'Email_Not_exist',
  Token_Not_Exist = 'Token_Not_Exist',
  User_Blocked = 'User_Blocked',
  User_Not_Verify = 'User_Not_Verify',
  Token_Expired = 'Token_Expired',
  /**The client not send the required token in header */
  Refresh_Token_Not_Exist = 'Refresh_Token_Not_Exist',
  /**The client send the expire token or invalid token*/
  Refresh_Token_Expire = 'Refresh_Token_Expire',
  /**The client do not have permission for this action. */
  Permission_Denied = 'Permission_Denied',
  User_Not_Exist = 'User_Not_Exist',
  Not_Found = 'Not_Found',
  Maximum_Retry_Verification_Code = 'Maximum_Retry_Verification_Code',
}

export enum UserStatus {
  BLOCKED = 0,
  ACTIVE = 1,
  NOT_VERIFY = 2,
  REJECT_VERIFY = 3,
}

