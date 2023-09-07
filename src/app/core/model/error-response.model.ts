export interface ErrorResponse {
    errors: Array<string>;
    statusCode: number;
    statusPhrase: string;
    timestamp: Date;
}

export function IsErrorResponse(type: any): boolean {
    return "errors" in type
        && "statusCode" in type
        && "statusPhrase" in type
        && "timestamp" in type;
}
