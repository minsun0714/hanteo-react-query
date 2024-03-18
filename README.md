## node version
v20.11.0

## 사용 기술 스택

| 종류   | 기술스택     |
|------------|-----------------|
| 코어       | React, Typescript|
| 클라이언트     | axios, React-Query|
| 스타일링    | scss            |
| 폼 상태관리 | react-hook-form, zod |


## 폴더 구조
- App.tsx
- Layout.tsx
- assets
  - LoadingSpinner.svg
  - Default.svg
- components
  - Button.tsx
  - ErrorFallback.tsx
  - Header.tsx
  - ImageUpload.tsx
  - Input.tsx
  - LoadingFallback.tsx
- main.tsx
- pages
  - Login
    - LoginPage.tsx
    - components
      - LoginForm.tsx
    - formSchema.ts
  - MyInfo
    - MyInfoPage.tsx
    - components
      - LogOutButton.tsx
      - MyInfoForm.tsx
    - formSchema.ts
  - SignUp
    - SignUpPage.tsx
    - components
      - SignUpForm.tsx
    - formSchema.ts
- router.tsx
- service
  - AuthService.ts
- style
  - main.css
  - main.css.map
  - main.scss
- util
  - class
    - DateFormatter.ts
  - constants
    - path.ts
  - function
    - getCookie.ts
    - hasConsecutiveNums.ts
- vite-env.d.ts

## data flow
![스크린샷 2024-03-18 오후 9 30 41](https://github.com/minsun0714/hanteo-react-query/assets/117507731/a7facdab-0613-4542-a8a5-513e89898a5e)


## 기능 구현
### [React-Query(v5.28.4)] 네트워크 요청 구현 방식

- defaultOption의 경우 아래와 같이 지정했습니다.
  - retry: 3
  - refetchOnWindowFocus: false
    - 유저 정보의 경우 자주 변경되는 정보가 아니라고 간주했기 때문에, 다른 창을 보다가 다시 오더라도 refetch를 할 필요가 없다고 생각하여 지정했습니다.
  - staleTime: infinity
    - 마찬가지로, 자주 변경되는 정보가 아니기에 유저가 새로고침 하지 않는 이상 계속해서 캐싱되어 있는 데이터를 보여줘도 된다고 생각하여 지정했습니다.
    - 단, 과제가 아닌 실제 로그인 구현이었다면 access token 만료 시간을 고려하여 staleTime을 조정했을 것으로 사료됩니다.

- AuthService를 생성하여, 컴포넌트와 네트워크 요청 기능 간의 결합도를 낮췄습니다.
  - Service 외부에서 접근할 필요 없는 async 함수와 mutationOptions 객체는 private으로 정의하여 은닉화했습니다.
  - 그 외 useQuery와 useMutation을 사용하기 위해 외부에서 접근해야 하는 부분은 custom hook으로 묶어 public으로 정의했습니다.
- AuthService에 지정된 mutationOptions는 아래와 같습니다.
  - onMutate: 쿠키에 데이터 저장하는 로직을 작성
  - onSuccess: 쿼리 무효화 로직 작성
  - onError: Axios error와 unknown error 조건 분기하여 axios error일 경우 error 객체의 메시지를 직접 alert

- 회원가입 기능과 로그인 기능은 form 제출과 관련된 로직이므로, 각 페이지의 form tag를 별도의 컴포넌트로 분리하여 children prop을 전달 받아 mutation 관련 로직을 작성했습니다.
  - page 컴포넌트에 mutation 관련 로직을 함께 작성할 때보다 컴포넌트 간 결합도를 낮출 수 있었다고 생각합니다.
  - ex.
  ```
  const SignUpForm = ({ children }: SignUpFormProps) => {
	const { handleSubmit, watch } = useFormContext();

	const authService = new AuthService();
	const { mutate, isPending, isError } = authService.useSignUpMutation();

	const onSubmit: SubmitHandler<FieldValues> = (formFieldData) => {
		const { pwConfirm, ...postData } = formFieldData;
  //...
  ```

- useMutation이 반환하는 isPending 값을 사용하여, promise가 pending 상태일 때 미리 생성해 둔 loading fallback을 렌더링했습니다.


### [React-hook-form(v7.51.0)] form 상태 관리 방식

### form schema
- zod를 이용하여 form schema를 관리했는데, 실시간 유효성 검사 조건을 기재하기에 적합했습니다.
  - 페이지 별로 formSchema.ts에 분리해놓았습니다.
  - 특히 refine 메서드를 이번에 처음 알게되었는데, custom으로 validation을 추가하기에 적합했습니다.
  - 이에, 비밀번호에 연속된 3자리 숫자가 있는지 여부와 비밀번호와 비밀번호 확인 일치 여부에 refine을 사용하여 custom validation을 구현할 수 있었습니다.
  ```ts
  export const formSchema = z
   // ...

  	.refine(
  		({ pw }) => {
  			return !hasConsecutiveNums(pw);
  		},
  		{
	  		message: '비밀번호에 3자리 이상 연속된 숫자가 있지 않아야 합니다.',
	  		path: ['pw'],
  		},
  	);
  ```

- Context-API 기반의 FormContext를 사용하여 form prop을 별도로 하위 컴포넌트에 넘기고 정의하지 않아도 form에 접근할 수 있도록 했습니다.

- errors와 필드명만 props로 넘기면 에러 메시지를 실시간으로 보여줄 수 있는 ErrorMessage 컴포넌트를 새롭게 학습하고 적용을 시도해보았습니다.
  - ex.
  ```ts
  <Input {...register('id')} placeholder="ID를 입력해주세요" />
					<ErrorMessage errors={errors} name="id" />
  ```
  - 별도의 p tag를 렌더링할 때보다 훨씬 편리하고 type 안정성도 강화된 방식이라는 생각이 들었습니다.


### error handling
- 회원가입 3회 이상 실패 시, useMutation이 반환하는 isError이 true일 경우 ErrorFallback을 렌더링하는 방식을 사용했습니다.
- 미지원 해상도의 경우 Layout.tsx에 해상도 값에 접근하는 로직을 적고, react-error-boundary로 정의한 전역 error boundary를 이용해 error fallback을 렌더링했습니다.
- 로그인 3회 실패 시, router.tsx의 errorElement에 정의한 errorFallback을 렌더링하는 방식을 사용했습니다.


