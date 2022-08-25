
import axiosChat from '../axios/axiosChat'
import web3 from 'web3';
import {appError, appMessage} from './general'
import { setFloatMessage } from "../../redux/features/Messages/Messages";


export const contactButtonClicked = async (data, dispatch, user) => {
    let { senderAddress, receiverAddress } = data;

    if (!receiverAddress) return appError('User address not found');
    if (!senderAddress) return appMessage('Connect Wallet');
    if (!web3.utils.isAddress(receiverAddress)) return appError('Invalid Eth Address');
    if (senderAddress.toLowerCase() === receiverAddress.toLowerCase()) return appMessage("Can't message yourself");

    let conversation = (await axiosChat.post('/getConversation', { addresses: [receiverAddress, senderAddress], address: senderAddress, signature: user.signature})).data;
    if (!conversation) conversation = (await axiosChat.post('/createConversation', { addresses: [receiverAddress, senderAddress], address: senderAddress, signature: user.signature})).data;
    if (conversation) dispatch(setFloatMessage({ address: receiverAddress, page: 'messagepage', convo: conversation, open: true }))
    else appError('Something went wrong')
}