export default function AppModal(props) {
  const {
    target,
    title,
    content,
    isCloseButton,
    isCloseButtonText,
    isSuccessButton,
    isSuccessButtonText,
    onAccept,
  } = props;
  return (
    <>
      <div className="modal fade" id={target}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{content}</div>
            <div className="modal-footer">
              {isCloseButton && (
                <button
                  type="button"
                  className="btn btn-outline-secondary d-inline-flex align-items-center"
                  data-bs-dismiss="modal"
                >
                  {isCloseButtonText}
                </button>
              )}
              {isSuccessButton && (
                <button
                  type="button"
                  className="btn btn-outline-success d-inline-flex align-items-center"
                  onClick={() => onAccept()}
                >
                  {isSuccessButtonText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* < Modal */}
    </>
  );
}
