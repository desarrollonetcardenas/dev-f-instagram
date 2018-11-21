const { Map } = require('immutable');
const Movies = require('../schemas/movies');

const createToken = require('../utils/createToken');
const Users = require('../schemas/users');

function prueba( _, args, context, info ) {
    console.log('Name: ', args.name);

    return `Hola ${ args.name }`;
}

function imprimir(_, args, context, info) {
    console.log('Imprimiendo mensaje: ', args.saludo);
    return 'Mensaje impreso';
}

function login( _, args, context, info ) {

    const request = Map( args );
    const login = request.set('user', 'modificado');

    console.log(request, login);

    return { value: "This is my token" };
}

function singup(_, args, context, info) {

    return Users.create( args.data ).then(
        (user) => {
            const token = createToken( user );

            return { token, id: args._id };
        },
        (err) => {
            throw new Error( err.message );
        }
    )
    .catch(
        (err) => {
            throw new Error( err );
        }
    );
}


function createMovie(_, args, context, info) {

    return Movies.create( args.data ).then(
        (movie) => {
            console.log('Movie created with id: ', movie._id);
            return movie;
        },
        (err) => {
            throw new Error( err );
        }
    );
}

function updateMovie(_, args, context, info) {
    return Movies.findByIdAndUpdate(args.id, { $set: args.data }, { new: true } ).then(
        (movie) => {
            return movie;
        }
    )
    .catch(
        (error) => {
            throw new Error( error );
        }
    );
}


function deleteMovie(_, args, context, info) {
    return Movies.findOneAndUpdate({ _id: args.id }, { $set: {is_active: false} }).then(
        (movie) => {
            return "Movies deleted";
        }
    )
    .catch((error) => {
        throw new Error( error );
    });
}

module.exports = {
    prueba,
    imprimir,
    login,
    singup,
    createMovie,
    updateMovie,
    deleteMovie
}

