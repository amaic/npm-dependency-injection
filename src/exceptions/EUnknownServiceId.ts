export default class EUnknownServiceId extends Error
{
    constructor(serviceId:symbol) 
    {
        super(`unkown service id '${serviceId.toString()}'`);        
        this.serviceId = serviceId;
    }

    readonly serviceId:symbol;

}