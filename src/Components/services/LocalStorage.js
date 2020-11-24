
export default class LocalStorage {
    
    static saveNavInfo(jamId, section){
        const navInfo = {jamId: jamId, section: section}
        localStorage.setItem('navInfo', navInfo);
    }


};
