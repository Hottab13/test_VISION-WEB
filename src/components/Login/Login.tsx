import React from "react";
import { useDispatch } from "react-redux";
//import { Redirect } from "react-router-dom";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { loginUser } from "../../redux/AuthReducer";
import { makeField } from "../common/FormControl/FormControl";
import { maxLengthCreator, requiredField } from "../utils/validators";
//import { AppStateType } from '../../redux/ReduxStore'

import { Form, Input, Button } from "antd";
const FormItem = Form.Item;
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
const LoginForm: React.FC<
  InjectedFormProps<LoginFormValueType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error }) => {
  return (
    <Form {...layout}>
      <form onSubmit={handleSubmit}>
        <Field
          label="Username"
          name="login"
          component={AInput}
          placeholder="Login"
          validate={[requiredField, maxLenght]}
          hasFeedback
          validateStatus="success"
        />
        <Field
          label="Password"
          name="pass"
          component={AInput}
          placeholder="Password"
          validate={[requiredField, maxLenght]}
          hasFeedback
          validateStatus="success"
          type="password"
        />
        <FormItem {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </FormItem>
      </form>
    </Form>
  );
};
const LoginReduxForm = reduxForm<LoginFormValueType, LoginFormOwnProps>({
  form: "login",
})(LoginForm);
type LoginFormValueType = {
  login: string;
  pass: string;
};
export const Login: React.FC = () => {
  //const isAuth = useSelector((state:AppStateType)=>state.auth.isAuth)
  const dispatch = useDispatch();
  const onSubmit = (value: LoginFormValueType) => {
    dispatch(loginUser(value.login, value.pass));
  };
  /* if(isAuth){
        return <Redirect to={"/profile"}/>
    }*/
  return <LoginReduxForm onSubmit={onSubmit} />;
};
