export class ComponentMasterModel{
    uniqueId : any;
    applicationUniqueId : any;
    componentId : string;
    componentName : string;
    componentType : string;
    passwordRequired : string;
    dualPasswordRequired : string;
    passwordValue : string;
    startTime : string;
    stopTime : string;
    addition : string;
    edit : string;
    enquiry : string;
    runFromDr : string;
    createdBy : string;
    updatedBy : string;
    activeFlag : string;
    approvalAuthorities : any;
    updatedApprovalAuthorities : any;

    constructor(componentMasterModel){
        this.uniqueId = componentMasterModel.uniqueId;
        this.applicationUniqueId = componentMasterModel.applicationUniqueId;
        this.componentId = componentMasterModel.componentId;
        this.componentName = componentMasterModel.componentName;
        this.componentType = componentMasterModel.componentType;
        this.passwordRequired = componentMasterModel.passwordRequired;
        this.dualPasswordRequired = componentMasterModel.dualPasswordRequired;
        this.passwordValue = componentMasterModel.passwordValue;
        this.startTime = componentMasterModel.startTime;
        this.stopTime = componentMasterModel.stopTime;
        this.edit = componentMasterModel.edit;
        this.enquiry = componentMasterModel.enquiry;
        this.runFromDr = componentMasterModel.runFromDr;
        this.createdBy = componentMasterModel.createdBy;
        this.updatedBy = componentMasterModel.updatedBy;
        this.activeFlag = componentMasterModel.activeFlag;
        this.approvalAuthorities = componentMasterModel.approvalAuthorities;
        this.updatedApprovalAuthorities = componentMasterModel.updatedApprovalAuthorities;
    }
}