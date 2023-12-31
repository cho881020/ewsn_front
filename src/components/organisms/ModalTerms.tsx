import styled from "styled-components";

import COLORS from "@/ui/colors";
import { Btn } from "@/ui/buttons";
import { Title } from "@/ui/fonts";

import { Backdrop, Container } from "@/components/atoms/modal";

interface Props {
  onClose: () => void;
}

const ModalTerms = ({ onClose }: Props) => {
  return (
    <>
      <Backdrop />
      <CustomContainer>
        <Title level="head1" color="#000">
          동서남북 서비스 이용약관
        </Title>
        <Content className="mt-[34px]">
          제 1 조 (목적) <br />이 약관은 이용자가 동서남북(이하
          &apos;커뮤니티&apos;라 합니다)이 제공하는 서비스를 이용함에 있어
          &apos;커뮤니티&apos;와 이용자와의 권리·의무 및 책임사항, 기타 필요한
          사항을 규정하는 것을 목적으로 합니다. <br />
          <br />제 2 조 (용어의 정의)
          <br /> 이 약관에서 사용하는 용어의 정의는 다음 각호와 같습니다. <br />
          1. &apos;이용자&apos;라 함은 &apos;커뮤니티&apos; 사이트에 접속하여 이
          약관에 따라 &apos;커뮤니티&apos;가 제공하는 서비스를 이용하는 자를
          말하며, 회원과 비회원을 모두 포함합니다. <br />
          2. &apos;회원&apos;이라 함은 이 약관에 동의를 하고,
          &apos;커뮤니티&apos;에 개인정보를 제공하여 회원으로 가입한 자를
          말합니다.
          <br /> 3. &apos;닉네임&apos;이라 함은 회원 식별과 회원의 서비스 이용을
          위하여 회원이 선정하고 &apos;커뮤니티&apos;가 승인하는 문자와 숫자의
          조합을 말합니다.
          <br />
          4. &apos;비밀번호&apos;라 함은 회원의 동일성 확인과 비밀 보호를 위하여
          회원 스스로가 설정한 문자와 숫자 등의 조합을 말합니다. <br />
          5. &apos;운영진&apos;이란 &apos;커뮤니티&apos;가 승인한 서비스 운영 및
          관리 권한이 있는 자를 말합니다.
          <br /> 6. &apos;게시물&apos;이란 &apos;회원&apos;이 서비스를 이용함에
          있어 서비스상에 게시한 부호·문자·음성·음향·화상·동영상 등의 정보
          형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다. <br />
          7. 기타 이 약관에서 정하지 안히나 용어는 관련 법령 및 일반 상관례에
          따릅니다. <br />
          <br />제 3 조 (약관의 효력 및 개정) <br />
          (1) 이 약관의 내용은 서비스 화면에 게시하거나 기타의 방법으로 회원에게
          공지함으로써 그 효력이 발생합니다. <br />
          (2) &apos;커뮤니티&apos;는 필요한 경우 관련 법령을 위배하지 않는 범위
          내에서 이 약관을 개정할 수 있습니다. 이 약관이 개정되는 경우
          &apos;커뮤니티&apos;는 변경사항을 시행일자 7일 전부터 서비스
          공지사항에서 공지하는 것을 원칙으로 하며, &apos;이용자&apos;에게
          불리하게 약관의 내용을 변경하는 경우 최소한 30일 이전에 공지합니다.{" "}
          <br />
          (3) &apos;회원&apos;은 변경된 약관에 동의하지 않을 권리가 있으며,
          변경된 약관에 동의하지 않을 경우에는 서비스 이용을 중단하고 탈퇴할 수
          있습니다. 다만, &apos;이용자&apos;가 제3항의 방법 등으로
          &apos;커뮤니티&apos;가 별도 고지한 약관 개정 공지 기간 내에
          &apos;커뮤니티&apos;에 개정 약관에 동의하지 않는다는 명시적인
          의사표시를 하지 않는 경우 변경된 약관에 동의한 것으로 간주합니다.{" "}
          <br />
          (4) 이 약관에 규정되지 않은 사항에 대해서는 관련 법령 또는
          &apos;커뮤니티&apos;가 정한 개별 서비스의 이용약관, 운영정책 및 규칙
          등(이하 &apos;세부지침&apos;이라 합니다)의 규정에 따릅니다. <br />
          <br />제 4 조 (회원가입과 제한) <br />
          (1) &apos;회원&apos;으로 가입하고자 하는 &apos;이용자&apos;는
          &apos;커뮤니티&apos;가 정한 가입 양식에 따라 필요한 정보를 입력하고
          가입하기 버튼을 누르는 방법으로 회원 가입을 신청합니다. 가입하기
          버튼을 누름과 동시에 이 약관에 동의하는 것으로 간주됩니다. <br />
          (2) &apos;커뮤니티&apos;는 제1항과 같이 &apos;회원&apos;으로 가입할
          것을 신청한 자가 다음 각호에 해당하지 아니하는 한 신청한 자를 회원으로
          등록합니다. <br />
          1. 회원 가입시 필요한 정보에 허위, 기재누락, 오기가 있는 경우 <br />
          2. 가입할 것을 신청한 자가 이 약관에 의하여 이전에 회원자격이 제한
          또는 정지되거나 회원자격을 상실을 한 적이 있는 경우 <br />
          3. 선량한 풍속 및 기타 사회질서를 저해할 목적으로 신청한 경우 <br />
          4. 기타 &apos;회원&apos;으로 등록하는 것이 &apos;커뮤니티&apos;의
          서비스 운영 및 기술상 현저히 지장이 있다고 판단되는 경우 <br />
          (3) &apos;회원&apos;은 회원 가입 시 기재한 정보가 변경되었을 경우에는
          &apos;회원&apos; 스스로 정보를 수정하여야 하며, 정보를 수정하지
          아니하여 발생한 불이익에 대해서는 &apos;커뮤니티&apos;는 책임을 지지
          않습니다. <br />
          <br />제 5 조 (회원탈퇴 및 자격 제한 등)
          <br /> (1) &apos;회원&apos;은 언제든지 자신의 회원 등록을 말소하기
          위하여 회원 탈퇴를 요청할 수 있습니다. <br />
          (2) &apos;커뮤니티&apos; 및 &apos;운영진&apos;은 &apos;회원&apos;이
          다음 각호에 해당하는 행위를 하였을 경우 사전 통지 없이 회원자격을 제한
          및 정지, 상실시킬 수 있습니다. <br />
          1. 타인의 서비스 ID 및 비밀번호를 도용한 경우 <br />
          2. 서비스 운영을 고의로 방해한 경우 <br />
          3. 공공질서 및 미풍양속에 저해되는 내용을 유포시킨 경우 <br />
          4. 회원이 국익 또는 사회적 공익을 저해할 목적으로 서비스 이용을 계획
          또는 실행하는 경우 <br />
          5. 타인의 명예를 손상시키거나 불이익을 주는 행위를 한 경우
          <br /> 6. 기타 &apos;커뮤니티&apos;가 정한 &apos;세부지침&apos;에
          위반한 경우 <br />
          7. &apos;커뮤니티&apos;가 사전 승인하지 않은 광고성, 홍보성 게시물
          작성을 하는 경우 <br />
          8. 게시판에 게시물을 도배하는 행위를 한 경우 <br />
          (3) &apos;회원&apos;은 전항의 &apos;커뮤니티&apos; 및
          &apos;운영진&apos;의 회원자격 제한 및 정지, 상실에 대해 아래 이메일을
          통해 이의를 제기할 수 있습니다. <br />
          이메일 주소: iillllilil@nate.com
          <br />
          <br />제 6 조 (서비스 이용 시 &apos;회원&apos;의 의무)
          <br /> (1) 회원은 서비스를 이용할 때 다음 각호의 행위를 하지 않아야
          합니다. <br />
          1. 다른 회원의 ID를 부정하게 사용하는 행위 <br />
          2. 서비스에서 얻은 정보를 &apos;커뮤니티&apos;의 사전 승인 없이
          &apos;회원&apos;의 이용이외의 목적으로 복제하거나 이를 출판 및 방송
          등에 사용하거나 제3자에게 제공하는 행위 <br />
          3. &apos;커뮤니티&apos; 및 제3자의 지식재산권 등 기타 권리를 침해하는
          행위
          <br />
          4. 선량한 풍속 및 기타 사회질서에 위반되는 내용을 유포하는 행위 <br />
          5. 범죄적 행위와 결부된다고 객관적으로 판단되는 행위 <br />
          6. 기타 관련 법령에 위배되는 행위 <br />
          7. 서비스 변경, 삭제(해킹) 등 &apos;커뮤니티&apos;의 업무를 방해하는
          행위 <br />
          (2) &apos;회원&apos;은 이 약관에서 규정하는 사항과
          &apos;세부지침&apos;을 준수하여야 합니다. <br />
          (3) &apos;회원&apos;은 &apos;커뮤니티&apos;의 사전 승인 없이는
          서비스를 이용하여 영업활동을 할 수 없으며, 영업활동의 결과와
          &apos;회원&apos;이 약관에 위반한 영업활동을 이용하여 발생한 결과에
          대하여 &apos;커뮤니티&apos;는 책임을 지지 않습니다.
          <br />
          <br /> 제 7 조 (&apos;회원&apos;의 게시물) <br />
          &apos;커뮤니티&apos;는 &apos;회원&apos;이 게시하거나 등록하는
          서비스내의 내용물이 다음 각호의 하나에 해당한다고 판단되는 게시물을
          사전 통지 없이 블라인드 처리하거나 삭제할 수 있습니다. <br />
          1. 다른 &apos;회원&apos; 또는 제3자를 비방하거나 중상모략으로 명예를
          손상시키는 내용인 경우 <br />
          2. 선량한 풍속 및 기타 사회질서에 위반되는 내용인 경우 <br />
          3. 범죄적 행위에 결부된다고 인정되는 내용일 경우 <br />
          4. &apos;커뮤니티&apos; 및 제3자의 지식재산권 등 기타 권리를 침해하는
          내용인 경우 <br />
          5. &apos;커뮤니티&apos;가 규정한 게시기간을 초과한 경우 <br />
          6. 게시판의 성격에 맞지 않는 경우 <br />
          7. 지나친 중복 게시물인 경우 <br />
          8. 혐오감을 유발하는 경우 <br />
          9. 특정 &apos;회원&apos;을 비방하는 경우 <br />
          10. 지나친 선정성글 혹은 음란성 게시물인 경우 <br />
          11. &apos;커뮤니티&apos;의 사전 승인 하지 않은 광고, 홍보성 게시물인
          경우 <br />
          12. 너무 많은 욕설이 섞인 게시물 <br />
          13. 특정 연예인 안티성 게시물 <br />
          14. 기타 서비스의 운영 목적에 위배되는 경우 <br />
          15. 기타 관련 법령에 위반된다고 판단되는 경우 <br />
          <br />제 8 조 (게시물의 저작권)
          <br /> 서비스에 게재된 자료에 대한 권리는 다음 각호와 같습니다. <br />
          1. 게시물에 대한 책임은 게시자에게 있으며 등록되는 모든 글과 자료는
          &apos;커뮤니티&apos;가 서비스 운영을 위한 수익사업에 사용할 수 있고
          서비스 내의 게재권을 갖습니다. <br />
          2. &apos;회원&apos;은 서비스를 이용하여 얻은 정보를 가공, 판매하는
          행위 등 서비스에 게재된 자료를 &apos;커뮤니티&apos;의 허락 없이
          상업적으로 사용할 수 없습니다. <br />
          <br />제 9 조 (서비스 이용시간) <br />
          서비스 이용시간은 &apos;커뮤니티&apos;의 업무상 또는 기술상 불가능한
          경우를 제외하고는 연중무휴, 1일 24시간으로 함을 원칙으로 합니다. 다만,
          서비스 점검 등의 사유로 &apos;커뮤니티&apos;가 서비스를 특정 범위로
          분할하여 별도로 날짜와 시간을 정할 수 있습니다. <br />
          <br />제 10 조 (서비스 제공의 중지)
          <br /> &apos;커뮤니티&apos;는 다음 각호에 해당하는 경우 서비스 제공을
          중지할 수 있습니다. <br />
          1. 서비스용 설비의 보수 등 공사로 인한 부득이한 경우 <br />
          2. 전기통신사업법에 규정된 기간통신사업자가 전기통신서비스를 중지했을
          경우 <br />
          3. &apos;커뮤니티&apos;는 국가비상사태, 정전, 서비스 설비의 장애 또는
          서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 때에는
          서비스의 전부 또는 일부를 제한하거나 정지할 수 있습니다. <br />
          <br />제 11 조 (면책조항) <br />
          (1) &apos;커뮤니티&apos;는 천재지변 또는 이에 준하는 불가항력으로
          인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이
          면제됩니다.
          <br />
          (2) &apos;커뮤니티&apos;는 &apos;회원&apos;의 귀책사유로 인한 서비스
          이용의 장애에 대하여 책임을 지지 않습니다. <br />
          (3) &apos;커뮤니티&apos;는 &apos;회원&apos;이 서비스를 이용하여
          기대하는 손익이나 서비스를 통하여 얻은 자료로 인한 손해에 관하여
          책임을 지지 않습니다. <br />
          (4) &apos;커뮤니티&apos;는 &apos;회원&apos;이 서비스에 게시 또는
          전송한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관하여는 책임을
          지지 않습니다. <br />
          (5) &apos;커뮤니티&apos;는 &apos;이용자&apos; 상호간 또는
          &apos;이용자&apos;와 제3자간 서비스를 매개로 발생한 분쟁에 대해 개입할
          의무가 없으며 이로 인한 어떠한 손해에 관하여도 책임을 지지 않습니다.{" "}
          <br />
          <br />제 12 조 (관할법원)
          <br /> &apos;커뮤니티&apos;와 &apos;이용자&apos; 간 서비스 이용으로
          발생한 분쟁에 대해 소송이 제기될 경우 관할법원은 민사소송법이 정하는
          바에 따릅니다.
          <br />
          <br />
          [부칙] (시행일) 이 약관은 2024년 1월 1일부터 시행합니다.
        </Content>
        <CustomBtn onClick={onClose}>확인</CustomBtn>
      </CustomContainer>
    </>
  );
};

const CustomContainer = styled(Container)`
  max-width: 90%;
  width: 500px;
  overflow-y: scroll;
  height: 500px;
`;

const CustomBtn = styled(Btn)`
  border-radius: 0;
  border: none;
  margin-top: 40px;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  letter-spacing: -0.6px;
  font-size: 14px;
  line-height: 24px;
  color: ${COLORS.TEXT02};
  padding: 0 20px;
  text-align: left;
`;

export default ModalTerms;
