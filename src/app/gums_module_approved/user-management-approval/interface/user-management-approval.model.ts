export class UserManagementApprovalModel {
    uniqueID: number;
    operationType: string;
    eventUniqueId: string;
    workflowUniqueId: string;
    componentUniqueId: string;
    approvalStatus: string;
    createdBy: string;
    updatedBy: string;
    nextLevel: string;
    nextRole: string;
    approvalLevel: number;
    activeFlag: string;
    oldValue: any;
    newValue: any;
    newValueView:any;
    approvalAuthorities: any;
    updatedTime: any;

    // constructor(userManagementApprovalModel)  {
    //     this.uniqueID = userManagementApprovalModel.uniqueID;
    //     this.operationType = userManagementApprovalModel.operationType;
    //     this.eventUniqueId = userManagementApprovalModel.eventUniqueId;
    //     this.workflowUniqueId= userManagementApprovalModel.workflowUniqueId;
    //     this.componentUniqueId= userManagementApprovalModel.componentUniqueId;
    //     this.approveStatus = userManagementApprovalModel.approveStatus;
    //     this.createdBy = userManagementApprovalModel.createdBy;
    //     this.updatedBy = userManagementApprovalModel.updatedBy;
    //     this.nextLevel = userManagementApprovalModel.nextLevel;
    //     this.nextRole = userManagementApprovalModel.nextRole;
    //     this.approvalLevel = userManagementApprovalModel.approvalLevel;
    //     this.activeFlag = userManagementApprovalModel.activeFlag;
    //     this.oldValue = userManagementApprovalModel.oldValue;
    //     this.newValue = userManagementApprovalModel.newValue;
    //     this.approvalAuthorities = userManagementApprovalModel.approvalAuthorities;
    //   }
    
}