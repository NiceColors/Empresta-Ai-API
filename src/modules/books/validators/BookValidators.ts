export const validisbn = (isbn: any) : boolean => {
    const isbnregexp = new RegExp('^(?:ISBN(?:-10)?:?)?(?=[-0-9X]{13}$|[0-9X]{10}$)[0-9]{1,5}[-]?(?:[0-9]+[-]?){2}[0-9X]$')
    if(isbnregexp.test(isbn)){
        return true
    }
    return false
}

export const bookreleaseYear = (field : any) : boolean => {
    if(strCheck(field)){
        const year = new RegExp('^\d\d\d\d')
        if(year.test(field.getFullYear())){return true;}
        else {return false}
    }
}

export const strCheck = (field : unknown) : boolean => {
    if (typeof field === 'string'){
        return true;
    }
    else{
        return false;
    }
}

export const boolCheck = (field : unknown) : boolean => {
    if (typeof field === "string"){
        return true;
    }
    else{
        return false;
    }
}

export const objCheck = (field : unknown) : boolean => {
    if (typeof field === "object"){
        return true;
    }
    else{
        return false;
    }
}