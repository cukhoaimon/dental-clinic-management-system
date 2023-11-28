import { createPortal } from 'react-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Dialog = (props) =>
  createPortal(
    // TODO: convert css to tailwind
    <div {...props.attr.container} className="dialog-container">
      <div {...props.attr.overlay} className="dialog-overlay"/>
      <div {...props.attr.dialog} className="dialog-content bg-white border-black border border-solid border-spacing-1 m-auto z-20 relative py-3 px-5 w-min-300px">
        <div className="dialog-header">
          <p {...props.attr.title} className="dialog-title">
            {props.title}
          </p>
          <button {...props.attr.closeButton} className="dialog-close">
            {/* <FontAwesomeIcon icon="fa-solid fa-xmark" /> */}
            ❌
          </button>
        </div>

        <div className="dialog-children">{props.children}</div>
      </div>
    </div>,
    document.body,
  )

export default Dialog
