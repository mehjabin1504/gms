export class ComponentWiseEventMappingModel {

    uniqueId: any;
    componentName: any;
    
    eventName: any;
    eventAction: any;
    
    apiRef: any;

    activeFlag: any;
    
    createdBy: any;
   
    
    constructor(componentWiseEventMappingModel) {
        this.uniqueId = componentWiseEventMappingModel.uniqueId;
        this.componentName = componentWiseEventMappingModel.componentName;
        
        this.eventName = componentWiseEventMappingModel.eventName;
        this.eventAction = componentWiseEventMappingModel.eventAction;
        
        this.apiRef = componentWiseEventMappingModel.apiRef;

        this.activeFlag = componentWiseEventMappingModel.activeFlag;
        
        this.createdBy = componentWiseEventMappingModel.createdBy;
        

    }
}
