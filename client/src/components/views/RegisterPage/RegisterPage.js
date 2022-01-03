import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

import {
  Form,
  Input,
  Button,
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        userId: '',
        email: '',
        nickname: '',
        name: '',
        birth_year: '',
        birth_month: '',
        birth_day: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('이름이 입력되지 않았습니다'),
          nickname: Yup.string()
          .required('닉네임이 입력되지 않았습니다'),
        email: Yup.string()
          .email('이메일 형식이 잘못되었습니다')
          .required('이메일이 입력되지 않았습니다'),
        password: Yup.string()
          .min(6, '비밀번호를 6자 이상 입력해주세요')
          .required('비밀번호가 입력되지 않았습니다'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다')
          .required('비밀번호를 한번 더 입력해주세요'),
        birth_year: Yup.string()
          .max(4, '연도를 4자 입력해주세요')
          .required('연도가 입력되지 않았습니다'),
        birth_month: Yup.string()
          .required('월이 선택되지 않았습니다'),
        birth_day: Yup.string()
          .max(2, 'Day를 입력해주세요')
          .required('Day가 입력되지 않았습니다')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            userId: values.userId,
            email: values.email,
            password: values.password,
            name: values.name,
            nickname: values.nickname,
            birth_year: values.birth_year,
            birth_month: values.birth_month,
            birth_day: values.birth_day,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg)
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            <h2>회원가입</h2>
            <br/>
            <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >
            <Form.Item required label="아이디" hasFeedback validateStatus={errors.userId && touched.userId ? "error" : 'success'}>
                <Input
                  id="userId"
                  placeholder="ID를 입력하세요"
                  type="text"
                  value={values.userId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.userId && touched.userId ? 'text-input error' : 'text-input'
                  }
                />
                {errors.userId && touched.userId && (
                  <div className="input-feedback">{errors.userId}</div>
                )}
              </Form.Item>

              <Form.Item required label="비밀번호" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="비밀번호 재확인" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="비밀번호를 다시한번 입력하세요"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item required label="이름">
                <Input
                  id="name"
                  placeholder="이름을 입력하세요"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item required label="생년월일">
                <Input
                  id="birth_year"
                  placeholder="년(4자)"
                  type="text"
                  value={values.birth_year}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ width: '75px',  }}
                  className={
                    errors.birth_year && touched.birth_year ? 'text-input error' : 'text-input'
                  }
                />
                &nbsp;&nbsp;

                <select
                  id="birth_month"
                  value={values.birth_month}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ width: '65px', height: '30px' }}
                  className={
                    errors.nickname && touched.nickname ? 'text-input error' : 'text-input'
                  }
                >
                  <option value="0">월</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                &nbsp;&nbsp;

                <Input
                  id="birth_day"
                  placeholder="일"
                  type="text"
                  value={values.birth_day}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{ width: '75px',  }}
                  className={
                    errors.birth_day && touched.birth_day ? 'text-input error' : 'text-input'
                  }
                />
                {errors.nickname && touched.nickname && (
                  <div className="input-feedback">{errors.nickname}</div>
                )}
              </Form.Item>

              <Form.Item required label="만 나이">
                
              </Form.Item>

              <Form.Item required label="닉네임">
                <Input
                  id="nickname"
                  placeholder="사용하실 닉네임을 입력하세요"
                  type="text"
                  value={values.nickname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.nickname && touched.nickname ? 'text-input error' : 'text-input'
                  }
                />
                {errors.nickname && touched.nickname && (
                  <div className="input-feedback">{errors.nickname}</div>
                )}
              </Form.Item>

              <Form.Item required label="Email">
                <Input
                  id="email"
                  placeholder="Email을 입력하세요"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>            

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  가입하기
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};


export default RegisterPage
