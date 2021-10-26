import ServiceDefinition from "../models/ServiceDefinition"

export type TGetServiceDefintion = (serviceId:symbol)=>ServiceDefinition|null;