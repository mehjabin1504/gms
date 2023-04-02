export class WorkflowMasterModel {
    uniqueId: any;
    workflowId: any;
    workflowName: any;
    fromAmount: any;
    toAmount: any;
    makerCheckerLevel: any;
    additionalCheckerLevel: any;
    createdBy: any;
    approvalAuthorities: any;
    updatedBy: any;
    activeFlag: any;
    additionalInformation: any;

    constructor(workflowMasterModel) {
        this.uniqueId = workflowMasterModel.uniqueId;
        this.workflowId = workflowMasterModel.workflowId;
        this.workflowName = workflowMasterModel.workflowName;
        this.fromAmount = workflowMasterModel.fromAmount;
        this.toAmount = workflowMasterModel.toAmount;
        this.makerCheckerLevel = workflowMasterModel.makerCheckerLevel;
        this.createdBy = workflowMasterModel.createdBy;
        this.approvalAuthorities = workflowMasterModel.approvalAuthorities;
        this.updatedBy = workflowMasterModel.updatedBy;
        this.activeFlag = workflowMasterModel.activeFlag;
        this.additionalInformation = workflowMasterModel.additionalInformation;
        this.additionalCheckerLevel = workflowMasterModel.additionalCheckerLevel;
      }
}