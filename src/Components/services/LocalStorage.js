
export default class Calculations {
    
    static saveNavInfo(jamId, section){
        const navInfo = {jamId: jamId, section: section}
        localStorage.setItem('navInfo', navInfo);
    }

    static getNavInfo(navInfo){
        const savedNavInfo = localStorage.setItem('navInfo', navInfo);
        return savedNavInfo;
    }

};
