import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBMEUywx-joWTEmlCEDt5AIVM4Gcj_7HI",
  authDomain: "chat-app-76a84.firebaseapp.com",
  projectId: "chat-app-76a84",
  storageBucket: "chat-app-76a84.appspot.com",
  messagingSenderId: "1053211915693",
  appId: "1:1053211915693:web:4e217d8d5efbebd0459d24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password)=>{
 
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There i am using chat app",
            lastSeen:Date.now()
        })
        await setDoc(doc(db, "chats", user.uid),{
            chatsData:[]
        })
    }catch(error){
      console.error(error)
      toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email,password) =>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch (error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async() => {
    try{
        await signOut(auth)
    }catch(error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
    
}

export {signup,login,logout,auth,db}