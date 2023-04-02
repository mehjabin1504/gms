export class EventWiseWorkflowModel{
    uniqueId : any;
    workflowUniqueId : any;
    eventUniqueId : any;
    createdBy : string;
    updatedBy : string;
    activeFlag : string;
    approvalAuthorities : any;
    updatedApprovalAuthorities : any;

    constructor(eventWiseWorkflowModel){
        this.uniqueId = eventWiseWorkflowModel.uniqueId;
        this.eventUniqueId = eventWiseWorkflowModel.eventUniqueId;
        this.workflowUniqueId = eventWiseWorkflowModel.workflowUniqueId;
        this.createdBy = eventWiseWorkflowModel.createdBy;
        this.updatedBy = eventWiseWorkflowModel.updatedBy;
        this.activeFlag = eventWiseWorkflowModel.activeFlag;
        this.approvalAuthorities = eventWiseWorkflowModel.approvalAuthorities;
        this.updatedApprovalAuthorities = eventWiseWorkflowModel.updatedApprovalAuthorities;
    }
}