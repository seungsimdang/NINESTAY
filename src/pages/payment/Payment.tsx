import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useUserInfo } from "@hooks/useUserInfoQuery";
import { usePayment } from "@hooks/usePaymentQuery";
import { Box, Collapse, Image, Text } from "@chakra-ui/react";
import * as styles from "./Payment.styles";
import DiffUserInfoForm from "@components/Orders/DiffUserInfoForm/DiffUserInfoForm.tsx";
import ReservationInfo from "@components/Orders/ReservationInfo/ReservationInfo";
import UserInfoForm from "@components/Orders/UserInfoForm/UserInfoForm.tsx";
import PaymentInfo from "@components/Orders/PaymentInfo/PaymentInfo";
import Card from "@components/Card/Card";
import TermsAgreementForm from "@components/Orders/TermsAgreementForm/TermsAgreementForm.tsx";
import PaymentSubmitButton from "@components/Orders/PaymentSubmitButton/PaymentSubmitButton";
import RoomInfo from "@components/Orders/RoomInfo/RoomInfo";
import DiffUserCheckbox from "@components/Orders/DiffUserCheckbox/DiffUserCheckbox";
import PaymentOptionsForm from "@components/Orders/PaymentOptionsForm/PaymentOptionsForm";
import { getAuthLocalStorage } from "@utils/getAuthLocalStorage";

const Payment = () => {
  const methods = useForm({
    mode: "onChange"
  });

  const [searchParams] = useSearchParams();
  const cartIds = searchParams.getAll("cartId").map(Number);

  const [isDiffUser, setIsDiffUser] = useState(false);

  const { headers } = getAuthLocalStorage();

  const { data: paymentData } = usePayment(cartIds, headers);
  const { data: userData } = useUserInfo(headers);

  const rawData = paymentData.rawData;
  const reservationData = paymentData.reservationData;
  const totalPrice = reservationData[0][0].value;

  return (
    <styles.Container>
      <FormProvider {...methods}>
        <Card>
          <Text fontSize="25px" fontWeight={700} padding="0.5rem 1rem 1rem">
            결제하기
          </Text>
          {rawData.map((accommodation) =>
            accommodation.room_infos.map((room) => (
              <styles.CardContainer key={room.cartId}>
                <Image
                  src={room.accommodationThumbnailUrl}
                  w="130px"
                  h="130px"
                  objectFit="cover"
                  loading="lazy"
                  borderRadius="5px"
                  marginRight="1rem"
                />
                <Box width="100%">
                  <ReservationInfo
                    hotelName={accommodation.accommodation_name}
                    accommodationType={room.accommodationType}
                  >
                    <RoomInfo roomInfo={room} />
                  </ReservationInfo>
                </Box>
              </styles.CardContainer>
            ))
          )}
        </Card>
        <Card label="예약자 정보">
          <UserInfoForm userData={userData} />
          <DiffUserCheckbox setIsDiffUser={setIsDiffUser} />
          <Collapse in={isDiffUser} animateOpacity>
            {isDiffUser && <DiffUserInfoForm />}
          </Collapse>
        </Card>
        <Card label="결제 정보">
          {reservationData.map((group, index) => (
            <PaymentInfo key={index} data={group} />
          ))}
        </Card>
        <Card label="결제 수단">
          <PaymentOptionsForm />
        </Card>
        <Card>
          <TermsAgreementForm />
        </Card>
        <PaymentSubmitButton
          totalPrice={totalPrice}
          cartIds={cartIds}
          userData={userData}
        />
      </FormProvider>
    </styles.Container>
  );
};

export default Payment;
