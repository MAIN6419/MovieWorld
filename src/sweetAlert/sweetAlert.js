import Swal from "sweetalert2";
import "./sweetAlert.css";

export const sweetToast = (title, icon = null) => {
  return Swal.fire({
    toast: true,
    title,
    position: "top",
    showConfirmButton: false,
    icon,
    timer: 2000,
  });
};

export const sweetConfirm = (
  title,
  confirmButtonText,
  cancelButtonText,
  cb,
) => {
  return Swal.fire({
    title,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: true,
    confirmButtonText,
    cancelButtonText,
    showCloseButton: false,
  }).then(({isConfirmed}) => {
    console.log(isConfirmed)
    if (isConfirmed) {
      cb();
    } 
  });
};
