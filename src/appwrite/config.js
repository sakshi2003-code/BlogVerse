// steps
// 1.import client etc from appwrite
// create  class service and object and export 
import conf from '../conf/conf.js';
import {Client ,Databases ,ID,Storage,Query}from "appwrite";
export class Service{
client =new Client();
databases;
bucket;
// ye variables define h but account tb hi banna chaiye jb constructor call hoga
constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
     .setProject(conf.appwriteProjectId);
     this.databases=new Databases(this.client);
     this.bucket=new Storage(this.client);
     
}    

async createPost({title,slug,content,featuredImage,status,userId}){
        try {

            // syntax for doucment id we used slug here
            // const result = await databases.createDocument(
            //     '<DATABASE_ID>', // databaseId
            //     '<COLLECTION_ID>', // collectionId
            //     '<DOCUMENT_ID>', // documentId
            //     {}, // data
            //     ["read("any")"] // permissions (optional)
            // );
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
            slug,{
                title,
                content,
                featuredImage,
                status,
                userId,

            }
        )
        } catch (error) {
            console.log("Appwrite service:: createPost  :: error",error);
        }
}

async updatePost(slug,{title,content,featuredImage,status}){
try {
    return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
            title,
            content,
            featuredImage,
            status,
        }
    )
    
} catch (error) {
    console.log("Appwrite service:: updatePost :: error",error);
}
}

async deletePost(slug){
    try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true;
        // for handled by frontend
        
    } catch (error) {
        console.log("Appwrite service:: deletePost :: error",error);
       return false;
    }
}


async getPost(slug){
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        
    } catch (error) {
        console.log("Appwrite service::getPost :: error",error);
    return false;
    }
}

// target wo values jo active hn  yha pe status key 
async getPosts(queries=[Query.equal("status","active")]){
    try {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId, 
            queries,
        )
    } catch (error) {
        console.log("Appwrite service::getPosts :: error",error);
     return false;
    }
}


// file upload service
async uploadFile(file){
    try {
        return await this.bucket.createFile(
         conf.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("Appwrite service::uploadFile :: error",error);
    return false;
    }





}


async delteFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
        return true;
    } catch (error) {
        console.log("Appwrite service::deleteFile :: error",error);
     return false;
    }
}

// ye koi promise return nhi krta isliye isme await ya async ni lgate

getFilePreview(fileId){
 return this.bucket.getFilePreview(
    conf.appwriteBucketId,
    fileId
 )
}


}
const service=new Service();
export default service;