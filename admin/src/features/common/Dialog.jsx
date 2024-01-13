import { createPortal } from 'react-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Dialog = (props) =>
  createPortal(
    
    <div {...props.attr.container} className="dialog-container z-10 flex fixed inset-0">
      <div {...props.attr.overlay} className="backdrop-blur-sm opacity-75 bg-white fixed inset-0"/>
      <div {...props.attr.dialog} className="bg-white border-sky-300 border-2 border-solid rounded-xl shadow-lg m-auto z-20 relative py-3 px-5 w-min-300px">
        <div className="flex justify-between items-center">
          <p {...props.attr.title} className="font-bold text-2xl text-sky-600">
            {props.title}
          </p>
          <button {...props.attr.closeButton} className="cursor-pointer p-2">
            {/* <FontAwesomeIcon icon="fa-solid fa-xmark" /> */}
            ❌
          </button>
        </div>

        <div className="pt-7">{props.children}</div>
      </div>
    </div>,
    document.body,
  )

export default Dialog
