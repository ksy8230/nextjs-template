import React from "react";

type TLoginModal = {
  openLoginModal: boolean;
};

const LoginModal = ({ openLoginModal }: TLoginModal) => {
  const onCloseModal = () => {};
  return <div className={`modal ${openLoginModal ? "fade show" : ""}`}></div>;
};

export default LoginModal;
