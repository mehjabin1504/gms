export class UserRoleModel {
    
    uniqueId: any;
    branchCode: any;
    userCode: any;
    roleId: any;
    effectiveDate: any;
    expiryDate: any;
    createdBy: any;
    createdTime: any;
    approvalAuthorities: any;
    updatedBy: any;
    updatedTime: any;
    activeFlag: any;
    updatedApprovalAuthorities: any;
    
    constructor(userRoleModel) {
        this.uniqueId = userRoleModel.uniqueId;
        this.branchCode = userRoleModel.branchCode;
        this.userCode = userRoleModel.userCode;
        this.roleId = userRoleModel.roleId;
        this.effectiveDate = userRoleModel.effectiveDate;
        this.expiryDate = userRoleModel.expiryDate;
        this.createdBy = userRoleModel.createdBy;
        this.createdTime = userRoleModel.createdTime;
        this.approvalAuthorities = userRoleModel.approvalAuthorities;
        this.updatedBy = userRoleModel.updatedBy;
        this.updatedTime = userRoleModel.updatedTime;
        this.activeFlag = userRoleModel.activeFlag;
        this.updatedApprovalAuthorities = userRoleModel.updatedApprovalAuthorities;
    }
}