import { ReactElement } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import Image from "next/image";
import mainBunnyImag from "../../public/images/main-bunny.png";
import mainHospitalImag from "../../public/images/main-hospital.png";
import mainGrassImag from "../../public/images/main-grass.png";
import mainProductImag from "../../public/images/main-product.png";
import { IconCheck } from "../../components/Icon";

export default function Home() {
  return (
    <div className="max-w-[62.5rem] m-auto pb-[8rem]">
      {/* 컨텐츠 헤더 */}
      <div className="flex items-center justify-around mb-5">
        <div className="flex items-center">
          <p className="text-xl font-bold text-[#1F1C1D]">
            내가 필요해서 만든,
            <br />
            토끼를 키우면서 필요한 업체 정보들
          </p>
        </div>
        <div>
          <Image src={mainBunnyImag} width="200" height="251" />
        </div>
      </div>
      {/* 컨텐츠 */}
      <div className="content-list">
        <div className="flex items-center justify-around bg-[#1F1C1D] text-white rounded-md pt-8 pb-8 mb-4">
          <Image src={mainHospitalImag} />
          <div>
            <p className="text-lg font-medium mb-4">
              전국구에 있는 토끼 병원 리스트
            </p>
            <ul>
              <li className="flex items-center text-sm mb-2">
                <IconCheck />
                병원 이름, 전화번호, 위치 정보 정리
              </li>
              <li className="flex items-center text-sm">
                <IconCheck />
                급할 때 찾으면 안 보이더라 기록해 놓자
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-around bg-[#1F1C1D] text-white rounded-md pt-8 pb-8 mb-4">
          <Image src={mainGrassImag} />
          <div>
            <p className="text-lg font-medium mb-4">
              전국구에 있는 토끼 먹이 리스트
            </p>
            <ul>
              <li className="flex items-center text-sm mb-2">
                <IconCheck />
                업체 이름, 전화번호, 링크 정리
              </li>
              <li className="flex items-center text-sm">
                <IconCheck />
                급할 때 찾으면 안 보이더라 기록해 놓자
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-around bg-[#1F1C1D] text-white rounded-md pt-8 pb-8">
          <Image src={mainProductImag} />
          <div>
            <p className="text-lg font-medium mb-4">
              전국구에 있는 토끼 용품 리스트
            </p>
            <ul>
              <li className="flex items-center text-sm mb-2">
                <IconCheck />
                업체 이름, 전화번호, 링크 정리
              </li>
              <li className="flex items-center text-sm">
                <IconCheck />
                급할 때 찾으면 안 보이더라 기록해 놓자
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
