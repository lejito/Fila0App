function modificarPropiedades(objeto) {
    const resultado = {};
    for (const clave in objeto) {
        if (Object.hasOwnProperty.call(objeto, clave)) {
            let nuevaClave = clave.replace(/_./g, (match) => match.charAt(1).toUpperCase());
            resultado[nuevaClave] = objeto[clave];
        }
    }
    return resultado;
}

module.exports = function notacionObjeto(objeto) {
    if (Array.isArray(objeto)) {
        return objeto.map(modificarPropiedades);
    }
    else {
        return modificarPropiedades(objeto)
    }
}

