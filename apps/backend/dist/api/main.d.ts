import { NestExpressApplication } from '@nestjs/platform-express';
export declare const setupApp: (app: NestExpressApplication) => Promise<NestExpressApplication<import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>>>;
export default function handler(req: any, res: any): Promise<any>;
