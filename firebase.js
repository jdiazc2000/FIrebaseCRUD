
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc , getDoc, updateDoc} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXWq4qccBNEAQXgNnlRWbhgfs3M0NvtWg",
    authDomain: "crudfirebase-f7e6e.firebaseapp.com",
    projectId: "crudfirebase-f7e6e",
    storageBucket: "crudfirebase-f7e6e.appspot.com",
    messagingSenderId: "927528803520",
    appId: "1:927528803520:web:5b6e9ba1752e7598d06125"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export const SaveProduct = (code,descrip,cant) => {
    addDoc(collection(db, 'products'), {code: code, descrip: descrip, cant: cant} )
}

export const getProducts = () => getDocs(collection(db,'products'))

export const onGetProducts = (callback) => onSnapshot(collection(db,'products'), callback)

export const DeleteProduct = id => deleteDoc(doc(db,'products', id))

export const GetProduct = id => getDoc(doc(db,'products',id))

export const UpdateProduct = (id,newFields) => updateDoc(doc(db,'products',id), newFields)