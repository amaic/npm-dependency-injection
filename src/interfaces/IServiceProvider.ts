import IGetService from "./IGetService";
import INewServiceScope from "./INewServiceScope";

export const IServiceProviderId = Symbol("IServiceProvider");
export default interface IServiceProvider extends IGetService, INewServiceScope
{

}