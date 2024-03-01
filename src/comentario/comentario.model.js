import { Schema, model } from 'mongoose';

const ComentarioSchema = Schema({
    comentario: {
        type: String,
        required: true
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    publicacion: {
        type: Schema.Types.ObjectId,
        ref: 'Publicacion'
    }
});

export default model('Comentario', ComentarioSchema);


