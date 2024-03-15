import Button from '../../components/Button';
import Input from '../../components/Input';

const LoginPage = () => {
	return (
		<>
			<Input placeholder="ID를 입력해주세요" />
			<Input placeholder="PW를 입력해주세요" />
			<div>
				<Button text="로그인" />
				<Button text="로그인" />
			</div>
		</>
	);
};

export default LoginPage;
