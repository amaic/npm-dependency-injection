import { TServiceContructor } from "../types/TServiceConstructor";

export const IRegisterServiceId = Symbol("IRegisterService");
export default interface IRegisterService
{
    /**
     * Register an existing object instance as singleton.
     * @param serviceId Unique identifier of service.
     * @param instance object instance to register.
     */
     registerInstance(serviceId:symbol,instance:any):void;

     registerSingleton(serviceId:symbol,constructor:TServiceContructor):void;
     registerScoped(serviceId:symbol,constructor:TServiceContructor):void;
     registerTransient(serviceId:symbol,constructor:TServiceContructor):void;
}