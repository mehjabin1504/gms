export class MenuMasterModel{
    uniqueId : any;
    applicationUniqueId : any;
    componentUniqueId : any;
    parentUniqueId : any;
    componentName : string;
    menuType : string;
    levelCode : any;
    menuSerial : any;
    activeFlag : string;
    constructor(menuMasterModel){
        this.uniqueId = menuMasterModel.uniqueId;
        this.applicationUniqueId = menuMasterModel.applicationUniqueId;
        this.componentUniqueId = menuMasterModel.componentUniqueId;
        this.parentUniqueId = menuMasterModel.parentUniqueId;
        this.componentName = menuMasterModel.componentName;
        this.menuType = menuMasterModel.menuType;
        this.levelCode = menuMasterModel.levelCode;
        this.menuSerial = menuMasterModel.menuSerial;
        this.activeFlag = menuMasterModel.activeFlag;
    }
}