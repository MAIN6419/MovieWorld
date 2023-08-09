import React from "react";
import {
  EditBtn,
  EditBtns,
  EditTextArea,
  EditTextAreaBottom,
  EditTextAreaForm,
  EditTextAreaLabel,
  EditTextCount,
  ReviewContents,
  ReviewCreatedAt,
  ReviewItem,
  ReviewItemBottom,
  ReviewItemBtn,
  ReviewItemRate,
  ReviewItemRateCount,
  ReviewItemRateWrapper,
  Reviewer,
  ReviewerImg,
  ReviewerWrapper,
  ShowSpoilerBtn,
} from "./reviewListItem.style";
import { setDateFormate } from "../../../libray/setDateFormate";
import { sweetConfirm } from "../../../sweetAlert/sweetAlert";
import {
  ToggleButton,
  ToggleCheckbox,
  ToggleSwitch,
  ToggleSwithTag,
  ToggleWrapper,
} from "./review.style";

export default function ReviewListItemUI({
  reviewItem,
  isEdit,
  editRating,
  setEditRating,
  onClickEdit,
  editValue,
  onChangeEditValue,
  editTextCount,
  editSpoiler,
  setEditSpoiler,
  onClickCancelEdit,
  setIsEdit,
  onClickRemove,
  onClickReport,
  userData,
  webpSupport,
  resolveWebp,
  showSpoilerData,
  setShowSpoilerData,
  rateRef,
  submitRef,
  cancelRef,
  editBtnRef,
  optKeyboardFocus,
}) {
  return (
    <ReviewItem>
      <ReviewerWrapper className="reviewerWrapper" isEdit={isEdit}>
        {!isEdit && (
          <ReviewerImg
            src={
              reviewItem.reviewerImg ||
              resolveWebp(
                webpSupport,
                "/assets/webp/icon-defaultProfile.webp",
                "svg"
              )
            }
            alt="유저 프로필 이미지"
            onError={(e) =>
              (e.target.src = resolveWebp(
                webpSupport,
                "/assets/webp/icon-defaultProfile.webp",
                "svg"
              ))
            }
          />
        )}
        {!isEdit && <Reviewer>{reviewItem.reviewer}</Reviewer>}
        <ReviewItemRateWrapper
          ref={rateRef}
          tabIndex={isEdit ? "0" : "-1"}
          onKeyDown={(e) => optKeyboardFocus(e, cancelRef.current)}
        >
          <ReviewItemRate
            value={editRating}
            disabled={!isEdit}
            onChange={(value) => setEditRating(value)}
          />
          <ReviewItemRateCount>{editRating * 2}</ReviewItemRateCount>
        </ReviewItemRateWrapper>
        {isEdit && (
          <ToggleWrapper>
            <ToggleCheckbox
              type="checkbox"
              id="toggle-edit"
              className="a11y-hidden"
              tabIndex="-1"
              onClick={() => setEditSpoiler(!editSpoiler)}
            />
            <ToggleSwithTag>스포일러 체크</ToggleSwithTag>
            <ToggleSwitch
              htmlFor="toggle-edit"
              className="toggleSwitch"
              toggle={editSpoiler}
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.keyCode === 13) setEditSpoiler(!editSpoiler);
              }}
            >
              <ToggleButton
                className="toggleButton"
                toggle={editSpoiler}
              ></ToggleButton>
            </ToggleSwitch>
          </ToggleWrapper>
        )}
      </ReviewerWrapper>
      {isEdit ? (
        <EditTextAreaForm onSubmit={(e) => onClickEdit(e)}>
          <EditTextAreaLabel className="a11y-hidden">
            수정 입력창
          </EditTextAreaLabel>
          <EditTextArea
            value={editValue}
            onChange={onChangeEditValue}
            placeholder="개인정보를 공용 및 요청하거나 명예훼손, 무단 광고, 불법 정보 유포시 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
          <EditTextAreaBottom>
            <EditTextCount>{editTextCount}/500</EditTextCount>
            <EditBtns>
              <EditBtn type="submit" ref={submitRef}>
                수정하기
              </EditBtn>
              <EditBtn
                className="cancel"
                type="button"
                onClick={onClickCancelEdit}
                ref={cancelRef}
                onKeyDown={(e) =>
                  optKeyboardFocus(e, submitRef.current, rateRef.current)
                }
              >
                취소하기
              </EditBtn>
            </EditBtns>
          </EditTextAreaBottom>
        </EditTextAreaForm>
      ) : (
        <>
          <ReviewContents inactive={reviewItem.isBlock||(reviewItem.spoiler && !showSpoilerData)}>
            {reviewItem.isBlock
              ? "신고에 의해 블라인드 처리된 리뷰입니다."
              : reviewItem.spoiler
              ? showSpoilerData
                ? reviewItem.contents
                : "스포일러가 포함된 리뷰입니다."
              : reviewItem.contents}
            {reviewItem.spoiler && !showSpoilerData && (
              <ShowSpoilerBtn
                onClick={() => {
                  sweetConfirm(
                    "스포일러가 포함된 리뷰입니다.\n정말 확인 하시겠습니까?",
                    "확인",
                    "취소",
                    () => setShowSpoilerData(true)
                  );
                }}
              >
                보기
              </ShowSpoilerBtn>
            )}
          </ReviewContents>

          <ReviewItemBottom>
            <ReviewCreatedAt
              dateTime={new Date(
                reviewItem.createdAt.seconds * 1000
              ).toISOString()}
            >
              {setDateFormate(reviewItem.createdAt.seconds * 1000)}
            </ReviewCreatedAt>
            {userData.displayName === reviewItem.reviewer ? (
              <>
                <ReviewItemBtn
                  type="button"
                  onClick={() => {
                    setIsEdit(true);
                    rateRef.current.firstElementChild.focus();
                  }}
                  ref={editBtnRef}
                >
                  수정
                </ReviewItemBtn>
                <ReviewItemBtn type="button" onClick={onClickRemove}>
                  삭제
                </ReviewItemBtn>
              </>
            ) : (
              !reviewItem.isBlock&&<ReviewItemBtn onClick={onClickReport}>신고</ReviewItemBtn>
            )}
          </ReviewItemBottom>
        </>
      )}
    </ReviewItem>
  );
}
