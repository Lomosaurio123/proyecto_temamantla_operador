function validarFormatoClave( clave ) {

    let clave_verify = false;

    const pattern = /^[A-Z]{6}\d{8}[A-Z]\d{3}$/

    clave_verify = pattern.test( clave );

    return clave_verify;


}

function validarInfoClave( clave_elector, nombre, apellido_paterno, apellido_materno ) {

    let match = false;

    const upperApPa = apellido_paterno.toUpperCase();

    const upperApMa = apellido_materno.toUpperCase();

    const upperNom = nombre.toUpperCase();

    if( clave_elector[0] === upperApPa[0] && clave_elector[1] === upperApPa[2] && clave_elector[2] === upperApMa[0] && clave_elector[3] === upperApMa[2] && clave_elector[4] === upperNom[0] ) match = true;

    return match;

}

function validarEdadClave( clave_elector, edad ) {

    let ageValidation = false;

    const currentYear = new Date().getFullYear(); //Función que obtiene el año actual

    const year = clave_elector[6] + clave_elector[7];
    
    let birthdayString = '';
    
    if( year > 30 ) birthdayString = 19 + year;
    else birthdayString = 20 + year;

    const birthday = parseInt( birthdayString );

    const possibleAge = currentYear - birthday;

    const age = parseInt( edad );

    if( possibleAge === age || possibleAge - 1 === age ) ageValidation = true;

    return ageValidation;

}

module.exports = { validarFormatoClave, validarInfoClave, validarEdadClave };