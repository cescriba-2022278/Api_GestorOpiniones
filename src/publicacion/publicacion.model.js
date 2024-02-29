import { Schema, model } from 'mongoose';

const PublicacionSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'titulo obligatorio']
    },
    categoria: {
        type: String,
        required: [true, 'categoria es requerida'],
        enum: ['Tecnologia', 'Deportes', 'Cultura'],
    },
    texto: {
        type: String,
        required: [true, 'texto obligatorio']
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});


export default model('Publicacion', PublicacionSchema);