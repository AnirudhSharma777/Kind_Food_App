import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FiArrowRight, FiCheckCircle, FiEye, FiEyeOff, FiLock, FiMail, FiUser, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { SignUp, getApiErrorMessage } from "../Services/operation/authApi";
import { setSignupData } from "../Redux/slices/authSlice";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup({ open, onOpen, onClose, onSwitchToLogin }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleOpen = () => {
    setRegisteredEmail("");
    onOpen();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await SignUp({
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined,
        email: formData.email,
        password: formData.password,
      });

      dispatch(setSignupData(response.data));
      setRegisteredEmail(formData.email);
      setFormData(initialForm);
      toast.success("Account created. Check your email to activate it.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "We could not create your account. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const showConfirmation = Boolean(registeredEmail);

  return (
    <>
      <Button onClick={handleOpen} variant="outline-primary" size="sm" className="auth-trigger">
        Sign up
      </Button>

      <Modal
        show={open}
        onHide={onClose}
        centered
        aria-labelledby="sign-up-title"
        dialogClassName="auth-dialog"
        contentClassName="auth-modal"
      >
        <section className="auth-aside auth-aside-signup">
          <span className="auth-logo-mark">KF</span>
          <p className="auth-aside-kicker">Fresh starts here</p>
          <h2>Your next favourite meal is waiting.</h2>
          <p>Create an account for a smoother, more personal ordering experience.</p>
          <ul className="auth-benefit-list">
            <li><FiCheckCircle aria-hidden="true" /> Curated local favourites</li>
            <li><FiCheckCircle aria-hidden="true" /> Simple order tracking</li>
            <li><FiCheckCircle aria-hidden="true" /> Secure account access</li>
          </ul>
        </section>

        <section className="auth-form-panel">
          <button type="button" className="auth-close" onClick={onClose} aria-label="Close sign up dialog">
            <FiX aria-hidden="true" />
          </button>

          {showConfirmation ? (
            <div className="auth-confirmation">
              <span className="auth-confirmation-icon"><FiCheckCircle aria-hidden="true" /></span>
              <p className="auth-kicker">Almost there</p>
              <h1 id="sign-up-title">Check your inbox</h1>
              <p>We sent an activation link to <strong>{registeredEmail}</strong>. Open it before signing in.</p>
              <Button type="button" className="auth-submit" onClick={onClose}>Done</Button>
            </div>
          ) : (
            <>
              <p className="auth-kicker">Create your account</p>
              <h1 id="sign-up-title">Make every meal count</h1>
              <p className="auth-subtitle">A few details and you will be ready to order.</p>

              <Form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-name-grid">
                  <Form.Group controlId="sign-up-first-name">
                    <Form.Label>First name <span>Optional</span></Form.Label>
                    <div className="auth-input-wrap">
                      <FiUser aria-hidden="true" />
                      <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Asha" autoComplete="given-name" />
                    </div>
                  </Form.Group>
                  <Form.Group controlId="sign-up-last-name">
                    <Form.Label>Last name <span>Optional</span></Form.Label>
                    <div className="auth-input-wrap">
                      <FiUser aria-hidden="true" />
                      <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Patel" autoComplete="family-name" />
                    </div>
                  </Form.Group>
                </div>

                <Form.Group controlId="sign-up-email">
                  <Form.Label>Email address</Form.Label>
                  <div className="auth-input-wrap">
                    <FiMail aria-hidden="true" />
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" required />
                  </div>
                </Form.Group>

                <Form.Group controlId="sign-up-password">
                  <Form.Label>Password</Form.Label>
                  <div className="auth-input-wrap auth-password-wrap">
                    <FiLock aria-hidden="true" />
                    <Form.Control type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="At least 8 characters" autoComplete="new-password" minLength="8" maxLength="72" required />
                    <button type="button" className="auth-password-toggle" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((visible) => !visible)}>
                      {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                    </button>
                  </div>
                </Form.Group>

                <Form.Group controlId="sign-up-confirm-password">
                  <Form.Label>Confirm password</Form.Label>
                  <div className="auth-input-wrap auth-password-wrap">
                    <FiLock aria-hidden="true" />
                    <Form.Control type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Repeat your password" autoComplete="new-password" minLength="8" maxLength="72" required />
                    <button type="button" className="auth-password-toggle" aria-label={showConfirmPassword ? "Hide password" : "Show password"} onClick={() => setShowConfirmPassword((visible) => !visible)}>
                      {showConfirmPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                    </button>
                  </div>
                </Form.Group>

                <p className="auth-terms">By creating an account, you agree to receive account and order updates.</p>
                <Button type="submit" className="auth-submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating account…" : <>Create account <FiArrowRight aria-hidden="true" /></>}
                </Button>
              </Form>

              <p className="auth-switch-copy">
                Already have an account? <button type="button" onClick={onSwitchToLogin}>Sign in</button>
              </p>
            </>
          )}
        </section>
      </Modal>
    </>
  );
}

export default Signup;
