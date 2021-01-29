import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function Message({ className, isCorrect }) {
  return (
    <div className={className}>
      <span className="msg">
        {`${isCorrect ? 'acertouhgrhh!' : 'errouhgrhh!'}`}
      </span>
    </div>
  );
}

Message.protoTypes = {
  className: PropTypes.string.isRequired,
};

const MessageError = styled(Message)`
    background-image: url(https://media.giphy.com/media/wkVT0sAD2L280gzMqE/giphy.gif);
    position: absolute;
    bottom: -23px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 420px;
    height: 331px;
    background-repeat: no-repeat;
    background-size: contain;
    overflow: hidden;
    animation: rise .3s ease;
    background-position: center;
    @media (max-width:500px){
        bottom: 0px;
        width: 320px;
        height: 255px;
    }

@keyframes rise {
  0% {
    bottom: -400px;
  }
  100% {
    bottom: -23px;
  }
}

span.msg {
    font-size: 1.5em;
    background-color: red;
    border-radius: 4px;
    padding: 10px;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.wrongAnswer};
    right: 50%;
    border: 0;
    text-transform: uppercase;
    top: 75%;
    transform: translateX(50%);
    display: block;
    text-align:center;
}

span.msg::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid ${({ theme }) => theme.colors.wrongAnswer};
    position: absolute;
    top: -10px;
    right: 38%;
    }
`;

export default MessageError;
