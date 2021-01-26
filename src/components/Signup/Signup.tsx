import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { signupUser } from "../../redux/AuthReducer";
import { maxLengthCreator, requiredField } from "../utils/validators";
import { AppStateType } from "../../redux/ReduxStore";
import { Form, Input, Button, InputNumber } from "antd";
import { makeField } from "../common/FormControl/FormControl";

const FormItem = Form.Item;

//@ts-ignore
/*const makeField = (Component:any) => ({input, meta,children,hasFeedback,label,...rest
}) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} children={children} />
    </FormItem>
  );
};*/

const AInput = makeField(Input);

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 6 },
};

type LoginFormOwnProps = {};
const maxLenght = maxLengthCreator(30);
const SignupForm: React.FC<
  InjectedFormProps<LoginFormValueType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error }) => {
  return (
    
    <Form
        {...layout}>
          <form onSubmit={handleSubmit}>
    
      <Field
        label="Адрес электронной почты"
        name="email"
        component={AInput}
        placeholder="Login"
        validate={[requiredField, maxLenght]}
        hasFeedback
        validateStatus="success"
      />
      <Field
        label="Пароль"
        name="password"
        component={AInput}
        placeholder="Password"
        validate={[requiredField, maxLenght]}
        hasFeedback
        validateStatus="success"
        type="password"
      />
      <Field
        label="Телефон"
        name="phone"
        component={AInput}
        placeholder="Международный формат. Может использоваться в качестве логина"
        validate={[requiredField, maxLenght]}
        hasFeedback
        validateStatus="success"
      />
      <Field
        label="Ваше имя"
        name="name"
        component={AInput}
        placeholder="Name"
        validate={[requiredField, maxLenght]}
        hasFeedback
        validateStatus="success"
      />
      <Field
        label="Ваша фамилия"
        name="surname"
        component={AInput}
        placeholder="Surname"
        validate={[requiredField, maxLenght]}
        hasFeedback
        validateStatus="success"
      />
      <FormItem {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          //disabled={ submitting}
          style={{ marginRight: "10px" }}
        >
          Регистрация
        </Button>
      </FormItem>
      </form>
    </Form>
    
  );
};
const SignupReduxForm = reduxForm<LoginFormValueType, LoginFormOwnProps>({
  form: "signup",
})(SignupForm);
type LoginFormValueType = {
  email: string;
  password: string;
  phone: string;
  name: string;
  surname: string;
};

export const Signup: React.FC = () => {
  const is_signup = useSelector((state: AppStateType) => state.auth.is_signup);
  const dispatch = useDispatch();
  const onSubmit = (value: LoginFormValueType) => {
    debugger;
    dispatch(
      signupUser(
        value.email,
        value.password,
        value.phone,
        value.name,
        value.surname
      )
    );
  };
  if (is_signup) {
    return <Redirect to={"/login"} />;
  }
  return <SignupReduxForm onSubmit={onSubmit} />;
};
