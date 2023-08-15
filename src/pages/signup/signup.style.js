import styled from "styled-components";

export const Wrapper = styled.main`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 450px;
  padding: 30px 40px;
  @media screen and (max-width: 431px) {
    padding: 30px 30px;
  }
`;

export const Title = styled.h1`
  color: #fff;
  margin-top: 30px;
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: 500;
`;

export const ProgressWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 80px;
`;
export const ProgressTitle = styled.h2``;

export const ProgressCheckWrapper = styled.div`
  position: relative;
`;

export const ProgressCheckText = styled.p`
  color: #fff;
  position: absolute;
  font-size: 14px;
  width: 100px;
  top: 50px;
  left: -15px;
  @media screen and (max-width: 431px) {
    font-size: 12px;
    left: -10px;
  }
`;
export const ProgressCheck = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: ${(props) =>
    props.active ? "2px solid #627af5" : "2px solid #bdbdbd"};

  flex-shrink: 0;
  background: ${(props) =>
      props.active
        ? document.body.classList.contains("webp")
          ? 'url("/assets/webp/icon-check-active.webp")'
          : 'url("/assets/icon-check-active.svg")'
        : document.body.classList.contains("webp")
        ? 'url("/assets/webp/icon-check.webp")'
        : 'url("/assets/icon-check.svg")'}
    no-repeat center / 20px #222;
  transition: all 0.5s;

  &.defalut {
    transition-delay: ${(props) => (props.active ? "" : "0.3s")};
  }
  &.profile {
    transition-delay: ${(props) => (props.active ? "0.3s" : "")};
  }
`;

export const ProgressBar = styled.div`
  position: relative;
  height: 2px;
  background-color: #bdbdbd;
  width: 100%;
  ::after {
    position: absolute;
    content: "";
    width: ${(props) => (props.percentage ? props.percentage : "0")};
    height: 2px;
    background-color: #627af5;
    transition: all 0.5s;
    transition-delay: ${(props) => (props.percentage === "50%" ? "0.3s" : "")};

    @media screen and (max-width: 431px) {
      width: ${(props) => (props.percentage ? props.percentage : "0")};
    }
  }
`;

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const InputWrapper = styled.div`
  & > p {
    margin-top: 10px;
  }
`;

export const ProfileImgWrapper = styled.div`
  position: relative;
  border-bottom: 1px solid #fff;
  margin-bottom: 10px;
`;

export const ProfileImgLabel = styled.label`
  display: block;
  text-align: center;
  color: #fff;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const ProfileImgInput = styled.input``;

export const ProfileImgButton = styled.button`
  display: block;
  margin: 0 auto;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  position: relative;
  border: 2px solid #bdbdbd;
  ::after{
    content: "";
    position: absolute;
    right: -10px;
    bottom: 0;
    width: 40px;
    height: 40px;
  }
  body.no-webp &::after {
    background: url("/assets/icon-uploadImg.svg") no-repeat center / 40px;
  }
  body.webp &::after {
    background: url("/assets/webp/icon-uploadImg.webp") no-repeat center / 40px;
  }
`;

export const ProfileImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
export const ProfileImgResetBtn = styled.button`
  position: absolute;
  width: 20px;
  height: 20px;
  top: -10px;
  right: calc(100% - 70%);
  body.no-webp &{
    background: url("/assets/icon-close.svg") no-repeat center / 20px;
  }
  
  body.webp & {
    background: url("/assets/webp/icon-close.webp") no-repeat center / 20px;
  }
`;
export const ProfileImgDescList = styled.ul`
  padding: 20px 10px;
`;

export const ProfileImgDesc = styled.li`
  color: #4c4d4f;
  list-style-type: disc;
  margin-left: 30px;
  line-height: 1.5;
  font-size: 12px;
`;

export const SignupBtn = styled.button`
  width: 100%;
  background-color: ${(props) =>
    props.disabled ? "rgba(220,220,220, 0.5)" : "#e50914"};
  cursor: ${(props) => (props.disabled ? "default" : "cursor")};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  margin-top: 10px;
  transition: all 0.5s;
`;

export const PrevBtn = styled.button`
  width: 100%;
  background-color: #eee;
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #111;
`;
