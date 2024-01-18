import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar1';
import {FiSearch} from "react-icons/fi";
import {AiFillPlusCircle} from "react-icons/ai";
import {collection,getDocs, onSnapshot} from 'firebase/firestore';
import {db} from "./config/firebase"
import ContactCard from "./components/ContactCard";
import AddandUpdate from './components/AddandUpdate';
import useDisclose from './hooks/useDisclose';
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from './components/NotFoundContact';

const App = () => {
  const[contacts,setcontacts]=useState([]);
  const{onClose,onOpen,isOpen}=useDisclose();
  useEffect(()=>{
    
    const getcontacts=async()=>{
      try{
          const contactsRef=collection(db,"contacts");
          
          onSnapshot(contactsRef,(snapshot)=>{
            const contactLists=snapshot.docs.map((doc)=>{
              return{
                id:doc.id,
                ...doc.data()
            };
        });
        setcontacts(contactLists);
        return contactLists;
          })
          
      
    }catch(error){
        console.log(error);
      }
    }
    getcontacts();
  },[]);

  const filterContacts=(e)=>{
    const value = e.target.value;
    const contactsRef=collection(db,"contacts");
          
          onSnapshot(contactsRef,(snapshot)=>{
            const contactLists=snapshot.docs.map((doc)=>{
              return{
                id:doc.id,
                ...doc.data()
            };
        });
        const filteredContacts=contactLists.filter((contact)=> contact.name.toLowerCase().includes(value.toLowerCase()))
        setcontacts(filteredContacts);
        return filteredContacts;
          })
  }

  return (
    <>
    <div className='max-w-[370px] mx-auto px-4'>
      <Navbar/>
      <div className='flex gap-2'>
      <div className='flex relative items-center flex-grow'>
      <FiSearch className='text-white text-3xl ml-1 absolute'></FiSearch>
        <input onChange={filterContacts} type="text" 
          className='h-10 rounded-md border pl-9 flex-grow text-white border-white bg-transparent'
        />
      </div>
        <AiFillPlusCircle onClick={onOpen} className='text-5xl cursor-pointer text-white'/>
      
      </div>
      <div className='mt-4 flex flex-col gap-3'>
        {contacts.length<=0?(<NotFoundContact/>):(contacts.map((contact)=>(
          <ContactCard key={contact.id} contact={contact}/>
        )))}
      </div>
    </div>
    <AddandUpdate isOpen={isOpen} onClose={onClose}/>
    <ToastContainer position='bottom-center'/>
    </>
  )
}

export default App;
