export class ActivityMasterModel {

    uniqueId: any;
    activityId: any;
    
    activityName: any;
    activeFlag: any;
    
   
   
    
    constructor(activityMasterModel) {
        this.uniqueId = activityMasterModel.uniqueId;
        this.activityId = activityMasterModel.activityId;
        
        this.activityName = activityMasterModel.activityName;
        this.activeFlag = activityMasterModel.activeFlag;
        
        
        

    }
}
