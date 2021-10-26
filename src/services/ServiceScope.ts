import IGetService from "../interfaces/IGetService";
import { TServiceType } from "../types/TServiceType";
import { TGetServiceDefintion } from "../types/TGetServiceDefinition";
import EUnknownServiceId from "../exceptions/EUnknownServiceId";
import IServiceProvider from "../interfaces/IServiceProvider";
import INewServiceScope from "../interfaces/INewServiceScope";

export default class ServiceScope implements IGetService, INewServiceScope
{
    constructor(
        getServiceDefinition:TGetServiceDefintion,
        mainScope:ServiceScope|null
    ) 
    {
        this.getServiceDefintion = getServiceDefinition;
        this.mainScope = mainScope ?? this;
    }

    private getServiceDefintion:TGetServiceDefintion;
    private mainScope:ServiceScope;

    private services:any = {};




    getService(serviceId:symbol):any
    {
        const serviceDefinition = this.getServiceDefintion(serviceId);
        if(serviceDefinition == null)
            throw new EUnknownServiceId(serviceId);

        switch(serviceDefinition.serviceType)
        {
            case TServiceType.Singleton:
                if(serviceId in this.mainScope.services == false)
                {
                    this.mainScope.services[serviceId] = serviceDefinition.serviceConstructor(this);
                }
                return this.mainScope.services[serviceId];

            case TServiceType.Scoped:
                if(serviceId in this.services == false)
                {
                    this.services[serviceId] = serviceDefinition.serviceConstructor(this);
                }
                return this.services[serviceId];
            
            case TServiceType.Transient:
            default:
                return serviceDefinition.serviceConstructor(this);
        }
    }

    newServiceScope(): IServiceProvider
    {
        return new ServiceScope(this.getServiceDefintion, this.mainScope);
    }


}