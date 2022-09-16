export const validisbn = (isbn: unknown) : boolean => {
if(!strCheck(isbn)){
    return false;
}
const isbnnumbers = isbnNumbers(isbn);

const regex = new RegExp('^(?:ISBN(?:-10)?:?\)?(?=[0-9X]{10}$|(?=(?:[0-9]+[-\]){3})[-\0-9X]{13}$)[0-9]{1,5}[-\]?[0-9]+[-\]?[0-9]+[-\]?[0-9X]$');

if(regex.test(isbnnumbers)){
    var isbn_len = isbnnumbers.length;
    if (isbn_len != 10){ console.log('inválido'); return false;}

    let sum = 0;
    
    for (let i = 0; i < 9; i++)
    {
        let digit = parseInt(isbnnumbers[i]);
           
        if (0 > digit || 9 < digit)
        { console.log('inválido'); return false;}
               
        sum += (digit * (10 - i));
    }

    let last = isbnnumbers[9];
    if (last != 'X' && (parseInt(last) < 0 || parseInt(last) > 9))
    { console.log('inválido'); return false;}

    sum += ((last == 'X') ? 10 : (parseInt(last) - 0));

    {console.log('válido'); return (sum % 11 == 0);}
    }
}

export const bookreleaseYear = (field : any) : boolean => {
    if(objCheck(field)){
        const year = new RegExp('^\d\d\d\d')
        if(year.test(field.getFullYear)){return true;}
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

const isbnNumbers = (isbn: unknown) => {
    if (typeof (isbn) === 'string' || typeof (isbn) === 'number') return isbn.toString().replace(/[^0-9]/g, '');
    return '';
};