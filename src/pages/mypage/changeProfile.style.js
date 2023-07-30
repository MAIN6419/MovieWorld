import styled from "styled-components";

export const ModalWrapper = styled.section``;

export const Title = styled.h2`
  color: #fff;
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 50px;
  @media screen and (max-width: 486px) {
    font-size: 30px;
  }
`;

export const Dim = styled.div`
  width: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  inset: 0;
  z-index: 999;
`;

export const ModalCard = styled.div`
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 800px;
  background-color: #111;
  padding: 20px;
`;

export const ProfileForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 80px;
  @media screen and (max-width: 486px) {
    gap: 20px;
  }
`;

export const ImgInput = styled.input`
  display: none;
`;

export const ProfileImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;
export const ProfileImg = styled.img`
  width: 128px;
  height: 128px;
  border: 3px solid #333;
  border-radius: 50%;
  object-fit: cover;
 
`;

export const ChangeImgBtn = styled.button`
  border: 2px solid #292a2b;
  color: #49494b;
  background-color: #1d1e1e;
  padding: 5px;
  width: 120px;
  font-size: 12px;
  :focus{
    outline: none;
    box-shadow: 0px 0px 1px 1px #fff;
  }
`;

export const DisplayNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;

export const DisplayNameInput = styled.input`
  width: 100%;
  border: 2px solid #292a2b;
  background-color: #1d1e1e;
  padding: 8px;
  color: #bdbdbd;
`;

export const DisplayNameLabel = styled.label`
  color: #fff;
`;

export const InputDescList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #4c4d4f;
  font-size: 12px;
  @media screen and (max-width: 486px) {
    position: absolute;
    bottom: 85px;
    left: 20px;
    gap: 0;
    font-size: 11px;
  }
`;

export const InputDesc = styled.li`
  list-style-type: disc;
  margin-left: 20px;
  line-height: 1.5;
`;

export const ProfileEditBtns = styled.div`
  display: flex;
  gap: 10px;
  border-top: 1px solid #292a2b;
  padding-top: 20px;
`;

export const ProfileEditBtn = styled.button`
  padding: 5px 15px;
  background-color: #1d1e1e;
  color: #fff;
  border: 1px solid #292a2b;
`;
