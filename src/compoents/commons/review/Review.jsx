import ReviewListItem from "./ReviewListItem";
import {
  Rating,
  RatingWrapper,
  ReviewList,
  TextArea,
  TextAreaBtn,
  TextAreaForm,
  TextAreaLabel,
  TextAreaWrapper,
  TextCount,
  TextCountWrapper,
  Title,
  Wrapper,
} from "./review.style";

export default function Review() {
  return (
    <Wrapper>
      <Title>리뷰</Title>
      <RatingWrapper>
        <Rating count={5} />
      </RatingWrapper>
      <TextAreaForm>
        <TextAreaWrapper>
          <TextAreaLabel className="a11y-hidden">리뷰 등록창</TextAreaLabel>
          <TextArea placeholder="개인정보를 공용 및 요청하거나 명예훼손, 무단 광고, 불법 정보 유포시 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."></TextArea>
          <TextCountWrapper>
            <TextCount>0/500</TextCount>
            <TextAreaBtn>등록하기</TextAreaBtn>
          </TextCountWrapper>
        </TextAreaWrapper>
      </TextAreaForm>
      <ReviewList>
        <ReviewListItem/>
      </ReviewList>
    </Wrapper>
  );
}
