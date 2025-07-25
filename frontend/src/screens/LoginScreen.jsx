import { useState, useEffect } from "react";
import { Form, Button , Row,Col} from "react-bootstrap";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice.js";
import FormContainer from "../components/FormContainer";
import { setCredentials } from "../slices/authSlice.js";
import { toast } from "react-toastify";


const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }))
            navigate("/")
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
    return (
        <FormContainer> 
            <h1>Sign In</h1>
            <form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button type="submit" variant="primary" className="my-2">
                    Sign In
                </Button>
                <Row className="py-3">
                    <Col>
                        New Customer? <Link to="/register">Register</Link>
                    </Col>
                </Row>
            </form>
        </FormContainer>
        
    )
}

export default LoginScreen;