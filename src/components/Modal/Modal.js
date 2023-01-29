import React, { useState } from 'react';

const Modal = ({ children, modalDetails, modalAdd, modalDelete, modalEdit }) => {



    return (



        <div>


            {
                (modalDetails === "modalDetails" && <input type="checkbox" id="modalDetails" className="modal-toggle" />) ||
                (modalAdd === "modalAdd" && <input type="checkbox" id="modalAdd" className="modal-toggle" />) ||
                (modalDelete === "modalDelete" && <input type="checkbox" id="modalDelete" className="modal-toggle" />) ||
                (modalEdit === "modalEdit" && <input type="checkbox" id="modalEdit" className="modal-toggle" />)
            }



            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    {children}
                </div>
            </div>

        </div>




    );
};

export default Modal;