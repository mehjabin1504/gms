export class EventMasterModel {
    
    uniqueId: any;
    eventId: any;
    eventName:any;
    createdBy: any;
    createTime: any;
    approvalAuthorities: any;
    updatedBy: any;
    updateTime: any;
    activeFlag: any;
    updatedApprovalAuthorities: any;
    
    constructor(eventMasterModel) {
        this.uniqueId = eventMasterModel.uniqueId;
        this.eventId = eventMasterModel.eventId;
        this.eventName = eventMasterModel.eventName;
        this.createdBy = eventMasterModel.createdBy;
        this.createTime = eventMasterModel.createTime;
        this.approvalAuthorities = eventMasterModel.approvalAuthorities;
        this.updatedBy = eventMasterModel.updatedBy;
        this.updateTime = eventMasterModel.updateTime;
        this.activeFlag = eventMasterModel.activeFlag;
        this.updatedApprovalAuthorities = eventMasterModel.additionalInfo;
    }
}