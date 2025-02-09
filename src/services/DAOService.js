import { db } from './firebase'; // Importa a instância do Firestore configurada
import { collection, addDoc, updateDoc, deleteDoc, getDocs, getDoc, doc, query, where } from 'firebase/firestore'; // Importa funções do Firestore necessárias para CRUD e consultas

class DAOService {
    constructor(collectionPath) {
        // Verifica se o caminho da coleção foi fornecido, caso contrário lança um erro
        if (!collectionPath) {
            throw new Error('Collection path must be provided');
        }
        // Define a referência da coleção no Firestore com base no caminho fornecido
       // console.log('Instância do Firestore:', db); // Verifique a instância do Firestore
        this.collectionRef = collection(db, collectionPath); // Certifique-se de que db é a instância correta do Firestore
        //console.log('Referência da coleção:', this.collectionRef);
    }

    // Método assíncrono para inserir um novo documento na coleção
    async insert(object) {
        try {
            // Adiciona um novo documento à coleção
            const docRef = await addDoc(this.collectionRef, object);
            // Retorna o ID do documento adicionado
            return docRef.id;
        } catch (error) {
            console.error('Error adding document: ', error);
            throw new Error('Error adding document'); // Lança um erro em caso de falha
        }
    }

    // Método assíncrono para atualizar um documento existente na coleção
    async update(id, object) {
        try {
            // Obtém a referência do documento a ser atualizado usando o ID
            const docRef = doc(db, this.collectionRef.path, id);
            // Atualiza o documento com os novos dados
            await updateDoc(docRef, object);
        } catch (error) {
            console.error('Error updating document: ', error);
            throw new Error('Error updating document'); // Lança um erro em caso de falha
        }
    }

    // Método assíncrono para deletar um documento da coleção
    async delete(id) {
        try {
            // Obtém a referência do documento a ser deletado usando o ID
            const docRef = doc(db, this.collectionRef.path, id);
            // Deleta o documento
            await deleteDoc(docRef);
        } catch (error) {
            console.error('Error deleting document: ', error);
            throw new Error('Error deleting document'); // Lança um erro em caso de falha
        }
    }

    // Método assíncrono para obter todos os documentos da coleção
    async getAll() {
        try {
            // Obtém todos os documentos da coleção
            const docSnapshot = await getDocs(this.collectionRef);

            const documents = docSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                  id: doc.id,
                  title: data.original_title,   //filmes
                  name: data.original_name,  //séries
                  summary: data.overview,
                  coverUrl: data.poster_path,
                  vote: data.vote_average,
                  runtime: data.runtime,  //filmes
                  genres: data.genres,
                  datePublic: data.release_date,  //filme
                  dateExib: data.first_air_date,  //série
                  seasons: data.number_of_seasons  //série
                };
              });

            return documents; // Retorna o array de documentos
        } catch (error) {
            console.error('Error getting documents: ', error);
            throw new Error('Erro ao extrair documentos'); // Lança um erro em caso de falha
        }
    }

    // Método assíncrono para obter um documento específico da coleção
    async get(id) {
        try {
            // Obtém a referência do documento usando o ID
            const docRef = doc(db, this.collectionRef.path, id);
            // Obtém o snapshot do documento
            const docSnap = await getDoc(docRef);

            // Verifica se o documento existe
            if (docSnap.exists()) {
                const data = docSnap.data();
                return {
                    id: docSnap.id,
                    title: data.original_title,
                    name: data.original_name,
                    summary: data.overview,
                    coverUrl: data.poster_path,
                    vote: data.vote_average}
            } else {                                                                   
                throw new Error('No such document!'); // Lança um erro se o documento não existir
            }
        } catch (error) {
            console.error('Error getting document: ', error);
            throw new Error('Error getting document'); // Lança um erro em caso de falha
        }
    }

    // Método assíncrono para buscar documentos na coleção com base em uma propriedade e valor
    async search(property, value) {
        try {
            // Cria uma consulta para buscar documentos onde a propriedade é igual ao valor fornecido
            const q = query(this.collectionRef, where(property, '==', value));
            // Executa a consulta e obtém os documentos correspondentes
            const querySnapshot = await getDocs(q);
            const documents = [];

            // Itera sobre cada documento e adiciona ao array de documentos
            querySnapshot.forEach(doc => {
                documents.push({ id: doc.id, ...doc.data() });
            });

            return documents; // Retorna o array de documentos correspondentes
        } catch (error) {
            console.error('Error searching documents: ', error);
            throw new Error('Error searching documents'); // Lança um erro em caso de falha
        }
    }
}

export default DAOService; // Exporta a classe DAOService para uso em outras partes do aplicativo
