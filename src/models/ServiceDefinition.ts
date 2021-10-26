import { TServiceType } from "../types/TServiceType";
import { TServiceContructor } from "../types/TServiceConstructor";

export default class ServiceDefinition
{
    constructor(
        serviceType:TServiceType,
        serviceId:symbol,
        serviceConstructor:TServiceContructor
    ) 
    {
        this.serviceType = serviceType;
        this.serviceId = serviceId;
        this.serviceConstructor = serviceConstructor;
    }

    readonly serviceType:TServiceType;
    readonly serviceId:symbol;
    readonly serviceConstructor:TServiceContructor;
}