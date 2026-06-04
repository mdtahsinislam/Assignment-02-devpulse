export declare const createUserService: (payload: any) => Promise<any>;
export declare const loginUserService: (payload: any) => Promise<{
    token: string;
    user: {
        id: any;
        name: any;
        email: any;
        role: any;
        created_at: any;
        updated_at: any;
    };
}>;
//# sourceMappingURL=auth.service.d.ts.map