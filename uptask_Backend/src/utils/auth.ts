import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(15) //Mientras mas grande el numero de () mas aleatorio el hash
    //genera una cadena aleatoria única, que se añade a la contraseña antes de aplicar el algoritmo de encriptado
    return await bcrypt.hash(password, salt)
    //Esa línea de código toma la contraseña en texto plano que envió el usuario y la convierte en un hash encriptado e irreversible, reemplazando el valor original antes de guardar el registro en la base de datos.

}

export const checkPassword = async (enteredPassword: string, storedHash: string) => {

    return await bcrypt.compare(enteredPassword, storedHash)//compara los datos ingresados en un formulario plano contra una cadena hasheada 
}