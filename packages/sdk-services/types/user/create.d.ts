import { ResponsePack } from '../helpers';
interface IRequestResource {
    email?: string;
}
export declare const create: (data: IRequestResource) => Promise<import("@shippo/sdk-utils").HttpResponse<ResponsePack<string>>>;
export {};
