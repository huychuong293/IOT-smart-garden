import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import {
    getDatabase, onValue, ref,get,
    set, child
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import {
    getFirestore,addDoc, collection,getDoc, getDocs ,onSnapshot ,doc,setDoc ,arrayUnion,arrayRemove,updateDoc, query,orderBy, startAt,where
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import {
    getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword,signOut
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import CONSTANTS from "./constants.js";
import firebaseConfig from "./firebase.config.js";
import Common from "./common.js";

export default class FirebaseSerive {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(this.app);
    database = getDatabase(this.app);
    fireStore = getFirestore(this.app);
    auth = getAuth(this.app);
    dbRef = ref(getDatabase());
    constructor(){
    }

    async setValue(path, data) {
        return new Promise((resolve, reject) => {
            set(ref(this.database, path), data)
                .then(_ => resolve(CONSTANTS.STATUS_REQUEST.OK))
                .catch(err => reject(err));
        })
    }

    async getValue(path) {
        return await get(ref(this.database, path));
    }

    async observableValueChange$(path, callback) {
        return await onValue(ref(this.database, path),
            (response) => {
                callback(response)
            },
            (err) => {
                console.log(err)
            }
            ,
            {
                onlyOnce: false
            });
    }
    async getChilren(path){
        return await get(child(this.dbRef,path));
    }

    async onRegisterUser(email, password){
        await createUserWithEmailAndPassword(this.auth, email, password);
    }

    async onLoginUser(email, password){
        return await signInWithEmailAndPassword(this.auth, email, password)
    }

    async signOut(){
        return await signOut(this.auth);
    }

    // FireStore
    async saveToFireStore(path,data, isMerge = true){
        const docRef = doc(this.fireStore, path, Common.convertToDate(new Date()));
        const docResult = await getDoc(docRef);
        
        if(docResult.exists()){
            return await updateDoc(docRef,{
                value: arrayUnion(data),
                time: new Date()
            });
        }
        return await setDoc(docRef,{
            value: data,
            time: new Date()
        },{
            merge: isMerge
        });
    }

    async getDataFireStore(collect, document){
        return await  getDocs(collection(this.fireStore, collect),document);
    }

    async getFireStoreFromCollection(collect, callback){
        await onSnapshot( collection(this.fireStore,collect), snapshot =>{
            callback(snapshot);
        });
    }

    async observableFireStoreChange$(collect, document,callback){
        return onSnapshot(doc(this.fireStore,collect,document),doc =>{
            callback(doc);
        });
    }

    async updateArrayFireStore(collect, document,data){
        const docRef = doc(this.fireStore, collect, Common.convertToDate(new Date()) );
        await updateDoc(docRef,{
            value: arrayUnion(data)
        });
    }

    async getDataWithCondition(collect, document,data){
        // const docRef = doc(this.fireStore, collect, document);
        const ref = collection(this.fireStore, CONSTANTS.HISTORY);
        const result =  query(ref,where('value', '==', true));
        console.log(result,query)
        // const querySnapshot = await get
    }

    async removeDataArrayFireStore(collect, document, data){
        const docRef = doc(this.fireStore, collect, document);
        await updateDoc(docRef,{
            value: arrayRemove(data),
            time: new Date()
        });
    }

    async observableAuthChanged(){
        return await onAuthStateChanged(this.auth,(user) =>{
            if(user){
                // console.log(user.uid)
            }
            else{
                alert('Vui lòng đăng nhập lại')
                window.location.pathname = 'index.html';
            }
        })
    }
}