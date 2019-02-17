export class ApiUrl {
    public static SERVER_URL = 'http://localhost:8000';
    public static LOGIN_URL = '/api/v1/users/actions/login';
    public static STATUS_URL = '/api/v1/holidays';
    public static APPROVE_HOLIDAYS_URL = '/api/v1/holidays/approve';
    public static APPROVE_EMPLOYEE_HOLIDAYS_URL = '/api/v1/holidays/employees';
    public static APPROVE_SUPER_HOLIDAYS_URL = '/api/v1/holidays/supervisors';
    public static REFRESH_TOKEN_URL = '/api/v1/auth/refresh';
    public static HOLIDAY_BALANCE_URL = '/api/v1/users/holiday-balance';
}
