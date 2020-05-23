import MongoClient from 'mongodb';

export async function connect(){
    try {
        const client = await  MongoClient.connect('mongodb://localhost:27017',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = client.db('node-restapi'); //creo la bd si no existe si no la uso
        console.log('DB is connected');
        return db    
    } catch (error) {
        console.log(error);
    }
}
