function emailVal(email: unknown){
    if (typeof email != "string") {
        return false;
    }
    else {
        const emailRegExp = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
        if (emailRegExp.test(email)) {
            return true;
        }
        else {
            return false;
        }
    }
}

function passwdVal(passwd: unknown){
    if (typeof passwd != "string"){
        return false;
    }
    else{
        const passwdRegExp = new RegExp("^[a-zA-Z0-9]{8,}$");
        if(passwdRegExp.test(passwd)){
            return true;
        }
        else{
            return false;
        }
    }
}

function nameVal(name: unknown){
    if (typeof name != "string"){
        return false;
    }else{
        const nameRegExp = new RegExp("[a-zA-Z]{3,}");
        if(nameRegExp.test(name)){
            return true;
        }
        else{
            return false;
        }
    }
}

function birthVal(birthdate: unknown){
    if(typeof birthdate === "string"){
            const year = new RegExp(".*");
            if(year.test(birthdate)){
                return true;
            }
            else{
                return false;
            }
        }
}

function formatCPF(data: unknown){
    if (typeof (data) === 'string' || typeof (data) === 'number') return data.toString().replace(/[^0-9]/g, '');
    return '';
};

export const isValid = (cpf: string): boolean => {
    let isValid = true;
    const numbersInCpf = formatCPF(cpf);

    const numbers = [
        ...new Array(9)
            .fill(1)
            .map((_, index) => (index + 1).toString().repeat(11)),
    ];

    if (numbersInCpf.length !== 11 || numbers.includes(numbersInCpf))
        isValid = false;
    else {
        const numberArray = Array.from(numbersInCpf).map(item => parseInt(item));
        let sum = 0;

        numberArray.forEach((item, index) =>
            index != 9 ? (sum += item * (10 - index)) : false
        );

        let mod = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (mod !== +numberArray[9]) isValid = false;

        else {
            sum = 0;
            numberArray.forEach((item, index) =>
                index != 10 ? (sum += item * (11 - index)) : false
            );

            mod = sum % 11 < 2 ? 0 : 11 - (sum % 11);
            if ((sum * 10) % 11 !== +numberArray[10]) isValid = false;
        }
    }

    return isValid;
};


export { emailVal, passwdVal, nameVal, birthVal, formatCPF };