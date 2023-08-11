const { Storage } = require('@google-cloud/storage');

// Google Cloud Storage 클라이언트 생성
const storage = new Storage({
  projectId: 'order-394811', // 여기에 Google Cloud 프로젝트 ID 입력
  keyFilename: 'order-394811-e26517080cfe.json' // 여기에 서비스 계정 키(json 파일)의 경로 입력
});

// Google Cloud Storage 버킷 이름
const bucketName = 'test_torder'; // 여기에 버킷 이름 입력

// 이미지 URL
const imageUrl = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fitem.kakaocdn.net%2Fdo%2Fdc9561970173c28a13654c3f14180b4b617ea012db208c18f6e83b1a90a7baa7&tbnid=ugbNfy5bVOYMxM&vet=12ahUKEwiY3OuY7MmAAxUPzzQHHbzHBmEQMygdegUIARCGAg..i&imgrefurl=https%3A%2F%2Fe.kakao.com%2Fitem%2Fhot&docid=fwLloasHK-YbQM&w=216&h=216&q=%EC%9D%B4%EB%AF%B8%EC%A7%80&ved=2ahUKEwiY3OuY7MmAAxUPzzQHHbzHBmEQMygdegUIARCGAg'; // 외부 이미지 URL로 변경

// 이미지 파일 업로드 함수
async function uploadImageFromUrl() {
  try {
    const response = await storage.bucket(bucketName).upload(imageUrl, {
      destination: 'test/external-image.jpg', // Google Cloud Storage 내의 저장 경로
      public: true // 이미지를 공개적으로 접근 가능하도록 설정
    });

    console.log('Image uploaded successfully.');
    console.log('Public URL:', response[0].metadata.mediaLink);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}
