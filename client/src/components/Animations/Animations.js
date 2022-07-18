import blockchainAnimation from '../../images/animations/blockchain.json';
import loadingAnimation from '../../images/animations/loading.json';
import toggleButtonAnimation from '../../images/animations/toggle_button.json';

const repeatingOptions = (animation) => {
  return (
    {
      loop: true,
      autoplay: true,
      animationData: animation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }
  );
};

export const blockchain = repeatingOptions(blockchainAnimation);
export const Loading = repeatingOptions(loadingAnimation);
export const toggleButton = repeatingOptions(toggleButtonAnimation);


