import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

class LoginService{
    constructor(){
        this.auth = getAuth();
    };

    async login(email, password){
        try{
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            return userCredential.user;
        }catch{
            console.log('Erro ao realizar login: ', error.message);
            throw error;
        };
    };
};

export default LoginService;