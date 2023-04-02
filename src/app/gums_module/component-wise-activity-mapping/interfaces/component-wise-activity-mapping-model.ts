export class ComponentWiseActivityMappingModel {

    uniqueId: any;
    componentUniqueId: any;
    componentName:any;
    activityUniqueId: any;
    activityName:any;
    activeFlag: any;
    
    constructor(componentWiseActivityMappingModel) {
        this.uniqueId = componentWiseActivityMappingModel.uniqueId;
        this.componentUniqueId = componentWiseActivityMappingModel.componentUniqueId;
        this.componentName = componentWiseActivityMappingModel.componentName;
        this.activityUniqueId = componentWiseActivityMappingModel.activityUniqueId;
        this.activityName = componentWiseActivityMappingModel.activityName;
        this.activeFlag = componentWiseActivityMappingModel.activeFlag;
    }
}
