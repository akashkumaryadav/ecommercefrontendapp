import React from "react"

const Modal = ({show,content,onSuccess,children,onClose}) => {
    if(!show){
        return null;
    }
    return <div className="w-screen h-screen  top-0 z-10 flex justify-center items-center fixed bg-gray-800 bg-opacity-60 left-0">
        <div className="w-5/6 h-5/6  my-20 ">
        {children}
        </div>
        <button className="absolute top-3 right-40 bg-white px-4 py-2 rounded-full" onClick={()=>onClose(false)}><i class="fas fa-times"></i></button>
    </div>
}

export default Modal;