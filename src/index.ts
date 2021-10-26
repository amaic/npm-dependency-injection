import IRegisterService from "./interfaces/IRegisterService";
import IServiceProvider from "./interfaces/IServiceProvider";
import ServiceContainer from "./services/ServiceContainer";
import { TServiceRegistration } from "./types/TServiceRegistration";

export default function registerServices(serviceRegistration:TServiceRegistration):IServiceProvider
{
    const serviceContainer = new ServiceContainer();

    serviceRegistration(serviceContainer);

    return serviceContainer.getServiceProvider();
}