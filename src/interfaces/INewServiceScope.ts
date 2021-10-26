import IServiceProvider from "./IServiceProvider";

export const INewServiceScopeId = Symbol('INewServiceScope');
export default interface INewServiceScope
{
    newServiceScope():IServiceProvider;
}