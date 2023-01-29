import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { TiUserAdd } from 'react-icons/ti';
import { MdContacts } from 'react-icons/md';
import { FcViewDetails } from 'react-icons/fc';

import Modal from '../Modal/Modal';
import InputField from '../InputField/InputField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Table = () => {
    const [isOpen, setIsopen] = useState(false);
    const [confirmDlt, setConfirmDlt] = useState(false);
    const [detail, setDetail] = useState([]);
    console.log(detail, "detail");
    console.log(detail, "detail")
    const [editindex, setEditindex] = useState(null);
    const [toedit, setToedit] = useState([]);
    console.log(toedit, 1111111111);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setsSearchQuery] = useState(false);
    const [currentContact, setCurrentContact] = useState({
        name: '',
        phone: '',
        company: '',
        address: '',
        updatedon: '',
    });

    const [contacts, setContacts] = useState(
        JSON.parse(localStorage.getItem('contacts')) || []
    );
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        let uniqueid = Date.now() + Math.floor(Math.random() * 1000000)
        console.log(uniqueid, "uniqueid");
        const newContacts = {
            id: uniqueid,
            name: formData.get('name'),
            phone: formData.get('phone'),
            company: formData.get('company'),
            address: formData.get('address'),
            createdon: formData.get('createdon'),
            updatedon: formData.get('updatedon'),
        };
        console.log(newContacts, "newContacts");
        setContacts([...contacts, newContacts])
        localStorage.setItem('contacts', JSON.stringify([...contacts, newContacts]));
        setIsopen(false)
        toast("Contact Added")


    };

    const showDetails = (setIsopen, contacts, id) => {

        const contactID = id
        setIsopen(true)
        console.log(contacts, "index details");
        console.log(contactID, "id");
        const selectedContact = contacts.filter((contact) => contact?.id == contactID)
        console.log(selectedContact);
        setDetail(selectedContact)


    }

    const confirmDelete = (setIsopen, id) => {
        const contactID = id
        console.log(contactID, "contactID dlt");
        console.log(contacts, "contacts dlt");
        const newContacts = [...contacts];
        let filteredContact = newContacts.filter((contact) => contact?.id !== contactID)
        console.log(filteredContact, "filteredContact");
        setContacts(filteredContact);
        setSearchResults(filteredContact)
        localStorage.setItem('contacts', JSON.stringify(newContacts))
        toast("Contact Deleted")


    }

    useEffect(() => {
        if (editindex) {
            const selectedContact = contacts.filter((contact) => contact?.id == editindex)
            setToedit(selectedContact)

        }
    }, [editindex]);





    const handleEdit = (event) => {
        event.preventDefault();
        console.log(contacts);
        console.log(editindex,);
        const selectedContact = contacts.filter((contact) => contact?.id == editindex)

        console.log(selectedContact);
        let date = new Date()
        const selectedContactIndex = contacts.findIndex(c => c.id === editindex);

        const newContacts = [...contacts];
        console.log(newContacts, newContacts, newContacts);
        newContacts[selectedContactIndex] = { ...currentContact, updatedon: date.toString(), createdon: selectedContact?.id?.createdon };
        //selectedContact[0] = { ...currentContact, updatedon: date.toString(), createdon: toedit[0]?.createdon };

        console.log(selectedContact);
        setContacts(newContacts);
        setSearchResults(newContacts)
        localStorage.setItem('contacts', JSON.stringify(newContacts));
        toast("Contact Updated")

    }


    function searchNow(event) {
        const src = event.target.value
        const search = contacts.filter(contact =>
            contact?.name?.toLowerCase().includes(src.toLowerCase()) ||
            contact?.phone?.includes(src)
        );
        setSearchResults(search)
        setsSearchQuery(true)
        console.log(typeof (src));
    }



    return (
        <div className='w-[90%] mx-auto '>
            <div className=' flex flex-col md:flex-row justify-evenly items-center p-5  '>

                <div className='flex flex-col justify-center my-2 p-5 '>

                    <input onChange={searchNow} type="text" placeholder="Search by Name, Number" className="input input-bordered input-accent w-full max-w-xs " />
                </div>

                <div className="stats shadow lg:m-2 lg:py-4 flex justify-center items-center bg-yellow-200">
                    <MdContacts size={50} className="text-white m-5" />
                    <div className="stat">
                        <div className="stat-title">Total Contacts</div>
                        <div className="stat-value">{contacts?.length}</div>
                    </div>

                </div>
                {
                    searchQuery && <div className="stats shadow lg:m-2 lg:py-4 my-5 flex justify-center items-center bg-yellow-400">
                        <MdContacts size={50} className="text-white m-5" />
                        <div className="stat">
                            <div className="stat-title"> {contacts?.length == searchResults?.length ? <span>All Entries</span> : <span>Matched Results</span>}  </div>
                            <div className="stat-value">{searchResults?.length}</div>
                        </div>

                    </div>
                }


                <label onClick={() => setIsopen(true)} htmlFor="modalAdd" className="btn  btn-success px-2 m-2"><TiUserAdd /> <span className='px-2'>Add Contact</span></label>
                <button className=""> </button>

            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <ToastContainer />
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Company</th>
                            <th>Address</th>
                            <th>Created On</th>
                            <th>Updated On</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>


                        {(searchQuery ? searchResults : contacts).map((item, index) => (

                            <tr key={index} >

                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">

                                        <div>
                                            <div className="font-bold">{item?.name}</div>
                                            <div className="text-sm opacity-50">{item?.address}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item?.phone}</td>
                                <td>
                                    {item?.company}
                                </td>
                                <td>{item?.address}</td>
                                <td>{item?.createdon?.slice(0, 15)}</td>
                                <td>{item?.updatedon?.slice(0, 15)}</td>
                                <td>
                                    <label onClick={() => showDetails(setIsopen, contacts, item?.id)} htmlFor="modalDetails" className="btn btn-success btn-xs">Details</label>
                                    <label onClick={() => confirmDelete(setIsopen, item?.id)} htmlFor="modalDelete" className="btn btn-error btn-xs mx-2">Delete</label>
                                    <label onClick={() => handleEdit(setEditindex(item?.id), setIsopen(true))} htmlFor="modalEdit" className="btn btn-outline btn-primary btn-xs "><AiOutlineEdit /></label>
                                </td>
                            </tr>


                        ))}


                    </tbody>
                </table>
            </div>



            {isOpen &&

                <Modal modalAdd="modalAdd" >

                    <h3 className="font-bold text-lg">Add New Contact</h3>
                    <form onSubmit={handleSubmit}>
                        <InputField
                            label="Name:"
                            name="name"
                            type="text"
                            placeholder="Type your name" />
                        <InputField
                            label="Phone:"
                            name="phone"
                            type="number"
                            placeholder="Phone Number" />
                        <InputField
                            label="Company:"
                            name="company"
                            type="text"
                            placeholder="Company Name" />
                        <InputField
                            label="Address:"
                            name="address"
                            type="text"
                            placeholder="Address" />
                        <InputField
                            label="Created on:"
                            name="createdon"
                            type="text"
                            disabled
                            date={new Date}
                        />
                        <InputField
                            label="Updated on:"
                            name="updatedon"
                            type="text"
                            disabled
                            date={new Date}
                        />
                        <button className='btn btn-sm mt-5 ' type="submit">Submit</button>
                    </form>

                    <div className="modal-action">
                        <label htmlFor="modalAdd" className="btn">Close</label>
                    </div>
                </Modal>

            }

            {isOpen &&

                <Modal modalDetails="modalDetails" >
                    <h3 className="font-bold text-lg">Details</h3>
                    <div className="card card-side bg-base-100 ">
                        <figure><FcViewDetails size={100} /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-sm text-blue-800">Name: <span className='text-black text-xs'> {detail[0]?.name}</span> </h2>
                            <h2 className="card-title text-sm text-blue-800">Phone: <span className='text-black text-xs'>{detail[0]?.phone} </span></h2>
                            <h2 className="card-title text-sm text-blue-800">Company: <span className='text-black text-xs'>{detail[0]?.company}</span> </h2>
                            <h2 className="card-title text-sm text-blue-800">Address:<span className='text-black text-xs'>{detail[0]?.address}</span>  </h2>
                            <h2 className="card-title text-sm text-blue-800">Created on:<span className='text-black text-xs'>{detail[0]?.createdon?.slice(0, 15)}</span>  </h2>
                            <h2 className="card-title text-sm text-blue-800">Updated On: <span className='text-black text-xs'>{detail[0]?.updatedon?.slice(0, 15)} </span></h2>
                        </div>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="modalDetails" className="btn">Close</label>
                    </div>

                </Modal>
            }

            {/* {isOpen &&

                <Modal modalDelete="modalDelete" >

                    <div className="alert ">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>Are you sure? </span>
                        </div>
                        <div className="flex-none">
                            <label htmlFor="modalDelete" className="btn btn-sm btn-ghost">Deny</label>

                            <button onClick={() => confirmDelete(setConfirmDlt(true))} className="btn btn-sm btn-primary">Accept</button>
                        </div>
                    </div>


                </Modal>
            } */}

            {
                isOpen &&

                <Modal modalEdit="modalEdit" >

                    <h1>Editing Contact Of <span className='text-blue-800'>{toedit[0]?.name}</span> </h1>
                    <form onSubmit={(event) => handleEdit(event)}>

                        <input
                            className="border rounded p-1 mb-2"
                            type="text"
                            placeholder="Name"
                            value={currentContact?.name}
                            onChange={event =>
                                setCurrentContact({ ...currentContact, name: event.target.value })
                            }
                        />
                        <input
                            className="border rounded p-1 mb-2"
                            type="text"
                            placeholder="phone"
                            value={currentContact?.phone}
                            onChange={event =>
                                setCurrentContact({ ...currentContact, phone: event.target.value })
                            }
                        />
                        <input
                            className="border rounded p-1 mb-2"
                            type="text"
                            placeholder="company"
                            value={currentContact?.company}
                            onChange={event =>
                                setCurrentContact({ ...currentContact, company: event.target.value })
                            }
                        />
                        <input
                            className="border rounded p-1 mb-2"
                            type="text"
                            placeholder="address"
                            value={currentContact?.address}
                            onChange={event =>
                                setCurrentContact({ ...currentContact, address: event.target.value })
                            }
                        />
                        <input
                            className="border rounded p-1 mb-2"
                            type="text"
                            placeholder="createdon"
                            name='createdon'
                            value={toedit[0]?.createdon}
                            disabled
                            onChange={event =>
                                setCurrentContact({ ...currentContact, createdon: event.target.value })
                            }
                        />
                        <input
                            className="border rounded p-1 mb-2"
                            type="text"
                            placeholder="updatedon"
                            name='updatedon'
                            disabled
                            value={new Date()}
                            onChange={event =>
                                setCurrentContact({ ...currentContact, updatedon: event.target.value })
                            }
                        />
                        <button className='btn btn-sm mt-5 ' type="submit">Submit</button>

                        <div className="modal-action">
                            <label htmlFor="modalEdit" className="btn">Close</label>
                        </div>
                    </form>
                </Modal>

            }


        </div >

    );
};

export default Table;