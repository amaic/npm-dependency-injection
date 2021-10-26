export default class EServiceIdAlreadyRegistered extends Error
{
    constructor(serviceId:symbol) 
    {
        super(`service id '${serviceId.toString()}' already registered`);        

        this.serviceId = serviceId;
    }

    readonly serviceId:symbol;
}