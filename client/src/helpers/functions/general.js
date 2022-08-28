import { message } from "antd";
import axios from '../axios/axiosUser';


export const externalLinks = {
  stripe: process.env.NODE_ENV === 'production' ? "https://buy.stripe.com/9AQdTi6AO0l53XWeUV" : " https://buy.stripe.com/test_28o9Dz5Xz6F77zG9AA",
  calendlyJosh: "https://calendly.com/josh-baumann",
  docs: "https://amurse.notion.site/amurse/AMURSE-DOCS-007ea171e82e420dbd5070b3680859fc"
}

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
