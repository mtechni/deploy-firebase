import { auth, provider } from '../../configuration';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/slice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      dispatch(setUserData(data.user));
      navigate('/app');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Box
      sx={{
        padding: '2rem',
        alignContent: 'center',
        textAlign: 'center',
        marginTop: '3rem',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Google Login
      </Typography>
      <Button variant="contained" color="primary" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
    </Box>
  );
};

export default Login;
