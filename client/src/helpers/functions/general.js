import { message } from "antd";
import axios from '../axios/axiosUser';

export function openInNewTab(url) {
  window.open(url, '_blank');
}

export const appMessage = (msg) => {
  return message.info({content: msg,className: 'messageAntd'})
}

export const appError = (msg) => {
  return message.error({content: msg ,className: 'messageAntd'})
}

export const disconnectUser = async (redirect, dispatch, logoutUser) => {
  await axios.post('/logoutUser');
  dispatch(logoutUser({}));
  if (redirect) window.location.href = redirect;
}

export const formattedWalletAddress = (address) => {
if (!address) return address;
  const first = address.substring(0, 5);
  const addressLength = address.length;
  const second = address.substring(addressLength - 4, addressLength);
  return (`${first}...${second}`)
}
