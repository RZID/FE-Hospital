import Swal from "sweetalert2";
export default {
  methods: {
    alertError: (title, message) => {
      Swal.fire({
        icon: "error",
        title: title,
        text: message,
      });
    },
    alertSuccess: (title, message) => {
      Swal.fire({
        icon: "success",
        title: title,
        text: message,
      });
    },
    alertConfirmation: (title, message, confirmButton) => {
      return new Promise((resolve) => {
        Swal.fire({
          icon: "question",
          title: title,
          text: message,
          showCancelButton: true,
          confirmButtonText: confirmButton,
        }).then((result) => {
          if (result.isConfirmed) {
            resolve(true);
          }
        });
      });
    },
  },
};
