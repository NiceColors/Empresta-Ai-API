export const checkDate = (field : any) : boolean => {
    if ( field instanceof Date ){
        const year = field.getFullYear().toString();
        const dateregex = new RegExp('^\d\d\d\d');
        if(dateregex.test(year)){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

