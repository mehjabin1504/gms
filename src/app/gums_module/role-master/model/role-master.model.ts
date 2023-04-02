export class RoleMasterModel{
    uniqueId : any;
    roleId : any;
    roleName : any;
    createdBy : string;
    updatedBy : string;
    activeFlag : string;
    approvalAuthorities : any;
    updatedApprovalAuthorities : any;


    constructor(roleMasterModel){
        this.uniqueId = roleMasterModel.uniqueId;
        this.roleId = roleMasterModel.roleId;
        this.roleName = roleMasterModel.roleName;
        this.createdBy = roleMasterModel.createdBy;
        this.updatedBy = roleMasterModel.updatedBy;
        this.activeFlag = roleMasterModel.activeFlag;
        this.approvalAuthorities = roleMasterModel.approvalAuthorities;
        this.updatedApprovalAuthorities = roleMasterModel.updatedApprovalAuthorities;
    }
}