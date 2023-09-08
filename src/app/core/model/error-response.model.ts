export interface ServerErrorResponse {
    errors: Array<string>;
    statusCode: number;
    statusPhrase: string;
    timestamp: Date;
}

export function IsServerErrorResponse(type: any): boolean {
    return "errors" in type
        && "statusCode" in type
        && "statusPhrase" in type
        && "timestamp" in type;
}
