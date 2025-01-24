import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';

async function importAPI(){
    for (let index = 2; index < 10; index++) {
        const url = `https://api.themoviedb.org/3/movie/${index}`;

    const data =  await importData(url);
    const batch = writeBatch(db);
    data.forEach((dado) => {
       const docRef = doc(collection(db, 'movies'));
       batch.set(docRef,dado);
    });

    await batch.commit();
    console.log('Dados da tabela Movies importados com sucesso!');
    console.log('Importação concluída.');
    }
};

async function importData(url) {
    const headers= {
        'Accept': 'application/json',
        'Client-ID': '10bf964a54143d1567cd1688d07e0d0f',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGJmOTY0YTU0MTQzZDE1NjdjZDE2ODhkMDdlMGQwZiIsIm5iZiI6MTczNzY3ODg4Ny45NzUwMDAxLCJzdWIiOiI2NzkyZTAyNzI1ZDI5ODBmYjAyMzgwODQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4mHJCOfGIK0NtdiEbAeq2z9CuLhtdWP7utnyXRX2KRE'
    };

    const response = await fetch(url, {
        method: 'GET',
        headers
    });

    const dados = await response.json();

    return dados;
};