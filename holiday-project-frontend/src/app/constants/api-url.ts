export class ApiUrl {
    public static SERVER_URL = 'http://localhost:8000';
    public static LOGIN_URL = '/api/v1/users/actions/login';
    public static STATUS_URL = '/api/v1/holidays';
    public static GET_APPROVE_HOLIDAYS_URL = '/api/v1/holidays/approve';
    public static APPROVE_EMPLOYEE_HOLIDAYS_URL = '/api/v1/holidays/employees';
    public static APPROVE_SUPER_HOLIDAYS_URL = '/api/v1/holidays/supervisors';
    public static REFRESH_TOKEN_URL = '/api/v1/auth/refresh';
    public static HOLIDAY_BALANCE_URL = '/api/v1/users/holiday-balance';
    public static CREATE_HOLIDAY_URL = '/api/v1/holidays/actions/create';
    public static UPDATE_HOLIDAY_URL = '/api/v1/holidays/:id/actions/update';
    public static DELETE_HOLIDAY_URL = '/api/v1/holidays/:id/actions/delete';
    public static APPROVE_HOLIDAY_URL = '/api/v1/holidays/:id/actions/approve';
    public static LOGOUT_URL = '/api/v1/users/actions/logout';
}


