import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

toastr.options = {
  positionClass: "toast-top-right",
  timeOut: 5000,
  extendedTimeOut: 1000,
  closeButton: true,
  progressBar: true,
  newestOnTop: true,
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
  showDuration: 300,
  hideDuration: 1000
}

export default toastr;