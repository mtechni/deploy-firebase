import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Stack,
  Card,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogActions,
  Avatar,
} from "@mui/material";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../configuration";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUserData } from "../../redux/slice";

const FireStore = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const [open, setOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  const handleLogOut = () => {
    dispatch(removeUserData());
    navigate("/");
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        const todoDoc = doc(db, "todos", currentTodoId);
        await updateDoc(todoDoc, { todo });
        setIsEditing(false);
        setCurrentTodoId(null);
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    } else {
      try {
        await addDoc(collection(db, "todos"), { todo });
      } catch (e) {
        console.error("Error adding document:", e);
      }
    }
    setTodo("");
    fetchPost();
  };

  const fetchPost = async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setTodos(newData);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const deleteTodo = async () => {
    if (todoToDelete) {
      try {
        await deleteDoc(doc(db, "todos", todoToDelete));
        setTodoToDelete(null);
        setOpen(false);
        fetchPost();
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    }
  };

  const editTodo = (id, text) => {
    setIsEditing(true);
    setCurrentTodoId(id);
    setTodo(text);
  };

  const handleClickOpen = (id) => {
    setTodoToDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTodoToDelete(null);
  };

  return (
    <Container maxWidth="sm">
      <Box
        position={"absolute"}
        top={0}
        right={20}
        display={"flex"}
        alignItems={"center"}
        marginTop={2}
        gap={2}
      >
        {userData && (
          <>
            <Avatar>{userData.displayName.charAt(0).toUpperCase()}</Avatar>
            <Box>
              <Typography>{userData.displayName}</Typography>
              <Typography>{userData.email}</Typography>
            </Box>
            <Button variant="outlined" onClick={handleLogOut}>
              LogOut
            </Button>
          </>
        )}
      </Box>

      <Box sx={{ padding: "2rem", marginTop: "3rem" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Firestore Database
        </Typography>
        <Stack direction={"row"} gap={1} component="form" onSubmit={addTodo}>
          <TextField
            fullWidth
            variant="outlined"
            label="Add your data here"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={addTodo}
            disabled={!todo.trim()}
          >
            {isEditing ? "Update" : "Submit"}
          </Button>
        </Stack>

        <Box sx={{ marginTop: "2rem" }}>
          {todos.map((todoItem) => (
            <Card
              key={todoItem.id}
              elevation={1}
              sx={{
                padding: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Typography>{todoItem.todo}</Typography>
              <Box>
                <IconButton
                  onClick={() => editTodo(todoItem.id, todoItem.todo)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleClickOpen(todoItem.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this todo?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={deleteTodo} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default FireStore;
