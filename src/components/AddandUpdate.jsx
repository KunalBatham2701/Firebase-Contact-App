import React from 'react'
import Modal from './Modal'
import {ErrorMessage, Field, Form, Formik} from "formik";
import { addDoc,collection, doc, updateDoc } from 'firebase/firestore';
import {db} from  "../config/firebase";
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const contactSchemaValidation=Yup.object().shape({
    name:Yup.string().required("Name is Required"),
    email:Yup.string().email("Invalid Email").required("Email is Required")
})

const AddandUpdate = ({isOpen,onClose,isUpdate,contact}) => {
    const addcontact=async(contact)=>{
        try{
            const contactRef=collection(db,"contacts");
            await addDoc(contactRef,contact);
            onClose();
            toast.success("contact Added succesfully");
        } catch(error){
            console.log(error);
        }
    }
    const updatecontact=async(contact,id)=>{
        try{
            const contactRef=doc(db,"contacts",id);
            await updateDoc(contactRef,contact);
            onClose();
            toast.success("contact Updated succesfully");
        } catch(error){
            console.log(error);
        }
    }
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
            validationSchema={contactSchemaValidation}
            initialValues={
                isUpdate?{
                name:contact.name,
                email:contact.email,
            }:
            {
                name:"",
                email:"",
            }}
            onSubmit={(values)=>{
                isUpdate? updatecontact(values,contact.id):
                addcontact(values);
            }}
        >
            <Form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='name'>Name</label>
                    <Field name="name" size="34" className=" pl-1 h-10 border rounded-xl" />
                    <div className="text-rose-500 text-xs">
                        <ErrorMessage name="name"/>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='email'>Email</label>
                    <Field name="email" size="34" className=" pl-1 h-10 border rounded-xl" />
                    <div className="text-rose-500 text-xs">
                        <ErrorMessage name="email"/>
                    </div>
                </div>
                <button className='bg-orange px-3 py-1.5 self-end rounded-full'>{isUpdate?"Update":"Add"} Contact</button>
            </Form>
        </Formik>
    </Modal>
    </div>
  )
}

export default AddandUpdate
