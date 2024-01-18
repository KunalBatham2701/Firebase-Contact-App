import { deleteDoc, doc } from 'firebase/firestore'
import React, { Children } from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoMdTrash } from 'react-icons/io'
import { FaUserEdit } from "react-icons/fa";
import { db } from '../config/firebase'
import AddandUpdate from './AddandUpdate'
import useDisclose from '../hooks/useDisclose'
import { toast } from 'react-toastify'


const ContactCard = ({contact}) => {
    const{onClose,onOpen,isOpen}=useDisclose();
    const deleteContact=async(id)=>{
        try{
            await deleteDoc(doc(db,"contacts",id));
            toast.success("contact deleted succesfully");
        } catch(error){
            console.log(error);
        }
    }
  return (
    <>
    <div key={contact.id} className='bg-yellow p-2 flex rounded-lg justify-between items-center'>
          <div className='flex gap-2'>
          <div className='flex items-center'>
          <HiOutlineUserCircle className="text-orange text-4xl"/>
          </div>
            <div className=''>
              <h2 className='font-medium'>{contact.name}</h2>
              <p className='text-sm'>{contact.email}</p>
            </div>
            </div>
            <div className='flex text-3xl'>
              <FaUserEdit onClick={onOpen} className="cursor-pointer"/>
              <IoMdTrash onClick={()=>deleteContact(contact.id)} className='text-orange cursor-pointer'/>
            </div>
          </div>
          <AddandUpdate contact={contact} isOpen={isOpen} onClose={onClose} isUpdate/>
    </>
  )
}
export default ContactCard;
