import { Box, Modal } from '@mui/material';

export default function AppModal(props) {
  const {
    target,
    onClose,
    width = 1000,
    title,
    isCloseButton,
    closeButtonText,
    isSuccessButton,
    successButtonText,
    onAccept,
    children,
  } = props;

  return (
    <>
      <div>
        <Modal open={target} onClose={() => onClose(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translate(-50%, -10%)',
              width: width,
              maxHeight: '80%',
              overflow: 'scroll',
              bgcolor: 'background.paper',
              border: '2px solid #b9b5b5',
              boxShadow: 24,
              p: 2,
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header mb-5">
                  <h5 className="modal-title" id="exampleModalLabel">
                    {title}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => onClose(false)}
                  />
                </div>
                <div className="modal-body">{children}</div>
                <div className="modal-footer mt-3">
                  {isCloseButton && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary d-inline-flex align-items-center"
                      onClick={() => onClose(false)}
                    >
                      {closeButtonText}
                    </button>
                  )}
                  {isSuccessButton && (
                    <button
                      type="button"
                      className="btn btn-outline-success d-inline-flex align-items-center ms-4"
                      onClick={() => onAccept()}
                    >
                      {successButtonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}
