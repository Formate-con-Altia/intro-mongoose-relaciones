// Frutas. Fruteria etc.

// Definir el esquema de un fruta
//
/**
 * nombre: String
 * color: String (habitual)
 * vitaminas: Mixed (Array de Strings)
 * origen: String (país)
 */

/**
 * Iteración 2: Para cada fruta queremos definir un poco su composición alimenticia. vitaminas, cantidad de calcio, aportación calórica
 * Esta característica es propia de cada fruta (incluso del mismo tipo de fruta!). Nos gusaría tener una estrucutra para definir esta composición alimentícia
 * 
 * Vamos a hacer que cada fruta contenga una composición como subdocumento
 */

/**
 * Iteración 3: Queremos que las frutas esten disponibles en nuestras diferentes tiendas. Una fruta solo puede estar disponible en una tienda a la vez. Vamos a crear una colección 'tiendas'. Las  tiendas tienen un ID (mongodb) y una ciudad.
 */


/**
 * Iteración 4: Una fruteria trabaja con diversos proveedores. Un proveedor tiene un nombre de empresa, numeros de camiones de transporte, NIF
 */

const mongoose = require('mongoose');

const uri = "mongodb+srv://root:root@cluster0.uxg9l.mongodb.net/fruteria";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error);
});
db.once('open', main);

/**
 * nombre: String
 * color: String (habitual)
 * vitaminas: Mixed (Array de Strings)
 * origen: String (país)
 */

const proveedorSchema = new mongoose.Schema({
    nombre: String,
    camiones: Number,
    NIF: String
})

const tiendaSchema = new mongoose.Schema({
    ciudad: String,
    empleados: Number
});

const composicionSchema = new mongoose.Schema({
    vitaminas: [],
    kcal: mongoose.Schema.Types.Decimal128,
    calcio: mongoose.Schema.Types.Decimal128
});

const frutaSchema = new mongoose.Schema({
    nombre: String,
    color: String,
    origen: String,
    precio: mongoose.Schema.Types.Decimal128,
    composicion: composicionSchema,
    tienda: { type: mongoose.Schema.Types.ObjectId, ref: 'tiendas' },
    proveedor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'proveedores' }]
});

const Fruta = mongoose.model('frutas', frutaSchema);

const Tienda = mongoose.model('tiendas', tiendaSchema);

const Proveedor = mongoose.model('proveedores', proveedorSchema);

async function main() {
    console.log("Conectados a la base de datos.");

    // await new Fruta({
    //     nombre: "Pera",
    //     color: "Verde",
    //     origin: "Portugal",
    //     precio: 0.67,
    //     composicion: {
    //         vitaminas: ['E', 'C'],
    //         kcal: 17,
    //         calcio: 14
    //     },
    //     tienda: "61f3a85a587153821ae56f35"
    // }).save();

    // Quiero recuperar la fruta identificada por 61f3a9de86f509678550260f

    let fruta = await Fruta.findById("61f3a9de86f509678550260f").populate("tienda");

    console.log(fruta);

    await mongoose.disconnect();
}







