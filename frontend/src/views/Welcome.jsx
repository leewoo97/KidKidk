export default function Welcome() {
    function kakaoLoginClick(fetchData) {}

    return (
        <>
            <p>환영페이지 및 로그인...</p>
            <button>
                <img
                    src="../src/assets/images/kakao_login_medium_wide.png"
                    alt="카카오 로그인 버튼"
                    onclick={kakaoLoginClick}
                ></img>
            </button>
        </>
    );
}
