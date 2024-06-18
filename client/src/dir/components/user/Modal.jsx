import { useState } from "react";

const Modal = () => {
  const [modal, setModal] = useState(false);

  const handlemodal = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  const [closemodal, closesetModal] = useState(false);

  const closed = (e) => {
    e.preventDefault();
    closesetModal(closemodal);
  };
  return (
    <>
      <button
        onClick={() => setModal(true)}
        className="rounded-full bg-red-700 p-1 px-4 text-white"
      >
        <u>
          {" "}
          Delete my account{" "}
          <i className="fas fa-chart-pie fa-x  text-white "></i>
        </u>
      </button>

      {modal && (
        <div
          className="min-w-screen h-screen flex justify-center items-center animated fadeIn faster  fixed  left-0 top-0  inset-0 z-99 outline-none focus:outline-none bg-no-repeat bg-center bg-cover hidden"
          id="modal-id"
        >
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full mt-24 max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white z-99">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
                <i className="animate-pulse far fa-sad-tear text-red-400 fa-3x "></i>
                <h2 className="text-xl font-bold py-4 ">
                  We hate to see you go?
                </h2>
                <div className="text-sm text-gray-500 px-8">
                  Do you really want to delete your account?
                  <br /> This process cannot be undone
                </div>
              </div>

              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  onClick={closed}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  <i className="fas fa-smile animate-bounce text-green-500"></i>{" "}
                  Cancel
                </button>
                <button className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">
                  {" "}
                  <i className="fas fa-sad-cry"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
