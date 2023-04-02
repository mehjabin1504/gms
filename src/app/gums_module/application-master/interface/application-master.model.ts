export class ApplicationMasterModel {
    
    uniqueId: any;
    appId: any;
    appName:any;
    purpose: any;
    appUrl: any;
    createdBy: any;
    createTime: any;
    approvalAuthorities: any;
    updatedBy: any;
    updateTime: any;
    activeFlag: any;
    additionalInfo: any;
    
    constructor(applicationMasterModel) {
        this.uniqueId = applicationMasterModel.uniqueId;
        this.appId = applicationMasterModel.appId;
        this.appName = applicationMasterModel.appName;
        this.purpose = applicationMasterModel.purpose;
        this.appUrl = applicationMasterModel.appUrl;
        // this.createdBy = applicationMasterModel.createdBy;
        // this.updateTime = applicationMasterModel.updateTime;
        // this.updatedBy = applicationMasterModel.updatedBy;
        // this.activeFlag = applicationMasterModel.activeFlag;
        // this.additionalInfo = applicationMasterModel.additionalInfo;

    }
}