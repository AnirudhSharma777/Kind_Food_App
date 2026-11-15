import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FiArrowRight, FiCheckCircle, FiEye, FiEyeOff, FiLock, FiMail, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { SignIn, getApiErrorMessage } from "../Services/operation/authApi";
import { setLoginData, setToken, setUser } from "../Redux/slices/authSlice";

const initialForm = { email: "", password: "" };

function Login({ open, onOpen, onClose, onSwitchToSignup }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const { token, user } = await SignIn(formData);

      dispatch(setToken(token));
      dispatch(setUser(user));
      dispatch(setLoginData(user));
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Welcome back${user.firstName ? `, ${user.firstName}` : ""}!`);
      setFormData(initialForm);
      onClose();
      navigate("/");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "We could not sign you in. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen} variant="outline-primary" size="sm" className="auth-trigger">
        Sign in
      </Button>

      <Modal
        show={open}
        onHide={onClose}
        centered
        aria-labelledby="sign-in-title"
        dialogClassName="auth-dialog"
        contentClassName="auth-modal"
      >
        <section className="auth-aside auth-aside-login">
          <span className="auth-logo-mark">KF</span>
          <p className="auth-aside-kicker">Kind Food account</p>
          <h2>Good food starts with a good day.</h2>
          <p>Sign in to keep your favourite dishes, addresses and orders close at hand.</p>
          <ul className="auth-benefit-list">
            <li><FiCheckCircle aria-hidden="true" /> Faster checkout</li>
            <li><FiCheckCircle aria-hidden="true" /> Track every order</li>
            <li><FiCheckCircle aria-hidden="true" /> Save your favourites</li>
          </ul>
        </section>

        <section className="auth-form-panel">
          <button type="button" className="auth-close" onClick={onClose} aria-label="Close sign in dialog">
            <FiX aria-hidden="true" />
          </button>
          <p className="auth-kicker">Welcome back</p>
          <h1 id="sign-in-title">Sign in to Kind Food</h1>
          <p className="auth-subtitle">Enter your details to continue your food journey.</p>

          <Form onSubmit={handleSubmit} className="auth-form">
            <Form.Group controlId="sign-in-email">
              <Form.Label>Email address</Form.Label>
              <div className="auth-input-wrap">
                <FiMail aria-hidden="true" />
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </Form.Group>

            <Form.Group controlId="sign-in-password">
              <Form.Label>Password</Form.Label>
              <div className="auth-input-wrap auth-password-wrap">
                <FiLock aria-hidden="true" />
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  minLength="8"
                  required
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                </button>
              </div>
            </Form.Group>

            <Button type="submit" className="auth-submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in…" : <>Sign in <FiArrowRight aria-hidden="true" /></>}
            </Button>
          </Form>

          <p className="auth-switch-copy">
            New to Kind Food? <button type="button" onClick={onSwitchToSignup}>Create an account</button>
          </p>
        </section>
      </Modal>
    </>
  );
}

export default Login;
