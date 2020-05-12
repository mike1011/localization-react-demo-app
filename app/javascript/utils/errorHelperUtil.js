import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import viewHelper from '../helpers/toastHelper';

export default {
    toastId: null,
    handleAjaxError: (err, message = null) => {
        this.toastId = toast(viewHelper.returnToastMarkup({
            title: "Error",
            message: `Something went wrong while processing your request.Try again later`,
            type: toast.TYPE.ERROR
        }));
    },
}
