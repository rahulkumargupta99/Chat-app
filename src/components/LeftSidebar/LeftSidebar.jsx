import React, { useContext, useState } from "react";
import "./LeftSidebar.css";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
const LeftSidebar = () => {
  const navigate = useNavigate();
  const { useData, chatData } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", input.toLowerCase()));
        const querySnap = await getDocs(q);
        if (!querySnap.empty && querySnap.docs[0].data().id !== useData.id) {
          let userExist =false
          chatData.map((user)=>{
            if(user.rId === querySnap.docs[0].data().Id){
              userExist =true;
            }
          })
          if(!userExist){
            setUser(querySnap.docs[0].data());

          }
        }
        else{
            setUser(null);
        }
      }
      else{
        setShowSearch(false)
      }
    } catch (error) {}
  };

  const addChat = async ()=>{
      const massagesRef = collection(db, "massages");
      const chatRef = collection (db, "chats");

      try {
        const newMassageRef = doc(massagesRef);
        await setDoc(newMassageRef,{
          createAt:serverTimestamp(),
          massages:[]
        })

        await updateDoc(doc(chatsRef, user.id),{
          chatsData:arrayUnion({
            massageId:newMassageRef.id,
            lastMassage:"",
            rId:userData.id,
            updatedAt:Date.now(),
            massageSeen:true
          })
        })

        await updateDoc(doc(chatsRef, userData.id),{
          chatsData:arrayUnion({
            massageId:newMassageRef.id,
            lastMassage:"",
            rId:user.id,
            updatedAt:Date.now(),
            massageSeen:true
          })
        })
      } catch (error) {
        toast.error(error.massage);
        console.error(error)
      }
  }

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} className="logo" alt="" />
          <div className="menu">
            <img src={assets.menu_icon} className="menu" alt="" />
            <div className="sub-menu">
              <p onClick={() => navigate("/profile")}>Edit Profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input
            onChange={inputHandler}
            type="text"
            placeholder="Search here.."
          />
        </div>
      </div>
      <div className="ls-list">
        {showSearch && user
        ? <div onClick={addChat} className='friends add-user'>
          <img src={user.avatar} alt="" />
          <p>{user.name}</p>
        </div>
        :Array(12)
        .fill("")
        .map((item, index) => (
          <div key={index} className="friends">
            <img src={assets.profile_img} alt="" />
            <div>
              <p>Richard Sanford</p>
              <span>Hello, How are you</span>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default LeftSidebar;
