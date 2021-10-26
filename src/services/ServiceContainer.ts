import IRegisterService from "../interfaces/IRegisterService";
import ServiceDefinition from "../models/ServiceDefinition";
import { TServiceType } from "../types/TServiceType";
import { TServiceContructor } from "../types/TServiceConstructor";
import ServiceScope from "./ServiceScope";
import EServiceIdAlreadyRegistered from "../exceptions/EServiceIdAlreadyRegistered";
import IServiceProvider from "../interfaces/IServiceProvider";

export default class ServiceContainer implements IRegisterService
{
    private serviceDefinitions:any = {};
    private mainScope = new ServiceScope(this.getServiceDefinition.bind(this),null);

    private getServiceDefinition(serviceId:symbol):ServiceDefinition|null
    {
        if(serviceId in this.serviceDefinitions)
        {
            return this.serviceDefinitions[serviceId];
        }
        else
        {
            return null;
        }
    }

    private registerService(serviceType:TServiceType, serviceId:symbol, serviceConstructor:TServiceContructor, overwrite:boolean):void
    {
        if(overwrite && serviceId in this.serviceDefinitions) 
            throw new EServiceIdAlreadyRegistered(serviceId);

        const serviceDefinition = new ServiceDefinition(
            serviceType,
            serviceId,
            serviceConstructor
        );

        this.serviceDefinitions[serviceId] = serviceDefinition;
    }

    registerInstance(serviceId:symbol, instance:any, overwrite:boolean=false):void
    {
        this.registerService(TServiceType.Singleton, serviceId, ()=>instance, overwrite);
    }

    registerSingleton(serviceId: symbol, serviceConstructor: TServiceContructor, overwrite:boolean=false):void
    {
        this.registerService(TServiceType.Singleton, serviceId, serviceConstructor, overwrite);
    }

    registerScoped(serviceId: symbol, serviceConstructor: TServiceContructor, overwrite:boolean=false):void
    {
        this.registerService(TServiceType.Scoped, serviceId, serviceConstructor, overwrite);
    }

    registerTransient(serviceId: symbol, serviceConstructor: TServiceContructor, overwrite:boolean=false):void
    {
        this.registerService(TServiceType.Transient, serviceId, serviceConstructor, overwrite);
    }

    getServiceProvider():IServiceProvider
    {
        return this.mainScope;
    }

}
