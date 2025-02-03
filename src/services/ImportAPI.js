import { collection, doc, writeBatch } from 'firebase/firestore';
import { db } from './firebase.js';

async function importAPI() {
  try {
    for (let index = 10; index < 1000; index++) {
      //const url = `https://api.themoviedb.org/3/tv/${index}`;
      const url = `https://api.themoviedb.org/3/movie/${index}`;

      // Tenta buscar os dados da API
      const data = await importData(url);

      // Verifica se os dados foram retornados corretamente
      if (data) {
        const batch = writeBatch(db);
        //const docRef = doc(collection(db, 'series'));
        const docRef = doc(collection(db, 'movies'));
        batch.set(docRef, data);

        // Tenta confirmar a operação em lote
        await batch.commit();
        console.log(`Dados do item ${index} importados com sucesso!`);
      } else {
        console.warn(`Nenhum dado encontrado para o item ${index}.`);
      }
    }
    console.log('Importação concluída.');
  } catch (error) {
    console.error('Erro durante a importação:', error);
  }
};

async function importData(url) {
  try {
    const headers = {
      'Accept': 'application/json',
      'Client-ID': '10bf964a54143d1567cd1688d07e0d0f',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGJmOTY0YTU0MTQzZDE1NjdjZDE2ODhkMDdlMGQwZiIsIm5iZiI6MTczNzY3ODg4Ny45NzUwMDAxLCJzdWIiOiI2NzkyZTAyNzI1ZDI5ODBmYjAyMzgwODQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4mHJCOfGIK0NtdiEbAeq2z9CuLhtdWP7utnyXRX2KRE'
    };

    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }

    const dados = await response.json();
    return dados;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    return null; // Retorna null em caso de erro para ser tratado na função chamadora
  }
};

importAPI();