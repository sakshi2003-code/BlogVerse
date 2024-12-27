// steps import conf 
import conf from '../conf/conf.js';
// import client etc from app write
import {Client ,Account ,ID}from "appwrite";


// export class authSerive and object
export class AuthService{
    client =new Client();
    account;
    // make constructor

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }

    // create account 
    async createAccount({email,password,name}){
       try {
        // first field m user id dena compulsory h secone email and third password
       const userAccount= await this.account.create(ID.unique(),email,password,name);
       if (userAccount) {
        // call another method
        return this.login({email,password});
        
       } else {
        return userAccount;
       }
       } catch (error) {
        throw error;
       }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

   async logout(){
    try {
         await this.account.deleteSessions();
    } catch (error) {
        console.log("Appwrite serive :: logout :: error", error);
    }
   }


}
const authService=new AuthService();
export default authService;
// export object  so we  can direct access  method 

