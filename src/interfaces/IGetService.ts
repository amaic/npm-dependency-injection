export const IGetServiceId = Symbol('IGetService');
export default interface IGetService
{
    getService(serviceId:symbol):any;
}