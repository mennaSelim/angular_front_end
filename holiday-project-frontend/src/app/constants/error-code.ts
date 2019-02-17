export class ErrorCode {

	public static CANT_CREATE_TOKEN = 0;
    public static TOKEN_EXPIRED = 1;
    public static TOKEN_INVALID = 2;
    public static TOKEN_ABSENT = 3;

    public static VALIDATION_ERROR = 28;

    public static HOLIDAY_NOTFOUND = 5;
    public static HOLIDAY_UNAUTHORIZED = 6;
    public static HOLIDAY_ALREADY_APPROVED = 7;
    public static HOLIDAY_NOT_ENOUGH_LEFT = 8;
    public static HOLIDAY_AMOUNT_MISMATCH = 9;
    public static HOLIDAY_UNAUTHORIZED_APPROVE_EMPLOYEE = 14;
    public static HOLIDAY_UNAUTHORIZED_APPROVE_SUPERVISOR = 17;
    public static HOLIDAY_NOT_ENOUGH_TO_APPROVE = 18;

    
    public static USER_INVALID_CREDENTIALS = 24;
    public static USER_NOT_FOUND = 25;
}