import React, { useState } from 'react';
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Nav,
  InputGroup,
} from 'react-bootstrap';
import axios from 'axios';
import instance from '../../util/axios-setting';

function RegisterForm() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = () => {
    const emailForm = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (emailForm.test(email) == false) {
      setError('invalide Email Address');
      return false;
    }
    return true;
  };

  const validateName = () => {
    if (name.length < 1) {
      setError('please input name');
      return false;
    }
    return true;
  };

  const validateAddress = () => {
    if (address.length < 1) {
      setError('please input address');
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setError('password is not confirmed');
      return false;
    }
    return true;
  };

  const validateForm = () => {
    return (
      validateEmail() &&
      validateName() &&
      validateAddress() &&
      validatePassword()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      fullName: name,
      address: { postalCode: '1', address1: 'a', address2: 'a' },
      password,
    };
    const inputStatus = validateForm();
    if (inputStatus) {
      instance
        .post(`/api/auth/register`, userData)
        .then((res) => {
          console.log(res.data);
          alert('Register Success!');
        })
        .catch(() => console.log('error'));
    } else {
      alert(error);
    }
  };

  return (
    <div>
      <Container className="panel">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
            <Col sm>
              <Form.Control
                type="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Col sm>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Col sm>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Col sm>
              <Form.Control
                type="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>

          <InputGroup as={Col} className="mb-3">
            <Form.Control
              placeholder="Address1"
              onChange={(e) => setAddress(e.target.value)}
            />
            <Form.Control placeholder="Address2" />
          </InputGroup>

          <br />

          <div className="d-grid gap-1">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              회원가입
            </Button>
            <Button variant="secondary" type="submit">
              <Nav.Link href="/login">뒤로 가기</Nav.Link>
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default RegisterForm;
