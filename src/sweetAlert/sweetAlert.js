import Swal from "sweetalert2";
import "./sweetAlert.css";
import 'sweetalert2/dist/sweetalert2.min.css';
export const sweetToast = (title, icon = null, timer = 2000) => {
  return Swal.fire({
    toast: true,
    title,
    position: "top",
    showConfirmButton: false,
    icon,
    timer
  });
};

export const sweetConfirm = (
  title,
  confirmButtonText,
  cancelButtonText,
  cb
) => {
  return Swal.fire({
    title,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: true,
    confirmButtonText,
    cancelButtonText,
    showCloseButton: false,
  }).then(({ isConfirmed }) => {
    console.log(isConfirmed);
    if (isConfirmed) {
      cb();
    }
  });
};
